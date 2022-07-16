const ContractKit = require("@celo/contractkit");
const Web3 = require("web3");

// Connect to the desired network
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = ContractKit.newKitFromWeb3(web3);

const getAccount = require("./utils/getAccount").getAccount;

async function awaitWrapper() {
  let account = await getAccount();
  console.log(`Account address: ${account.address}`);
  kit.addAccount(account.privateKey);
}

awaitWrapper();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  // The following line will put the compiled contracts and associated info at ./client/contracts
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",

  networks: {
    // Use the development network if you are using @celo/ganache-cli
    // https://www.npmjs.com/package/@celo/ganache-cli
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    alfajores: {
      provider: kit.web3.currentProvider,
      network_id: 44787,
      gas: 4000000
    },
    mainnet: {
      provider: kit.web3.currentProvider,
      network_id: 42220,
    },
  },
};
