export default function validateCreateLink(values) {
  let errors = {};

  if (!values.description) {
    //if that was an empty string so the value is true
    errors.description = "Description is required";
  } else if (values.description.length < 10) {
    errors.description = "Description must be at least 10 charachters";
  }
  if (!values.url) {
    errors.url = "URL is required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "URL must be valid";
  }
  return errors;
}
