const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = isEmpty(data.handle) ? "" : data.handle;
  data.status = isEmpty(data.status) ? "" : data.status;
  data.skills = isEmpty(data.skills) ? "" : data.skills;

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle should be bigger than 2 chars";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }

  if (!isEmpty(data.website) && !validator.isURL(data.website)) {
    errors.website = "Invalid URL";
  }

  if (!isEmpty(data.youtube) && !validator.isURL(data.youtube)) {
    errors.youtube = "Invalid URL";
  }

  if (!isEmpty(data.twitter) && !validator.isURL(data.twitter)) {
    errors.twitter = "Invalid URL";
  }

  if (!isEmpty(data.facebook) && !validator.isURL(data.facebook)) {
    errors.facebook = "Invalid URL";
  }

  if (!isEmpty(data.linkedin) && !validator.isURL(data.linkedin)) {
    errors.linkedin = "Invalid URL";
  }

  if (!isEmpty(data.instagram) && !validator.isURL(data.instagram)) {
    errors.instagram = "Invalid URL";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
