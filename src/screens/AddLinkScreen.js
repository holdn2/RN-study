import React, { useCallback, useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { Header } from "../component/Header/Header";
import { useNavigation } from "@react-navigation/native";
import { SingleLineInput } from "../component/SingleLineInput";
import { Typography } from "../component/Typography";
import { Button } from "../component/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacer } from "../component/Spacer";
import { useSetRecoilState } from "recoil";
import { atomLinkList } from "../states/atomLinkList";
import { getOpenGraphData } from "../utils/OpenGraphTagUtils";
import { RemoteImage } from "../component/RemoteImages";
import { getClipboardString } from "../utils/ClipboardUtils";

export const AddLinkScreen = () => {
  const [url, setUrl] = useState("");
  const [metaData, setMetaData] = useState(null);
  const updateList = useSetRecoilState(atomLinkList);
  const navigation = useNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, []);
  const onPressSave = useCallback(() => {
    if (url === "") {
      return;
    }

    updateList((prevState) => {
      const list = [
        {
          title: metaData.title,
          image: metaData.image,
          link: url,
          createAt: new Date().toISOString(),
        },
      ];

      return {
        list: list.concat(prevState.list),
      };
    });
    setUrl("");
  }, [url, updateList]);

  const onSubmitEditing = useCallback(async () => {
    const result = await getOpenGraphData(url);

    setMetaData(result);
  }, [url]);

  const onGetClipboardString = useCallback(async () => {
    const result = await getClipboardString();
    if (result.startsWith("http://") || result.startsWith("https://")) {
      setUrl(result);
      const ogResult = await getOpenGraphData(result);
      setMetaData({
        title: ogResult.title,
        image: ogResult.image,
        description: ogResult.description,
      });
    }
    console.log("result, ", result);
  }, []);

  useEffect(() => {
    onGetClipboardString();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title="ADDLINK" />
        </Header.Group>
        <Header.Icon iconName="close" onPress={onPressClose} />
      </Header>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 32,
          paddingHorizontal: 24,
        }}
      >
        <SingleLineInput
          value={url}
          onChangeText={setUrl}
          placeholder="https://example.com"
          onSubmitEditing={onSubmitEditing}
        />
        {metaData !== null && (
          <>
            <Spacer space={20} />
            <View
              style={{ borderWidth: 1, borderRadius: 4, borderColor: "gray" }}
            >
              <RemoteImage
                url={metaData.image}
                width={width - 48}
                height={(width - 48) * 0.5}
              />
              <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                <Spacer space={10} />
                <Typography fontSize={20} color={"black"}>
                  {metaData.title}
                </Typography>
                <Spacer space={4} />
                <Typography fontSize={16} color={"gray"}>
                  {metaData.description}
                </Typography>
              </View>
            </View>
          </>
        )}
      </View>
      <Button onPress={onPressSave}>
        <View style={{ backgroundColor: url === "" ? "gray" : "black" }}>
          <View
            style={{
              height: 52,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="white" fontSize={18}>
              저장하기
            </Typography>
          </View>
          <Spacer space={safeAreaInset.bottom} />
        </View>
      </Button>
    </View>
  );
};
