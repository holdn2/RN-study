import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import Header from "./src/header";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import Profile from "./src/Profile";
import { friendProfiles, myProfile } from "./src/data";
import Margin from "./src/Margin";
import Division from "./src/Division";
import FriendSection from "./src/FriendSection";
import FriendList from "./src/FriendList";
import React, { useState } from "react";
import TabBar from "./src/TabBar";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const statusBarHeight = getStatusBarHeight(true);
const bottomSpace = getBottomSpace();

// console.log(`${Platform.OS}: ${statusBarHeight}, ${bottomSpace}`);

export default function App() {
  const [isOpened, setIsOpened] = useState(true);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const onPressArrow = () => {
    setIsOpened(!isOpened);
    console.log("깃 성공!");
  };

  const ItemSeparatorComponent = () => <Margin height={13} />;
  const renderItem = ({ item }) => (
    <View>
      <Profile
        uri={item.uri}
        name={item.name}
        introduction={item.introduction}
        isMe={false}
      />
    </View>
  );
  const ListHeaderComponent = () => (
    <View style={{ backgroundColor: "white" }}>
      <Header />

      <Margin height={10} />

      <Profile
        uri={myProfile.uri}
        name={myProfile.name}
        introduction={myProfile.introduction}
        isMe={true}
      />

      <Margin height={15} />

      <Division />

      <Margin height={12} />

      <FriendSection
        friendProfileLen={friendProfiles.length}
        onPressArrow={onPressArrow}
        isOpened={isOpened}
      />

      <Margin height={5} />
    </View>
  );
  const ListFooterComponent = () => <Margin height={10} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={isOpened ? friendProfiles : []}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        keyExtractor={(_, index) => index}
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
      />
      <TabBar
        selectedTabIdx={selectedTabIdx}
        setSelectedTabIdx={setSelectedTabIdx}
      />
    </View>
  );

  // return (
  //   // <SafeAreaProvider>
  //   //   <SafeAreaView edges={["right", "left"]} style={styles.container}>
  //   //     <Header />
  //   //   </SafeAreaView>
  //   <View style={styles.container}>
  //     <View style={{ flex: 1, paddingHorizontal: 15 }}>
  //       <Header />

  //       <Margin height={10} />

  //       <Profile
  //         uri={myProfile.uri}
  //         name={myProfile.name}
  //         introduction={myProfile.introduction}
  //       />

  //       <Margin height={15} />

  //       <Division />

  //       <Margin height={12} />

  //       <FriendSection
  //         friendProfileLen={friendProfiles.length}
  //         onPressArrow={onPressArrow}
  //         isOpened={isOpened}
  //       />

  //       <FriendList data={friendProfiles} isOpened={isOpened} />
  //     </View>
  //     <TabBar
  //       selectedTabIdx={selectedTabIdx}
  //       setSelectedTabIdx={setSelectedTabIdx}
  //     />
  //   </View>
  //   // </SafeAreaProvider>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 45,
    // // paddingBottom: bottomSpace,
  },
});
