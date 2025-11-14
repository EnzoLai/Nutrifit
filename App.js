import React, { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import LoginScreen from "./LoginScreen";
import ProfileScreen from "./ProfileScreen";
import OkScreen from "./OkScreen";
import logo from './assets/logo.png'

export default function App() {

  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("login");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      
      {/* HEADER */}

      <View style={styles.header}>
        <Image
          source={logo}
          style={styles.logo}
        />
        <Text style={styles.appName}>NutriFit</Text>
      </View>


      {/* NAVIGATION */}
      {screen === "login" && (
        <LoginScreen
          onLogin={(userData) => {
            setUser(userData);
            setScreen("profile");
          }}
        />
      )}

      {screen === "profile" && (
        <ProfileScreen
          user={user}
          onLogout={() => setScreen("login")}
          onSaveSuccess={() => setScreen("ok")}
        />
      )}

      {screen === "ok" && <OkScreen onBack={() => setScreen("login")} />}
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  logo: {
    width: 55,
    height: 55,
    resizeMode: "contain",
    marginRight: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#28B572",
  },
});

