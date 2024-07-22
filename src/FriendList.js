import { View, ScrollView } from "react-native";
import Profile from "./Profile";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Margin from "./Margin";

// itme= {
//     uri: "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__480.jpg",
//     name: "김민호",
//     introduction: "Minho Kim",
// }

const bottomSpace = getBottomSpace();

export default (props) => {
  // ***
  // Case 1. 삼항 연산자
  //   return props.isOpened ? (
  //     <ScrollView
  //       showsVerticalScrollIndicator={false}
  //       contentContainerStyle={{ paddingBottom: 35 }}
  //     >
  //       {props.data.map((item, index) => (
  //         <View key={index}>
  //           <Profile
  //             uri={item.uri}
  //             name={item.name}
  //             introduction={item.introduction}
  //           />
  //           <Margin height={13} />
  //         </View>
  //       ))}
  //     </ScrollView>
  //   ) : null;
  //   ***
  // Case2. if문으로 예외 처리
  //   if (!props.isOpened) return null;
  //   return (
  //     <ScrollView
  //       showsVerticalScrollIndicator={false}
  //       contentContainerStyle={{ paddingBottom: 35 }}
  //     >
  //       {props.data.map((item, index) => (
  //         <View key={index}>
  //           <Profile
  //             uri={item.uri}
  //             name={item.name}
  //             introduction={item.introduction}
  //           />
  //           <Margin height={13} />
  //         </View>
  //       ))}
  //     </ScrollView>
  //   );
  //***
  //Case 3. && 이용
  return (
    props.isOpened && (
      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: 35 }}
      >
        {props.data.map((item, index) => (
          <View key={index}>
            <Profile
              uri={item.uri}
              name={item.name}
              introduction={item.introduction}
            />
            <Margin height={13} />
          </View>
        ))}
      </ScrollView>
    )
  );
};
