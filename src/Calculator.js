import { View, TouchableOpacity, Text } from "react-native";
import { useCalculator } from "./useCalculator";
// import styled from "styled-components-native";

const COLOR = {
  RESULT: "#4e4c51",
  RESET: "#5f5e62",
  OPERATOR: "#f39c29",
  NUM: "#5c5674",
};

// Button type: 'reset' | 'operator' | 'num'
const Button = ({ text, onPress, flex, type, isSelected }) => {
  const backgroundColor =
    type === "reset"
      ? COLOR.RESET
      : type === "operator"
      ? COLOR.OPERATOR
      : type === "num"
      ? COLOR.NUM
      : "transparent";
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        //   paddingVertical: 15,
        height: 50,
        borderWidth: isSelected ? 1 : 0.2,
        borderColor: "black",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 25,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default () => {
  const {
    //custom hook 사용해서 UI부분 코드 줄이기
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  } = useCalculator();

  return (
    <View style={{ flex: 1, width: 300, justifyContent: "center" }}>
      {/* test용 */}
      {__DEV__ && (
        <>
          <Text>input: {input}</Text>
          <Text>currentOperator: {currentOperator}</Text>
          <Text>result: {result}</Text>
          <Text>tempInput: {tempInput}</Text>
          <Text>tempOperator: {tempOperator}</Text>
        </>
      )}

      {/* 결과 */}
      <View
        style={{
          backgroundColor: COLOR.RESULT,
          minHeight: 50,
          justifyContent: "center",
          alignItems: "flex-end",
          paddingVertical: 10, // top, right, bottom, left
          paddingHorizontal: 5,
        }}
      >
        <Text style={{ color: "white", fontSize: 35, textAlign: "right" }}>
          {input}
        </Text>
      </View>

      {/* [AC ~ /] 초기화 버튼부터 나누기(%)까지 */}
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Button
          type="reset"
          text={hasInput ? "C" : "AC"}
          onPress={onPressReset}
          flex={3}
        />
        <Button
          type="operator"
          text="/"
          onPress={() => onPressOperator("/")}
          flex={1}
          isSelected={currentOperator === "/"}
        />
      </View>

      {/* [7 ~ x] 7부터 곱하기(x)까지 */}
      <View style={{ flexDirection: "row", width: "100%" }}>
        {[7, 8, 9].map((num) => (
          <Button
            key={`num-${num}`} // key : num-7, num-8, num-9
            type="num"
            text={`${num}`}
            //   text={String(num)}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type="operator"
          text="*"
          onPress={() => onPressOperator("*")}
          flex={1}
          isSelected={currentOperator === "*"}
        />
      </View>

      {/* [4 ~ -] */}
      <View style={{ flexDirection: "row", width: "100%" }}>
        {[4, 5, 6].map((num) => (
          <Button
            key={`num-${num}`}
            type="num"
            text={`${num}`}
            //   text={String(num)}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type="operator"
          text="-"
          onPress={() => onPressOperator("-")}
          flex={1}
          isSelected={currentOperator === "-"}
        />
      </View>

      {/* [1 ~ +] */}
      <View style={{ flexDirection: "row", width: "100%" }}>
        {[1, 2, 3].map((num) => (
          <Button
            key={`num-${num}`}
            type="num"
            text={`${num}`}
            //   text={String(num)}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}

        <Button
          type="operator"
          text="+"
          onPress={() => onPressOperator("+")}
          flex={1}
          isSelected={currentOperator === "+"}
        />
      </View>

      {/* [0 ~ =] */}
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Button type="num" text="0" onPress={() => onPressNum(0)} flex={3} />
        <Button
          type="operator"
          text="="
          onPress={() => onPressOperator("=")}
          flex={1}
        />
      </View>
    </View>
  );
};
