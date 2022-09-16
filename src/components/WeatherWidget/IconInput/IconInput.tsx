import { BiSearch } from "react-icons/bi";

import styles from "./IconInput.module.scss";

const IconInput = ({ ...delegatedProps }) => {
  return (
    <label className={styles.wrapper}>
      <div className={styles["icon-wrapper"]}>
        <BiSearch />
      </div>
      <input className={styles["text-input"]} {...delegatedProps} />
    </label>
  );
};

export default IconInput;
