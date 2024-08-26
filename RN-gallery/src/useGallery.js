import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

const defaultAlbum = {
  id: 1,
  title: "기본",
};

const ASYNC_KEY = {
  IMAGES: "images",
  ALBUMS: "albums",
};

export const useGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [textInputModalVisible, setTextInputModalVisible] = useState(false);
  const [bigImgModalVisible, setBigImgModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const _setImages = (newImages) => {
    setImages(newImages);
    AsyncStorage.setItem(ASYNC_KEY.IMAGES, JSON.stringify(newImages));
  };
  const _setAlbums = (newAlbums) => {
    setAlbums(newAlbums);
    AsyncStorage.setItem(ASYNC_KEY.ALBUMS, JSON.stringify(newAlbums));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastId + 1,
        uri: result.assets[0].uri,
        albumId: selectedAlbum.id,
      };
      _setImages([...images, newImage]);
    }
  };

  const delImage = (imageId) => {
    Alert.alert("이미지를 삭제하시겠습니까?", "", [
      {
        style: "cancel",
        text: "아니요",
      },
      {
        text: "네",
        onPress: () => {
          //이미지 삭제
          const newImage = images.filter((image) => image.id !== imageId);
          _setImages(newImage);
        },
      },
    ]);
  };

  const delAllImages = (albumId) => {
    const newImage = images.filter((image) => image.albumId !== albumId);
    _setImages(newImage);
  };

  const openTextInputModal = () => {
    setTextInputModalVisible(true);
  };
  const closeTextInputModal = () => {
    setTextInputModalVisible(false);
  };
  const openBigImgModal = () => {
    setBigImgModalVisible(true);
  };
  const closeBigImgModal = () => {
    setBigImgModalVisible(false);
  };
  const openDropDown = () => {
    setIsDropDownOpen(true);
  };
  const closeDropDown = () => {
    setIsDropDownOpen(false);
  };

  const addAlbum = () => {
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;
    const newAlbum = {
      id: lastId + 1,
      title: albumTitle,
    };
    _setAlbums([...albums, newAlbum]);
    setSelectedAlbum(newAlbum);
  };

  const selectAlbum = (album) => {
    setSelectedAlbum(album);
  };

  const delAllImgInAlbum = (albumId) => {
    Alert.alert("이 앨범의 모든 사진을 삭제하시겠습니까?", "", [
      {
        style: "cancel",
        text: "아니요",
      },
      {
        text: "네",
        onPress: () => {
          const newImage = images.filter((image) => image.albumId !== albumId);
          _setImages(newImage);
        },
      },
    ]);
  };

  const delAlbum = (albumId) => {
    if (albumId === defaultAlbum.id) {
      Alert.alert("기본 앨범은 삭제할 수 없습니다.");
      return;
    }
    Alert.alert("앨범을 삭제하시겠습니까?", "", [
      {
        style: "cancel",
        text: "아니요",
      },
      {
        text: "네",
        onPress: () => {
          const newAlbums = albums.filter((album) => album.id !== albumId);
          _setAlbums(newAlbums);
          delAllImages(albumId);
          setSelectedAlbum(defaultAlbum);
        },
      },
    ]);
  };

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  const filteredImages = images.filter(
    (image) => image.albumId === selectedAlbum.id
  );
  const moveToPreviousImage = () => {
    // filteredImages
    const selectedImageIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );
    const previousImageIdx = selectedImageIndex - 1;
    if (previousImageIdx < 0) {
      return;
    }
    // console.log("selectedImageIndex", selectedImageIndex);
    // console.log("previousImageIndex", previousImageIdx);
    const previousImage = filteredImages[previousImageIdx];
    setSelectedImage(previousImage);
  };

  const moveToNextImage = () => {
    const selectedImageIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );
    const nextImageIdx = selectedImageIndex + 1;
    if (nextImageIdx > filteredImages.length - 1 || nextImageIdx === -1) {
      return;
    }
    // console.log("selectedImageIndex", selectedImageIndex);
    // console.log("nextImageIndex", nextImageIdx);
    const nextImage = filteredImages[nextImageIdx];
    setSelectedImage(nextImage);
  };
  const showPreviousArrow =
    filteredImages.findIndex((image) => image.id === selectedImage?.id) !== 0;
  const showNextArrow =
    filteredImages.findIndex((image) => image.id === selectedImage?.id) !==
    filteredImages.length - 1;

  const resetAlbumTitle = () => {
    setAlbumTitle("");
  };

  const imageWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: "",
    },
  ];

  const selectedAlbumID = selectedAlbum.id;

  // AsyncStorage를 이용하여 images와 albums 저장
  const initValues = async () => {
    //images
    const imagesFromStorage = await AsyncStorage.getItem(ASYNC_KEY.IMAGES);
    if (imagesFromStorage !== null) {
      const parsed = JSON.parse(imagesFromStorage);
      setImages(parsed);
    }

    //albums
    const albumsFromStorage = await AsyncStorage.getItem(ASYNC_KEY.ALBUMS);
    if (albumsFromStorage !== null) {
      const parsed = JSON.parse(albumsFromStorage);
      setAlbums(parsed);
    }
  };

  useEffect(() => {
    initValues();
  }, []);

  return {
    imageWithAddButton,
    pickImage,
    delImage,
    selectedAlbum,
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
    setAlbums,
    delAlbum,
    delAllImgInAlbum,
    bigImgModalVisible,
    openBigImgModal,
    closeBigImgModal,
    selectedImage,
    selectImage,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  };
};
