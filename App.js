import {
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import { useGallery } from "./src/useGallery";
import MyDropDownPicker from "./src/MyDropDownPicker";
import TextInputModal from "./src/TextInputModal";
import BigImgModal from "./src/BigImgModal";

const width = Dimensions.get("screen").width;
const columnSize = width / 3;

export default function App() {
  const {
    imageWithAddButton,
    pickImage,
    delImage,
    selectedAlbum,
    selectedAlbumID,
    textInputModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropDownOpen,
    openDropDown,
    closeDropDown,
    albums,
    selectAlbum,
    delAlbum,
    delAllImgInAlbum,
  } = useGallery();

  const onPressBackdrop = () => {
    closeTextInputModal();
  };

  const onPressOpenGallery = () => {
    pickImage();
  };
  const onLongPressImage = (imageId) => {
    delImage(imageId);
  };
  const onPressAddAlbum = () => {
    openTextInputModal();
  };
  const onSubmitEditing = () => {
    //1. 앨범 타이틀 추가
    if (!albumTitle) return;
    addAlbum();
    //2. modal 닫기 & TextInput의 value 초기화
    closeTextInputModal();
    resetAlbumTitle();
  };
  const onPressHeader = () => {
    if (isDropDownOpen) {
      closeDropDown();
    } else {
      openDropDown();
    }
  };
  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropDown();
  };
  const onLongPressAlbum = (albumId) => {
    delAlbum(albumId);
  };
  const onPressDelAll = (selectedAlbumID) => {
    delAllImgInAlbum(selectedAlbumID);
  };

  const renderItem = ({ item: { id, uri }, index }) => {
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
      <TouchableOpacity onLongPress={() => onLongPressImage(id)}>
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* 앨범 DropDown, 앨범 추가 버튼 */}
      <MyDropDownPicker
        isDropDownOpen={isDropDownOpen}
        onPressHeader={onPressHeader}
        selectedAlbum={selectedAlbum}
        onPressAddAlbum={onPressAddAlbum}
        albums={albums}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={onLongPressAlbum}
        delAllImages={onPressDelAll}
      />
      {/* 앨범을 추가하는 TextInputModal */}
      <TextInputModal
        textInputModalVisible={textInputModalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressBackdrop}
      />
      {/* 이미지를 크게 보는 Modal */}
      <BigImgModal />
      {/* 이미지 리스트 */}
      <FlatList
        data={imageWithAddButton}
        renderItem={renderItem}
        numColumns={3}
        style={{ zIndex: -1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
