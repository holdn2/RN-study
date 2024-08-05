import { View, Text, TouchableOpacity } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const headerHeight = 50;

export default ({
  isDropDownOpen,
  onPressHeader,
  selectedAlbum,
  onPressAddAlbum,
  albums,
  onPressAlbum,
  onLongPressAlbum,
  delAllImages,
}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressHeader}
        style={{
          height: headerHeight,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => delAllImages(selectedAlbum.id)}
          style={{
            position: "absolute",
            left: 0,
            height: headerHeight,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 12, color: "red" }}>
            모두 삭제
          </Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold" }}>{selectedAlbum.title}</Text>
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
            borderTopColor: "lightgrey",
            borderTopWidth: 1,
          }}
        >
          {albums.map((album, index) => {
            const isSelectedAlbum = album.id === selectedAlbum.id;
            return (
              <TouchableOpacity
                key={`album-${index}`}
                activeOpacity={1}
                style={{
                  paddingVertical: 12,
                  width: "50%",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  borderBottomColor: "lightgrey",
                  borderBottomWidth: 1,
                  borderLeftColor: "lightgrey",
                  borderLeftWidth: 1,
                  borderRightColor: "lightgrey",
                  borderRightWidth: 1,
                }}
                onPress={() => onPressAlbum(album)}
                onLongPress={() => onLongPressAlbum(album.id)}
              >
                <Text
                  style={{ fontWeight: isSelectedAlbum ? "bold" : undefined }}
                >
                  {album.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
