import React from "react";
import useFormValidation from "./../Auth/useFormValidation";

import validateCreateLink from "./../Auth/validateCreateLink";
import FirebaseContext from "./../../firebase/context";

const INIT_STATE = {
  description: "",
  url: ""
};

function CreateLink(props) {
  const { firebase, user } = React.useContext(FirebaseContext);
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INIT_STATE,
    validateCreateLink,
    hadndleCreateLink
  );

  function hadndleCreateLink() {
    if (!user) {
      props.history.push("/login");
    } else {
      const { url, description } = values;
      const newLink = {
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName
        },
        voteCount: 0,
        votes: [],
        comments: [],
        created: Date.now()
      };
      firebase.db.collection("links").add(newLink);
      props.history.push("/");
    }
    console.log("link created");
  }
  return (
    <form className="flex flex-column mt3" onSubmit={handleSubmit}>
      <input
        value={values.description}
        name="description"
        placeholder="A description for your link"
        autoComplete="off"
        type="text"
        onChange={handleChange}
        className={errors.description && "error-input"}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        value={values.url}
        name="url"
        placeholder="The URL for the link"
        autoComplete="off"
        type="url"
        onChange={handleChange}
        className={errors.url && "error-input"}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
