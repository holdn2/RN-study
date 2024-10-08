import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default (props) => {
  const { onPress, isSelected, text } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        isSelected ? styles.selectedButton : styles.notselectedButton,
      ]}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#FFFFFF80",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginHorizontal: 5,
  },
  selectedButton: {
    borderColor: "white",
  },
  notselectedButton: {
    borderColor: "transparent",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
