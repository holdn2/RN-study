import { View, Text, TouchableOpacity } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const headerHeight = 50;

export default ({
  isDropDownOpen,
  onPressHeader,
  selectedAlbumTitle,
  onPressAddAlbum,
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPressHeader}
        style={{
          height: headerHeight,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{selectedAlbumTitle}</Text>
        <SimpleLineIcons
          name={isDropDownOpen ? "arrow-up" : "arrow-down"}
          size={12}
          color="black"
          style={{ marginLeft: 8 }}
        />
        <TouchableOpacity
          onPress={onPressAddAlbum}
          style={{
            position: "absolute",
            right: 0,
            height: headerHeight,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 12 }}>앨범추가</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      {isDropDownOpen && (
        <View
          style={{
            position: "absolute",
            top: headerHeight,
            width: "100%",
            height: 100,
            backgroundColor: "lightblue",
          }}
        ></View>
      )}
    </View>
  );
};
