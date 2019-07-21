import React from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function LinkList(props) {
  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState([]);
  const isNewpage = props.location.pathname.includes("new");

  React.useEffect(() => {
    getLinks();
  }, []);
  function getLinks() {
    firebase.db
      .collection("links")
      .orderBy("created", "desc")
      .onSnapshot(handleSnapshots);
  }
  function handleSnapshots(snapshot) {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(links);
    console.log({ links });
  }
  function renderLinks() {
    if (isNewpage) {
      return links;
    }
    const topLinks = links
      .slice()
      .sort((a, b) => b.votes.length - a.votes.length);
    return topLinks;
  }
  return (
    <div>
      {renderLinks().map((link, index) => (
        <LinkItem
          key={link.id}
          showCount={true}
          link={link}
          index={index + 1}
        />
      ))}
    </div>
  );
}

export default LinkList;
