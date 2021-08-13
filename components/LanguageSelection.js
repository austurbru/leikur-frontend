import { useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "@context/AuthContext";
import { Dropdown, Grid, Segment } from "semantic-ui-react";

const LanguageSelection = () => {
  const { user, setPreferredLocale } = useContext(AuthContext);

  let defaultLocale = "en"
  if (user) {
    defaultLocale = user.preferredLocale;
  }

  const [selectedLanguage, setSelectedLanguage] = useState(defaultLocale);
  const options = [
    { key: 1, text: "English", value: "en" },
    { key: 2, text: "Íslenska", value: "is" },
    { key: 3, text: "Español", value: "es" },
    { key: 4, text: "Polskie", value: "pl" },
    { key: 5, text: "عربى", value: "ar" },
  ];

  const router = useRouter();

  const handleChange = (e, { value }) => {
    setSelectedLanguage(`${value}`);
    setPreferredLocale(`${value}`);
    router.push(router.asPath, router.asPath, {
      locale: `${value}`,
    });
  }

  return (
    <Dropdown
      onChange={handleChange}
      options={options}
      placeholder="Choose language"
      selection
      value={selectedLanguage}
    />
  );
};

export default LanguageSelection;
