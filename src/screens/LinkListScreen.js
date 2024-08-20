import React, { useCallback } from "react";
import { FlatList, View } from "react-native";
import { Header } from "../component/Header/Header";
import { Button } from "../component/Button";
import { Typography } from "../component/Typography";
import { useNavigation } from "@react-navigation/native";
import { Spacer } from "../component/Spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../component/Icons";
import { useRecoilValue } from "recoil";
import { atomLinkList } from "../states/atomLinkList";

export const LinkListScreen = () => {
  const navigation = useNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const data = useRecoilValue(atomLinkList);

  const onPressListItem = useCallback((item) => {
    navigation.navigate("LinkDetail", { item });
  }, []);
  const onPressAddButton = useCallback(() => {
    navigation.navigate("AddLink");
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title="LINK LIST" />
        </Header.Group>
      </Header>
      <FlatList
        style={{ flex: 1 }}
        data={data.list}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => {
          return (
            <Button
              onPress={() => onPressListItem(item)}
              paddingHorizontal={24}
              paddingVertical={24}
            >
              <View>
                <Typography fontSize={20}>
                  {item.link || "No Link Provided"}
                </Typography>
                <Spacer space={4} />
                <Typography fontSize={16} color="gray">
                  {item.title !== "" ? `${item.title.slice(0, 20)} | ` : ""}
                  {new Date(item.createAt).toLocaleString()}
                </Typography>
              </View>
            </Button>
          );
        }}
      />

      <View
        style={{
          position: "absolute",
          right: 24,
          bottom: 24 + safeAreaInset.bottom,
        }}
      >
        <Button onPress={onPressAddButton}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
            }}
          >
            <Icon name="add" color="white" size={32} />
          </View>
        </Button>
      </View>
    </View>
  );
};
