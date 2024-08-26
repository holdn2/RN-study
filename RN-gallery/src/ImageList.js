import {
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";

const width = Dimensions.get("screen").width;
const minColumnSize = width >= 500 ? 200 : 130;
const divisor = width / minColumnSize;
const numColumns = Math.floor(divisor);
const columnSize = width / numColumns;

export default ({
  imageWithAddButton,
  onPressOpenGallery,
  onPressImage,
  onLongPressImage,
}) => {
  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image;
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "200",
              fontSize: 45,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => onPressImage(image)}
        onLongPress={() => onLongPressImage(id)}
      >
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={imageWithAddButton}
      renderItem={renderItem}
      numColumns={numColumns}
      style={{ zIndex: -1 }}
    />
  );
};
