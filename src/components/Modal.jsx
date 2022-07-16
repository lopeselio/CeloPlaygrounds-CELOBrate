import React, { Component } from "react";
import { motion } from "framer-motion";

class Modal extends Component {
  render() {
    return (
      <motion.div
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => {
          this.props.setselectedImg(null);
        }}
      >
        <motion.img
          src={this.props.selectedImg}
          alt="enlarged pic"
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
        />
      </motion.div>
    );
  }
}

export default Modal;
