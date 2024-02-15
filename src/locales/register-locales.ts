/* eslint-disable */
import translate from "counterpart";

const registerLocales = (locales: any[]) => {
  locales.forEach((l) => {
    translate.registerTranslations(l.locale, l.messages);
  });

  // Setup Fallback
  try {
    var defaultJson: any = require("./default_fallback.json");
  } catch (ex) {
    var defaultJson: any = {};
  }
  translate.registerTranslations("default", defaultJson);
  translate.setFallbackLocale(["en", "default"]);
};

export default registerLocales;
