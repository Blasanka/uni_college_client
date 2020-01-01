const isEmpty = string => {
  if (string.trim() === "") return true;
  else return false;
};

const isEmail = email => {
  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(emailRegEx)) return true;
  else return false;
};

exports.validateFormData = data => {
  const errors = {};

  if (isEmpty(data.fullname)) errors.fullName = "Must not be empty!";
  if (isEmpty(data.nic)) errors.nic = "Must not be empty";
  if (isEmpty(data.index)) errors.indexNumber = "Must not be empty!";
  if (isEmpty(data.department)) errors.department = "Must not be empty";
  if (isEmpty(data.address)) errors.address = "Must not be empty!";
  if (isEmpty(data.mobile_number)) errors.phoneNumber = "Must not be empty";
  if (isEmpty(data.parents_number)) errors.parentsNumber = "Must not be empty!";
  if (!(data.dob instanceof Date)) errors.dob = "Must not be empty";
  if (isEmpty(data.gender)) errors.genderType = "Must not be empty";

  if (isEmpty(data.religion)) errors.religion = "Must not be empty";
  else if (!data.religion.match(/^[a-zA-Z]+$/))
    errors.religion = "Enter a valid religion";

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty!";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address!";
  }

  if (data.mobile_number.length < 9)
    errors.phoneNumber = "Cannot be less than 9 characters";
  else if (!data.mobile_number.match(/^[0-9]+$/))
    errors.phoneNumber = "Enter a valid telephone number";

  if (data.parents_number.length < 9)
    errors.parentsNumber = "Cannot be less than 9 characters";
  else if (!data.parents_number.match(/^[0-9]+$/))
    errors.parentsNumber = "Enter a valid telephone number";

  if (data.nic.length < 9) errors.nic = "Cannot be less than 9 characters";
  else if (!data.nic.match(/^[a-zA-Z0-9]+$/)) errors.nic = "Enter a valid NIC";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};
