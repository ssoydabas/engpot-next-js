import React from "react";
import styles from "./Contents.module.css";

import ContentItem from "./ContentItem";

function Contents(props) {
  return (
    <div className={styles["contents-container"]}>
      <div className={styles["title"]}>
        <span>Latest</span> Content
      </div>
      <div className={styles["sub-title"]}>
        Feel Free To Browse Into Our Latest Content!
      </div>
      <div className={styles["contents"]}>
        {props.contentsArray.map((content) => (
          <ContentItem
            key={content.id}
            id={content.id}
            level={content.level}
            title={content.title}
            text={content.text}
          />
        ))}
      </div>
    </div>
  );
}

export default Contents;
