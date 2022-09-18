/* eslint-disable no-undef */
import Link from "next/link";
import { useRouter } from "next/router";
import { MdOutlineMenuOpen } from "react-icons/md";

import useLocale from "@/src/hooks/useLocale";

import styles from "./LanguageSelector.module.scss";

interface Props {
  handleShowForecast: () => void;
  showForecast: boolean;
}

const LanguageSelector = ({ handleShowForecast, showForecast }: Props) => {
  const router = useRouter();
  const { t, locale } = useLocale();

  // styling
  const isEnglishSelected = locale === "en-US";

  return (
    <div className={styles.wrapper}>
      <div className={styles.language__selector}>
        <span className={styles.label}>{t("choose-language")}:</span>
        <Link href={router.asPath} locale="es-ES">
          <a className={isEnglishSelected ? "" : styles.active}>Esp</a>
        </Link>
        <span>/</span>
        <Link href={router.asPath} locale="en-US">
          <a className={isEnglishSelected ? styles.active : ""}>Eng</a>
        </Link>
      </div>
      <div
        className={styles.mobile__menu}
        onClick={handleShowForecast}
        role="button"
        tabIndex={0}
        onKeyPress={() => {}}
      >
        <MdOutlineMenuOpen
          style={{ fill: showForecast ? "black" : "white" } as React.CSSProperties}
        />
      </div>
    </div>
  );
};

export default LanguageSelector;
