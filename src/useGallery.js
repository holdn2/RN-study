import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

const defaultAlbum = {
  id: 1,
  title: "기본",
};

export const useGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [textInputModalVisible, setTextInputModalVisible] = useState(false);
  const [bigImgModalVisible, setBigImgModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

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
      setImages([...images, newImage]);
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
          setImages(newImage);
        },
      },
    ]);
  };

  const delAllImages = (albumId) => {
    const newImage = images.filter((image) => image.albumId !== albumId);
    setImages(newImage);
  };

  const openTextInputModal = () => {
    setTextInputModalVisible(true);
  };
  const closeTextInputModal = () => {
    setTextInputModalVisible(false);
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
    setAlbums([...albums, newAlbum]);
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
          setImages(newImage);
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
          setAlbums(newAlbums);
          delAllImages(albumId);
          setSelectedAlbum(defaultAlbum);
        },
      },
    ]);
  };

  const resetAlbumTitle = () => {
    setAlbumTitle("");
  };

  const filteredImages = images.filter(
    (image) => image.albumId === selectedAlbum.id
  );

  const imageWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: "",
    },
  ];

  const selectedAlbumID = selectedAlbum.id;

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
  };
};
