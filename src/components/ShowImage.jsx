import React, { Component } from "react";
import { motion } from "framer-motion";
import Identicon from "react-jdenticon";
import './Navbar.css'

const web3 = require("web3");

class ShowImage extends Component {
  state = {
    tip: "1",
  };

  setTip = (e) => {
    this.setState({ tip: e.target.value });
  };

  render() {
    const { tip } = this.state;
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto">
            <div className="content mr-auto ml-auto">
              <br></br>
              <div style={{ maxWidth: "1000px", display: "flex" }}>
                <button
                  style={{ marginLeft: "460px" }}
                  type="submit"
                  className="textwhite2 btn btn-dark btn-block btn-lg"
                  onClick={this.props.sortView}
                >
                  Most Popular
                </button>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <button
                  type="submit"
                  className="textwhite2 btn btn-dark btn-block btn-lg"
                  onClick={this.props.unsortView}
                >
                  Recently Posted
                </button>
              </div>
              <p>&nbsp;</p>
              <div className="img-grid">
                {this.props.images.map((image, key) => {
                  return (
                    <div key={key}>
                      <div className="card-header">
                        <Identicon value={image.author} size={30} />
                        <small className="text-muted">{image.author}</small>
                      </div>
                      <motion.div
                        className="img-wrap"
                        key={key}
                        layout
                        whileHover={{ opacity: 1 }}
                        s
                        onClick={() => {
                          this.props.setselectedImg(
                            `https://ipfs.infura.io/ipfs/${image.hash}`
                          );
                          console.log();
                        }}
                      >
                        <ul
                          id="imageList"
                          className="list-group list-group-flush"
                        >
                          <li className="list-group-item">
                            <p className="text-center">
                              <motion.img
                                src={`https://ipfs.infura.io/ipfs/${image.hash}`}
                                style={{
                                  maxWidth: "420px",
                                  maxHeight: "400px",
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                              />
                            </p>
                            <p>{image.description}</p>
                          </li>
                          <li key={key} className="list-group-item py-2">
                            <small className="float-left mt-1 text-muted">
                              &nbsp;&nbsp;
                              {web3.utils.fromWei(
                                image.tipAmount.toString(),
                                "Ether"
                              )}{" "}
                              CELO
                            </small>
                            <br></br>
                            <div style={{ display: "flex" }}>
                              <input
                                type="text"
                                style={{ width: "100px" }}
                                className="form-control"
                                onChange={this.setTip}
                                placeholder="Amount"
                                required
                              />
                              <button
                                className="textwhite2 btn btn-link btn-md float-right pt-0"
                                name={image.id}
                                onClick={(event) => {
                                  console.log({ tip });
                                  let tipAmount = web3.utils.toWei(
                                    tip.toString(),
                                    "ether"
                                  );
                                  console.log(event.target.name, tipAmount);
                                  this.props.tipImageOwner(
                                    event.target.name,
                                    tipAmount
                                  );
                                  console.log(tipAmount, tip);
                                }}
                              >
                                PAY CELO
                              </button>
                            </div>
                          </li>
                        </ul>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default ShowImage;
