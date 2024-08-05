import { Modal, Pressable, View, Image, TouchableOpacity } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        justifyContent: "center",
        height: "100%",
        paddingHorizontal: 20,
      }}
    >
      <SimpleLineIcons
        name={iconName}
        size={20}
        color={disabled ? "lightgrey" : "black"}
      />
    </TouchableOpacity>
  );
};

export default ({
  modalVisible,
  onPressBackdrop,
  selectedImage,
  onPressArrowLeft,
  onPressArrowRight,
  showPreviousArrow,
  showNextArrow,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <Pressable
        onPress={onPressBackdrop}
        style={{
          flex: 1,
          //   backgroundColor: "lightblue",
          //   opacity: 0.5,
          backgroundColor: `rgba(115,115,115,0.5)`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* 왼쪽 화살표 */}

          <ArrowButton
            iconName={"arrow-left"}
            onPress={onPressArrowLeft}
            disabled={!showPreviousArrow}
          />
          {/* 이미지 */}
          <Pressable>
            <Image
              source={{ uri: selectedImage?.uri }}
              style={{ width: 280, height: 280, backgroundColor: "white" }}
              resizeMode="contain"
            />
          </Pressable>
          {/* 오른쪽 화살표 */}
          <ArrowButton
            iconName={"arrow-right"}
            onPress={onPressArrowRight}
            disabled={!showNextArrow}
          />
        </View>
      </Pressable>
    </Modal>
  );
};
