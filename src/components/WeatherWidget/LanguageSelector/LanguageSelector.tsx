import Link from "next/link";
import { useRouter } from "next/router";

import useLocale from "@/src/hooks/useLocale";

import styles from "./LanguageSelector.module.scss";

const LanguageSelector = () => {
  const router = useRouter();
  const { t, locale } = useLocale();

  // styling
  const isEnglishSelected = locale === "en-US";

  return (
    <div className={styles.wrapper}>
      <span>{t("choose-language")}:</span>
      <Link href={router.asPath} locale="es-ES">
        <a className={isEnglishSelected ? "" : styles.active}>Esp</a>
      </Link>
      <span>/</span>
      <Link href={router.asPath} locale="en-US">
        <a className={isEnglishSelected ? styles.active : ""}>Eng</a>
      </Link>
    </div>
  );
};

export default LanguageSelector;
