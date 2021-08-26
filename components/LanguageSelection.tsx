import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "@context/AuthContext";
import { Dropdown } from "semantic-ui-react";

const LanguageSelection = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  let defaultLocale = "en";

  if (user) {
    var preferredLocale = typeof window !== "undefined" ? localStorage.getItem(user.username) : null;
    if (preferredLocale) {
      defaultLocale = preferredLocale;
    }
  } else {
    var preferredLocale = typeof window !== "undefined" ? localStorage.getItem("anonymous") : null;
    if (preferredLocale) {
      defaultLocale = preferredLocale;
    }
  }

  const options = [
    { key: 1, text: "English", value: "en" },
    { key: 2, text: "Íslenska", value: "is" },
    { key: 3, text: "Español", value: "es" },
    { key: 4, text: "Polskie", value: "pl" },
    { key: 5, text: "عربى", value: "ar" },
  ];

  useEffect(() => {
    if (router.locale !== defaultLocale && router.locales && router.locales.indexOf(defaultLocale) > -1) {
      router.push(router.asPath, router.asPath, {
        locale: `${defaultLocale}`,
      });
    }
  }, []);

  const [selectedLanguage, setSelectedLanguage] = useState(defaultLocale);

  const handleChange = (_event: React.SyntheticEvent<HTMLElement>, { value }: { value?: any }) => {
    setSelectedLanguage(`${value}`);
    if (user) {
      localStorage.setItem(user.username, value);
      localStorage.setItem("anonymous", value);
    } else {
      localStorage.setItem("anonymous", value);
    }
    router.push(router.asPath, router.asPath, {
      locale: `${value}`,
    });
  };

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
