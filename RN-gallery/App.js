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
import ImageList from "./src/ImageList";

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
    bigImgModalVisible,
    openBigImgModal,
    closeBigImgModal,
    selectImage,
    selectedImage,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  } = useGallery();

  const onPressTextInputModalBackdrop = () => {
    closeTextInputModal();
  };

  const onPressOpenGallery = () => {
    pickImage();
  };
  const onLongPressImage = (imageId) => {
    delImage(imageId);
  };
  const onPressWatchAd = () => {
    openTextInputModal();
  };
  const onPressAddAlbum = () => {
    if (albums.length >= 2) {
      Alert.alert("광고를 시청해야 앨범을 추가할 수 있습니다.", "", [
        {
          style: "cancel",
          text: "닫기",
        },
        {
          text: "광고 시청",
          onPress: onPressWatchAd,
        },
      ]);
    } else {
      openTextInputModal();
    }
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
  const onPressBigImgModalBackdrop = () => {
    closeBigImgModal();
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

  const onPressImage = (image) => {
    // 이미지 클릭시 크게 모달로 띄우기
    selectImage(image);
    openBigImgModal();
  };
  const onPressArrowLeft = () => {
    moveToPreviousImage();
  };
  const onPressArrowRight = () => {
    moveToNextImage();
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
        modalVisible={textInputModalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressTextInputModalBackdrop}
      />
      {/* 이미지를 크게 보는 Modal */}
      <BigImgModal
        modalVisible={bigImgModalVisible}
        onPressBackdrop={onPressBigImgModalBackdrop}
        selectedImage={selectedImage}
        onPressArrowLeft={onPressArrowLeft}
        onPressArrowRight={onPressArrowRight}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
      />
      {/* 이미지 리스트 */}
      <ImageList
        imageWithAddButton={imageWithAddButton}
        onPressOpenGallery={onPressOpenGallery}
        onPressImage={onPressImage}
        onLongPressImage={onLongPressImage}
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
