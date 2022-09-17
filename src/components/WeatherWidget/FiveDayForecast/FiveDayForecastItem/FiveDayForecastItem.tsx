import Image from "next/image";
import { BiWind } from "react-icons/bi";
import { IoRainyOutline, IoWater } from "react-icons/io5";
import { TbTemperature } from "react-icons/tb";

import type { ForecastListItem } from "@/src/ts/interfaces";
import { getDateFromDateTime } from "@/src/utils/getDateFromDatetime";
import { getOpenWeatherIconUrlByIconId } from "@/src/utils/getOpenWeatherIconUrlByIconId";

import styles from "./FiveDayForecastItem.module.scss";

const FiveDayForecastItem = ({ item }: { item: ForecastListItem }) => {
  const { dt, main, weather, wind, pop } = item;
  const { humidity, temp } = main;
  const { icon, description } = weather[0];
  const { hour } = getDateFromDateTime(dt);

  return (
    <div className={styles.wrapper}>
      <div className={styles.hour}>{hour}</div>
      <div className={styles.humidity}>
        <IoWater />
        <span>{`${humidity}%`}</span>
      </div>
      <div className={styles.wind}>
        <BiWind />
        <span>{`${wind.speed} m/s`}</span>
      </div>
      <div className={styles.weather}>
        <div className={styles["icon-wrapper"]}>
          <Image
            src={getOpenWeatherIconUrlByIconId(icon)}
            alt={description}
            objectFit="contain"
            layout="fill"
          />
        </div>
        <span>{description}</span>
      </div>
      <div className={styles.temperature}>
        <TbTemperature />
        <span>{`${Math.trunc(temp)} °C`}</span>
      </div>
      <div className={styles.rain}>
        <IoRainyOutline />
        <span>{`${+(pop * 100).toFixed(2)}%`}</span>
      </div>
    </div>
  );
};

export default FiveDayForecastItem;
