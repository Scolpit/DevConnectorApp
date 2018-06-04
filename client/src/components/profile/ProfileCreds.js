import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";

export class ProfileCreds extends Component {
  static propTypes = {
    education: PropTypes.array.isRequired,
    experience: PropTypes.array.isRequired
  };

  render() {
    const { education, experience } = this.props;

    const expItem = experience.map((experience, index) => (
      <li key={index} className="list-group-item">
        <h4>{experience.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{experience.from}</Moment> -{" "}
          {experience.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{experience.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {experience.title}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {isEmpty(experience.description)
            ? "No description..."
            : experience.description}
        </p>
      </li>
    ));

    const eduItem = education.map((education, index) => (
      <li className="list-group-item">
        <h4>{education.school}</h4>
        <p>
          {" "}
          <Moment format="YYYY/MM/DD">{education.from}</Moment> -{" "}
          {education.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{education.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree: </strong>
          {education.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {education.fieldofstudy}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {isEmpty(education.description)
            ? "No description..."
            : education.description}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">{expItem}</ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">{eduItem}</ul>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
