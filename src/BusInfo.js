import { View, Text } from "react-native";
import BookmarkButton from "./BookmarkButton";
import { COLOR } from "./color";
import AlarmButton from "./AlarmButton";
import NextBusInfo from "./NextBusInfo";

export default ({
  isBookmarked,
  onPressBookmark,
  num,
  numColor,
  directionDescription,
  processedNextBusInfos,
  NEWCOLOR = { NEWCOLOR },
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 75,
        backgroundColor: NEWCOLOR.WHITE_BLACK,
      }}
    >
      <View style={{ flex: 0.9, flexDirection: "row", alignItems: "center" }}>
        {/* 북마크 */}
        <BookmarkButton
          NEWCOLOR={NEWCOLOR}
          size={20}
          style={{ paddingHorizontal: 10 }}
          isBookmarked={isBookmarked}
          onPress={onPressBookmark}
        />
        {/* 버스 번호와 방향 */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
          <Text style={{ fontSize: 13, color: COLOR.GRAY_3, marginRight: 5 }}>
            {directionDescription} 방향
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        {/* M분 S초 / N번째 전 / 여유 */}
        <View style={{ flex: 1 }}>
          {processedNextBusInfos.map((info, index) => (
            <NextBusInfo
              NEWCOLOR={NEWCOLOR}
              key={index}
              hasInfo={info.hasInfo}
              remainedTimeText={info.remainedTimeText}
              numOfRemainedStops={info.numOfRemainedStops}
              seatStatusText={info.seatStatusText}
            />
          ))}
        </View>

        {/* 알람아이콘 */}
        <AlarmButton
          NEWCOLOR={NEWCOLOR}
          onPress={() => {}}
          style={{ paddingHorizontal: 15 }}
        />
      </View>
    </View>
  );
};
