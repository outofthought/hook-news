import React from "react";
import useFormValidation from "./useFormValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {
  const { handleChange, handleSubmit, values } = useFormValidation(
    INITIAL_STATE
  ); //this is destructuring
  const [login, setLogin] = React.useState(true);

  return (
    <div>
      <h2 className="mv3">{login ? "Log in" : "Create Account"}</h2>
      <form className="flex flex-column" onSubmit={handleSubmit}>
        {!login && (
          <input
            value={values.name}
            name="name"
            type="text"
            placeholder="name"
            autocompete="off"
            onChange={handleChange}
          />
        )}
        <input
          value={values.email}
          name="email"
          type="email"
          placeholder="email"
          autocompete="off"
          onChange={handleChange}
        />
        <input
          value={values.password}
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        <div className="flex mv3">
          <button type="submit" className="button pointer mr">
            Submit
          </button>
          <button
            type="button"
            className="pointer button"
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? "need to create an account" : "have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
