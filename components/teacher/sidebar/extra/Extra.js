import React, { useState } from "react";
import styles from "./Extra.module.css";

import InternalLinks from "./internalLinks/InternalLinks";

import Button from "../../../ui/components/button/Button";

function Extra() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={`${styles["extra"]} card highlight--dark`}>
      {showMore && <InternalLinks setShowMore={setShowMore} />}
      <Button
        classes="button--white"
        type="button"
        text="More"
        onClick={setShowMore.bind(null, !showMore)}
      />
    </div>
  );
}

export default Extra;
