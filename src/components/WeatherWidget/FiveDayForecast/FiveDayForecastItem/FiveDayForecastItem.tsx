import type { ForecastListItem } from "@/src/ts/interfaces";
import { getDateFromDateTime } from "@/src/utils/getDateFromDatetime";

import styles from "./FiveDayForecastItem.module.scss";

const FiveDayForecastItem = ({ item }: { item: ForecastListItem }) => {
  const { dt } = item;
  const { weekday, monthName, day } = getDateFromDateTime(dt);

  return (
    <div className={styles.wrapper}>
      {`${weekday}, ${day} ${monthName}`}, {item.main.temp} °C
    </div>
  );
};

export default FiveDayForecastItem;
