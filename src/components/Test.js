import React from "react";

export default class Test extends React.Component {
  render() {
    return (
      <div>
        Test
        <form
          className="flex flex-column mt3"
          onSubmit={() => console.log("submitted")}
        >
          <input type="text" placeholder="hello1" />
          <input type="text" placeholder="hello2" />
          <input type="text" placeholder="hello3" />
        </form>
        <button
          type="submit"
          className="button pointer mr2"
          disabled={true}
          style={{ background: true ? "grey" : "orange" }}
        >
          Submit
        </button>
      </div>
    );
  }
}
