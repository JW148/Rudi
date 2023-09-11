import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Logs } from "expo";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Till from "./components/Till";
import Stock from "./components/Stock";
import Sales from "./components/Sales";
import {
  getDocs,
  createDoc,
  deleteDoc,
  updateDoc,
  getStatus,
  getSalesWithDate,
} from "./utils/Requests";

//Redux
import store from "./Redux/store";
import { Provider } from "react-redux";

export default function App() {
  Logs.enableExpoCliLogging();

  const [status, setStatus] = useState("Offline");

  useEffect(() => {
    connectToServer();
  }, []);

  const connectToServer = () => {
    setStatus("Connecting...");
    const addresses = [
      "10.0.2.2",
      "192.168.0.58",
      "192.168.0.73",
      "94.173.240.211",
    ];
    let i = 0;
    let fetch = () => {
      console.log(i);
      getStatus(addresses[i]).then((res) => {
        if (res.status === "OK") {
          setStatus("Connected");
        } else if (i >= addresses.length - 1) {
          return;
        } else {
          i++;
          fetch();
        }
      });
    };
    fetch();
  };

  const Drawer = createDrawerNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Till">
          <Drawer.Screen
            name="Till"
            component={Till}
            options={({ navigation, route }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => connectToServer()}>
                  <Text style={{ paddingRight: 5 }}>{status}</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Drawer.Screen
            name="Stock"
            component={Stock}
            options={({ navigation, route }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => connectToServer()}>
                  <Text style={{ paddingRight: 5 }}>{status}</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Drawer.Screen
            name="Sales"
            component={Sales}
            options={({ navigation, route }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => connectToServer()}>
                  <Text style={{ paddingRight: 5 }}>{status}</Text>
                </TouchableOpacity>
              ),
            })}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
