import React, { Component } from "react";

class UploadImage extends Component {
  state = {
    Img: "https://cdn.iconscout.com/icon/free/png-256/gallery-187-902099.png",
  };

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ Img: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    const { Img } = this.state;
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto">
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>

              <div className="page">
                <div className="container">
                  <h2 className="heading">Upload your Image</h2>
                  <div className="img-holder">
                    <img src={Img} alt="" id="img" className="img" />
                  </div>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      const description = this.imageDescription.value;
                      this.props.uploadImage(description);
                    }}
                  >
                    <input
                      type="file"
                      name="image-upload"
                      id="input"
                      accept=".jpg, .jpeg, .png, .bmp, .gif"
                      onInput={this.props.captureFile}
                      onChange={this.imageHandler}
                    />
                    <div className="label">
                      <label htmlFor="input">
                        <i className="material-icons">add_photo_alternate</i>
                      </label>
                    </div>

                    <div className="form-group mr-sm-2">
                      <br></br>
                      <input
                        id="imageDescription"
                        type="text"
                        ref={(input) => {
                          this.imageDescription = input;
                        }}
                        className="form-control"
                        placeholder="Enter Image Caption"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-block btn-lg btColor"
                    >
                      Post
                    </button>
                    <br></br>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default UploadImage;
