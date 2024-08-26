import React, { useCallback } from "react";
import { View } from "react-native";
import { Header } from "../component/Header/Header";
import { Spacer } from "../component/Spacer";
import { useNavigation, useRoute } from "@react-navigation/native";
import WebView from "react-native-webview";
import { Typography } from "../component/Typography";

export const LinkDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName="arrow-back" onPress={onPressBack} />
          <Spacer space={12} horizontal />
          <Header.Title title="LINK DETAIL" />
        </Header.Group>
      </Header>
      <WebView source={{ uri: item.link }} style={{ flex: 1 }} />
    </View>
  );
};
