import Image from "next/image";

import { RANDOM_PLACES_IMG_URL } from "@/src/config/constants";
import useCityStore from "@/src/hooks/useCityStore";
import type { GeocodingApiResponse } from "@/src/ts/interfaces";

import styles from "./FavoriteCities.module.scss";

const FavoriteCities = () => {
  const { favoriteCities, setGeoInfo } = useCityStore();

  if (favoriteCities.length <= 0) return null;

  const handleSelection = (geoCity: GeocodingApiResponse) => () => {
    setGeoInfo(geoCity);
  };

  const favoriteCitiesToRender = favoriteCities.map((item) => {
    return (
      <div
        key={item.lat + item.lon}
        className={styles.favorite__item}
        onClick={handleSelection(item)}
        role="button"
        tabIndex={0}
        onKeyPress={() => {}}
      >
        <div className={styles["img-wrapper"]}>
          <Image src={RANDOM_PLACES_IMG_URL} alt={item.name} objectFit="cover" layout="fill" />
        </div>
        <footer>{`${item.name}, ${item.state ?? ""} ${item.country}`}</footer>
      </div>
    );
  });

  return <div className={styles.wrapper}>{favoriteCitiesToRender}</div>;
};
export default FavoriteCities;
