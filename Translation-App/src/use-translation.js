import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "react-string-format";

const ko = require("./lang/lang.ko.json");
const en = require("./lang/lang.en.json");
const ja = require("./lang/lang.ja.json");
const zh = require("./lang/lang.zh.json");
const es = require("./lang/lang.es.json");

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  ko,
  en,
  ja,
  zh,
  es,
});
i18n.enableFallback = true;
i18n.defaultLocale = "ko";

const deviceLangauage = getLocales()[0].languageCode; //설정되어있는 언어에 대해 첫번째 언어 가져오기 ex)ko, ja 등

const LOCALE_KEY = "locale";

export const useTranslation = () => {
  const [locale, _setLocale] = useState(null);

  const setLocale = (v) => {
    _setLocale(v);
    AsyncStorage.setItem(LOCALE_KEY, v);
  };

  const init = async () => {
    const fs = await AsyncStorage.getItem(LOCALE_KEY);
    // fs가 null 일 때 : 아직 앱에서 선택하지 않았을 때는 디바이스 설정 언어로 되고
    //그전에 앱을 사용했을 때 마지막으로 특정언어를 클릭했으면 null이 아니므로 해당 언어로 됨.
    if (fs !== null) {
      _setLocale(fs);
    } else {
      _setLocale(deviceLangauage);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return {
    t: (scope) => i18n.t(scope, { locale }), // 이런식으로 리턴해서 t함수 사용가능.
    locale,
    setLocale,
    format,
  };
};
