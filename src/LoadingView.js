import { View } from "react-native";
import LottieView from "lottie-react-native";
// import { useEffect, useRef } from "react";

export default () => {
  // 로딩을 조절할 수 있음.
  //   const ref = useRef(null);
  //   useEffect(() => {
  //     setTimeout(() => {
  //       ref.current?.play();
  //     }, 1000);
  //   }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        autoPlay
        // ref={ref}
        style={{
          width: 200,
          height: 200,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/loading.json")}
      />
    </View>
  );
};
