import { classnames } from "@/src/utils/classnames";

import styles from "./ForecastTabs.module.scss";

interface Props {
  labels: string[];
  selectedLabel: string;
  onSelect: (label: string) => () => void;
}

const ForecastTabs = ({ labels, selectedLabel, onSelect }: Props) => {
  return (
    <div className={styles.wrapper}>
      {labels.map((label) => {
        const isSelectedLabel = label === selectedLabel;
        return (
          <div
            key={label}
            className={isSelectedLabel ? classnames(styles.item, styles.active) : styles.item}
            onClick={onSelect(label)}
            role="button"
            tabIndex={0}
            onKeyPress={() => {}}
          >
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastTabs;
