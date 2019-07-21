export default function validateLogin(values) {
  let errors = {};

  if (!values.email) {
    //if that was an empty string so the value is true
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 charachters";
  }
  return errors;
}
