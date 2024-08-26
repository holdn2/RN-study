import {
  RefreshControl,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import BusInfo from "./src/BusInfo";
import { COLOR } from "./src/color";
import {
  getSections,
  busStop,
  getBusNumColorByType,
  getRemainedTimeText,
  getSeatStatusText,
} from "./src/data";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Margin from "./src/Margin";
import BookmarkButton from "./src/BookmarkButton";
import { useTheme } from "./src/use-theme";

const busStopBookmarkSize = 20;
const busStopBookmarkPadding = 6;

export default function App() {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs());
  const [refreshing, setRefreshing] = useState(false);

  const { NEWCOLOR, isDark, toggleIsDark } = useTheme();

  const onPressBusStopBookmark = () => {
    //서버와 통신할 떄 필요.
  };

  const ListHeaderComponent = () => (
    <View
      style={{
        backgroundColor: COLOR.GRAY_3,
        height: 170,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 정류소 번호, 이름, 방향 */}

      <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 13 }}>
        {busStop.id}
      </Text>
      <Margin height={4} />
      <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 20 }}>
        {busStop.name}
      </Text>
      <Margin height={4} />
      <Text style={{ color: NEWCOLOR.GRAY_1_GRAY_2, fontSize: 14 }}>
        {busStop.directionDescription}
      </Text>
      <Margin height={20} />
      {/* 북마크 */}
      <BookmarkButton
        NEWCOLOR={NEWCOLOR}
        size={busStopBookmarkSize}
        isBookmarked={busStop.isBookmarked}
        onPress={onPressBusStopBookmark}
        style={{
          borderWidth: 0.3,
          borderColor: COLOR.GRAY_2,
          borderRadius: (busStopBookmarkSize + busStopBookmarkPadding * 2) / 2,
          padding: busStopBookmarkPadding,
        }}
      />
      <Margin height={10} />
      <Switch
        value={isDark}
        onValueChange={(v) => {
          toggleIsDark();
        }}
      />
      <Margin height={15} />
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View
      style={{
        paddingLeft: 13,
        paddingVertical: 3,
        backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
        borderTopWidth: 0.5,
        borderTopColor: NEWCOLOR.GRAY_2_GRAY_3,
        borderBottomWidth: 0.5,
        borderBottomColor: NEWCOLOR.GRAY_2_GRAY_3,
      }}
    >
      <Text style={{ fontSize: 12, color: NEWCOLOR.GRAY_4_GRAY_1 }}>
        {title}
      </Text>
    </View>
  );
  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null; // ?. 는 null safety 를 위해서 ?를 추가함.
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: "도착 정보 없음",
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });
    return (
      <BusInfo
        NEWCOLOR={NEWCOLOR}
        isBookmarked={bus.isBookmarked}
        onPressBookmark={() => {}}
        num={bus.num}
        directionDescription={bus.directionDescription}
        numColor={numColor}
        processedNextBusInfos={processedNextBusInfos}
      />
    );
  };

  const ItemSeparatorComponent = () => (
    <View
      style={{
        width: "100%",
        height: 1,
        backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
      }}
    />
  );

  const ListFooterComponent = () => <Margin height={30} />;

  const onRefresh = () => {
    setRefreshing(true);
  };

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        // API refetch 완료되는 시점에 false로
        // 이것은 3초 예시
        setNow(dayjs());
        setRefreshing(false);
      }, 2000);
    }
  }, [refreshing]);

  useEffect(() => {
    // const interval = setInterval(() => {
    //   const newNow = dayjs();
    //   setNow(newNow);
    // }, 1000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: NEWCOLOR.WHITE_BLACK,
      }}
    >
      {/* 뒤로가기와 홈 아이콘 */}
      <View style={{ width: "100%", backgroundColor: COLOR.GRAY_3 }}>
        <SafeAreaView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity style={{ padding: 10 }}>
            <SimpleLineIcons
              name="arrow-left"
              size={20}
              color={NEWCOLOR.WHITE_BLACK}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }}>
            <SimpleLineIcons
              name="home"
              size={20}
              color={NEWCOLOR.WHITE_BLACK}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: 500,
            backgroundColor: COLOR.GRAY_3,
            zIndex: -1,
          }}
        />
      </View>

      <SectionList
        style={{ flex: 1, width: "100%" }}
        sections={sections}
        ListHeaderComponent={ListHeaderComponent}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        //refreshControl : 스크롤이 가능한 곳에서 스크롤하는 것이 0미만으로 갈 떄 실행되는 스와이프 이벤트
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
