import LGBTQ from "../abis/LGBTQ.json";
import React, { Component } from "react";
import NavbarComp from "./NavbarComp";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const Web3 = require("web3");
const ContractKit = require("@celo/contractkit");
let kit;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      lgbtq: null,
      images: [],
      loading: true,
      selectedImg: null,
      openModal: false,
    };

    this.uploadImage = this.uploadImage.bind(this);
    this.tipImageOwner = this.tipImageOwner.bind(this);
    this.captureFile = this.captureFile.bind(this);
  }

  async componentWillMount() {
    this.connectCeloWallet();
    this.loadBlockchainData();
  }

  async connectCeloWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        kit = ContractKit.newKitFromWeb3(web3);
        const accounts = await kit.web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
      } catch (error) {
        console.log(`${error}.`);
      }
    } else {
      console.log("Please install the CeloExtensionWallet.");
      window.alert(
        "Celo Extension Wallet not installed! Please install Celo Extension Wallet"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = new Web3(window.ethereum);
    kit = ContractKit.newKitFromWeb3(web3);
    const networkId = await kit.web3.eth.net.getId();
    const networkData = LGBTQ.networks[networkId];
    if (networkData) {
      const lgbtq = new kit.web3.eth.Contract(
        LGBTQ.abi,
        networkData.address
      );
      this.setState({ lgbtq });
      const imagesCount = await lgbtq.methods.imageCount().call();
      this.setState({ imagesCount });
      for (var i = 1; i <= imagesCount; i++) {
        const image = await lgbtq.methods.images(i).call();
        this.setState({
          images: [...this.state.images, image],
        });
      }
    } else {
      window.alert("Contract is not deployed to detected network!!!");
    }
  }

  sortView = () => {
    this.setState({
      images: this.state.images.sort((a, b) => b.tipAmount - a.tipAmount),
    });
    this.setState({ loading: false });
  };

  unsortView = () => {
    this.setState({
      images: this.state.images.reverse(),
    });
    this.setState({ loading: false });
  };

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };

  uploadImage = (description) => {
    if (this.state.acount !== "") {
      console.log("Submitting file to ipfs...");

      ipfs.add(this.state.buffer, (error, result) => {
        console.log("Ipfs result", result);
        if (error) {
          console.error(error);
          return;
        }
        this.setState({ loading: true });
        this.state.lgbtq.methods
          .uploadImage(result[0].hash, description)
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            this.setState({ loading: false });
          });
        if (this.state.loading === false) {
          window.location.reload();
        }
      });
    } else {
      window.alert("Please connect your Celo Wallet to upload!");
    }
  };

  tipImageOwner = (id, tipAmount) => {
    if (this.state.account !== "") {
      this.setState({ loading: true });
      this.state.lgbtq.methods
        .tipImageOwner(id)
        .send({ from: this.state.account, value: tipAmount })
        .on("transactionHash", (hash) => {
          this.setState({ loading: false });
        });
    } else {
      window.alert("Please connect your Celo Wallet to pay!");
    }
  };

  setselectedImg = (url) => {
    this.setState({ selectedImg: url });
  };

  render() {
    return (
      <NavbarComp
        captureFile={this.captureFile}
        uploadImage={this.uploadImage}
        images={this.state.images}
        tipImageOwner={this.tipImageOwner}
        setselectedImg={this.setselectedImg}
        selectedImg={this.state.selectedImg}
        openModal={this.state.openModal}
        unsortView={this.unsortView}
        sortView={this.sortView}
        account={this.state.account}
        connect={this.connectCeloWallet}
      />
    );
  }
}

export default App;
