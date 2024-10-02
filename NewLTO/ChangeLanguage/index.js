import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { useRouter } from "next/router";
import { LANGUAGES } from "../../../constants/globalConstants";
import style from "./style.module.scss";
import Icon from "../../../components/Icon/Icon";

const ChangeLanguage = () => {
  const router = useRouter();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const getCurrentLanguage = () => {
    const path = router.asPath;
    if (path.includes("_FR")) return "FR";
    if (path.includes("_ES")) return "ES";
    return "EN";
  };

  const [selectedLanguage, setSelectedLanguage] = useState(
    LANGUAGES.find((lang) => lang.label === getCurrentLanguage()) ||
      LANGUAGES[0]
  );

  useEffect(() => {
    setSelectedLanguage(
      LANGUAGES.find((lang) => lang.label === getCurrentLanguage()) ||
        LANGUAGES[0]
    );
  }, [router.asPath]);

  const changeLanguage = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    router.push(
      `/Realese_New_LASERTAG_OPERATOR_App-&_TV-OUT_${
        selectedOption.label === "FR"
          ? "FR"
          : selectedOption.label === "ES"
          ? "ES"
          : "EN"
      }`
    );
  };

  const handleMenuOpen = () => setMenuIsOpen(true);
  const handleMenuClose = () => setMenuIsOpen(false);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      flexShrink: 0,
      border: "1px solid #0090FF",
      borderRadius: "2px",
      boxShadow: "none",
      backgroundColor: "transparent",
      minHeight: "31px",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "800",
      fontFamily: "Manrope",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 0,
      paddingRight: "8px",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "2px",
      border: "1px solid #0090FF",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0",
      backgroundColor: "rgba(6, 6, 6, 0.50)",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "800",
      fontFamily: "Manrope",
      backgroundColor: "rgba(6, 6, 6, 0.50)",
      textAlign: "center",
      color: "#ffffff",
      cursor: "pointer",
      "&:hover": {
        color: "#0090FF",
        backgroundColor: "rgba(255, 255, 255, 0.20)",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const DropdownIndicator = ({ selectProps, ...props }) => {
    const isMenuOpen = selectProps.menuIsOpen;
    return (
      <components.DropdownIndicator {...props}>
        {isMenuOpen ? (
          <Icon name="icon-arrow-up" width={7} height={7} />
        ) : (
          <Icon name="icon-arrow-down" width={7} height={7} />
        )}
      </components.DropdownIndicator>
    );
  };

  const formatOptionLabel = ({ label, code }) => (
    <div className={style.optionLabel}>
      <span>{label}</span>
    </div>
  );

  return (
    <Select
      aria-label="Change language"
      options={LANGUAGES.map((lang) => ({
        label: lang.label,
        value: lang.value,
      }))}
      defaultValue={LANGUAGES.find(
        (lang) => lang.value === selectedLanguage.value
      )}
      onChange={changeLanguage}
      styles={customStyles}
      formatOptionLabel={formatOptionLabel}
      isSearchable={false}
      components={{ DropdownIndicator }}
      onMenuOpen={handleMenuOpen}
      onMenuClose={handleMenuClose}
      menuIsOpen={menuIsOpen}
    />
  );
};

export default ChangeLanguage;
