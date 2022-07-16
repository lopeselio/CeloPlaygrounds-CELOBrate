import React, { Component } from "react";
import Logo from "../photo1.png";
import background from "../wallpaper.jpg";

const styles = {
  container: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
    position: "fixed",
  },
};

class Main extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto">
              <div className="content mr-auto ml-auto">
                <br></br>
                <div style={{ maxWidth: "1000px", display: "flex" }}>
                  <img
                    style={{
                      marginLeft: "550px",
                      marginBottom: "25px",
                      marginTop: "25px",
                    }}
                    src={Logo}
                    alt="Logo"
                  />
                </div>
                <div>
                  <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
                    Decentralized and Censorship-Resistant Image-sharing
                    Platform
                  </h2>
                  <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
                    Earn in celo cryptocurrency by posting images in the form of
                    art, photographs or even memes
                  </h3>
                  <h4 style={{ textAlign: "center", marginTop: "50px" }}>
                    You would need Metamask Wallet to access the site!
                  </h4>
                </div>
                <div style={{ maxWidth: "1000px", display: "flex" }}>
                  <button
                    style={{ marginLeft: "460px", marginTop: "10px" }}
                    type="submit"
                    className="btn btn-dark btn-block btn-lg"
                    onClick={(event) =>
                      (window.location.href =
                        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en")
                    }
                  >
                    Download Metamask Wallet
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
