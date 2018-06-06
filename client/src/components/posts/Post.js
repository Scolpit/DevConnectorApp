import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";

export class Post extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Post);
