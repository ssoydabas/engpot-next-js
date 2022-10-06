import React from "react";

import Button from "../../../ui/components/button/Button";

function ContentItem(props) {
  return (
    <div key={props.id} className={styles["content-item"]}>
      <div>{props.level}</div>
      <div>{props.title}</div>
      <div>{props.text}</div>
      <Button classes="button--white" type="button" text="Go" />{" "}
      {/* Will be a link to the item */}
    </div>
  );
}

export default ContentItem;
