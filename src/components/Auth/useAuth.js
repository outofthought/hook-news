import React from "react";
import firebase from "./../../firebase/firebase";

function useAuth() {
  const [authUser, setAuthUser] = React.useState(null);
  React.useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        //if we have user we eant to provide it to the rest of our app
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return authUser;
}

export default useAuth;
