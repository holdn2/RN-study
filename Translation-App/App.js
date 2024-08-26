import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";
import { useFonts } from "expo-font";

import { useTranslation } from "./src/use-translation";
import Button from "./src/Button";
import { useCookie } from "./src/use-cookie";
import LoadingView from "./src/LoadingView";

// 스플래스 스크린의 아이콘 출처 :

SplashScreen.preventAutoHideAsync(); //자동으로 splash가 사라지는 것을 막음.

export default function App() {
  // 훅은 무조건 최상위에서 호출해야함.
  const { t, locale, setLocale, format } = useTranslation();
  const { cookieKey } = useCookie();
  const [fontLoaded, error] = useFonts({
    RIDIBatang: require("./assets/fonts/RIDIBatang.otf"), //폰트 출처 : https://ridicorp.com/ridibatang/
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // 언어별 날짜 보여주기. format함수 사용. react-string-format 패키지 설치
  const y = new Date().getFullYear();
  const m = new Date().getMonth() + 1; //getMonth는 0~11
  const d = new Date().getDate();
  const todayText = format(t("today_is"), y, m, d);

  //Button의 반복 사용을 리팩토링하여 방지. locale의 배열을 만들어서 사용. 사용할 때 map()과 함께 사용.
  const locales = ["ko", "en", "ja", "zh", "es"];

  //쿠키의 키값이 세팅이 됐을 때 splash screen을 숨긴다.
  useEffect(() => {
    if (cookieKey !== "") {
      setIsLoaded(true);
    }
  }, [cookieKey]);

  //locale이 세팅되면 SplashScreen이 닫힘. 그전까지는 SplashScreen이 보임.
  useEffect(() => {
    if (locale !== null && fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [locale, fontLoaded]);

  //쿠키 키가 세팅되는 동안 로딩 화면 나옴.
  //아직 로드가 다 되지 않은 상황에서는 이 화면이 나옴. Lottie 사용. 애니메이션을 간단히 사용가능.
  if (!isLoaded) return <LoadingView />;

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        source={require("./assets/background.json")}
        resizeMode="cover"
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100%",
          height: "100%",
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Text style={styles.todayText}>{todayText}</Text>
          <Text style={styles.cookieText}>{t(cookieKey)}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonsContainer}>
            {locales.map((item) => (
              <Button
                key={item}
                onPress={() => setLocale(item)}
                isSelected={locale === item}
                text={item.toUpperCase()}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  todayText: {
    fontFamily: "RIDIBatang",
    position: "absolute", //절대적으로 위치해서 cookieText에 영향을 주지않음.
    top: 70,
    fontSize: 13,
    color: "#8b658f",
  },
  cookieText: {
    fontFamily: "RIDIBatang",
    fontSize: 22,
    color: "#372538",
    textAlign: "center",
    marginHorizontal: 30,
    //가운데 정렬과 마진을 넣어줌으로써 이쁘게 보이게함.
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 25,
  },
});
