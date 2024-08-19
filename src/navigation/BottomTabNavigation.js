import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { HomeScreen } from "../component/screens/HomeScreen";
import { HistoryListScreen } from "../component/screens/HistoryListScreen";
import { TabIcon } from "../component/TabIcon";

const Tab = createBottomTabNavigator();
export const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            const getIconName = () => {
              if (route.name === "History") {
                return "time";
              }
              return "home";
            };
            const iconName = getIconName();
            if (focused) {
              return <TabIcon iconName={iconName} iconColor={"skyblue"} />;
            }
            return <TabIcon iconName={iconName} iconColor={"gray"} />;
          },
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryListScreen} />
    </Tab.Navigator>
  );
};
