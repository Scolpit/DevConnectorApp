import React, { Component } from "react";
import PropTypes from "prop-types";

export class ProfileGithub extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <h1>TODO: Profile Github</h1>
      </div>
    );
  }
}

export default ProfileGithub;
