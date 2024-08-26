import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
//file
import { runPracticeDayjs } from "./src/practice-dayjs";
import {
  bottomSpace,
  getCalendarColumns,
  ITEM_WIDTH,
  statusBarHeight,
} from "./src/util";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCalendar } from "./src/hook/use-calendar";
import { useTodoList } from "./src/hook/use-todo-list";
import Calendar from "./src/Calendar";
import Margin from "./src/Margin";
import AddTodoInput from "./src/AddTodoInput";

export default function App() {
  const now = dayjs();
  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  } = useCalendar(now);
  const {
    filteredTodoList,
    todoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput,
  } = useTodoList(selectedDate);

  const columns = getCalendarColumns(selectedDate);

  const onPressLeftArrow = subtract1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressRightArrow = add1Month;
  const onPressDate = setSelectedDate;
  // const ListHeaderComponent = () => {
  //   const currentDateText = dayjs(selectedDate).format("YYYY.MM.DD.");
  //   return (
  //     <View>
  //       {/* < YYYY.MM.DD. > */}
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <ArrowButton iconName="arrow-left" onPress={onPressLeftArrow} />
  //         <TouchableOpacity onPress={showDatePicker}>
  //           <Text style={{ fontSize: 20, color: "#404040" }}>
  //             {currentDateText}
  //           </Text>
  //         </TouchableOpacity>
  //         <ArrowButton iconName="arrow-right" onPress={onPressRightArrow} />
  //       </View>

  //       {/* 일 ~ 토 */}
  //       <View style={{ flexDirection: "row" }}>
  //         {[0, 1, 2, 3, 4, 5, 6].map((day) => {
  //           const dayText = getDayText(day);
  //           const color = getDayColor(day);
  //           return (
  //             <Column
  //               key={`day-${day}`}
  //               text={dayText}
  //               color={color}
  //               opacity={1}
  //               disabled={true}
  //             />
  //           );
  //         })}
  //       </View>
  //     </View>
  //   );
  // };

  // const renderItem = ({ item: date }) => {
  //   const dateText = dayjs(date).get("date");
  //   const day = dayjs(date).get("day");
  //   const color = getDayColor(day);
  //   const isCurrentMonth = dayjs(date).isSame(selectedDate, "month");
  //   const onPress = () => {
  //     setSelectedDate(date);
  //   };
  //   const isSelected = dayjs(date).isSame(selectedDate, "date");
  //   return (
  //     <Column
  //       text={dateText}
  //       color={color}
  //       opacity={isCurrentMonth ? 1 : 0.4}
  //       onPress={onPress}
  //       isSelected={isSelected}
  //     />
  //   );
  // };

  const ListHeaderComponent = () => (
    <View>
      <Calendar
        columns={columns}
        todoList={todoList}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressRightArrow={onPressRightArrow}
        onPressDate={onPressDate}
      />
      <Margin height={15} />
      <View
        style={{
          width: 4,
          height: 4,
          borderRadius: 4 / 2,
          backgroundColor: "#a3a3a3",
          alignSelf: "center",
        }}
      />
      <Margin height={15} />
    </View>
  );
  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggleTodo(todo.id);
    const onLongPress = () => {
      Alert.alert("삭제하시겠습니까?", "", [
        {
          style: "cancel",
          text: "아니오",
        },
        {
          text: "네",
          onPress: () => removeTodo(todo.id),
        },
      ]);
    };
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
          width: ITEM_WIDTH,
          flexDirection: "row",
          // backgroundColor: todo.id % 2 === 0 ? "pink" : "lightblue",
          alignSelf: "center",
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: "#a6a6a6",
        }}
      >
        <Text style={{ flex: 1, fontSize: 14, color: "#595959" }}>
          {todo.content}
        </Text>

        <Ionicons
          name="checkmark"
          size={17}
          color={isSuccess ? "#595959" : "#bfbfbf"}
        />
      </Pressable>
    );
  };

  const flatListRef = useRef(null);
  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 300);
  };

  const onPressAdd = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  };
  const onSubmitEditing = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  };

  const onFocus = () => {
    scrollToEnd();
  };
  useEffect(() => {
    runPracticeDayjs();
  }, []);
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Image
        source={{
          uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c",
        }}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      {/* 
      <FlatList
        data={columns}
        contentContainerStyle={{ paddingTop: statusBarHeight + 25 }}
        keyExtractor={(_, index) => `column-${index}`}
        numColumns={7}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
      /> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          ref={flatListRef}
          data={filteredTodoList}
          contentContainerStyle={{ paddingTop: statusBarHeight + 60 }}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />

        <AddTodoInput
          value={input}
          onChangeText={setInput}
          placeholder={`${dayjs(selectedDate).format("MM.D")}에 추가할 투두`}
          onPressAdd={onPressAdd}
          onSubmitEditing={onSubmitEditing}
          onFocus={onFocus}
        />
      </KeyboardAvoidingView>
      <Margin height={bottomSpace + 40} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
