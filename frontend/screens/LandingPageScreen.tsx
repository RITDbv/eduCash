import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Text,
  Pressable,
} from "react-native";
import AvatarComponent from "../theming/AvatarComponent";
import SmallCircleButtons from "../theming/SmallCircleButtons";
import FullWidthCard from "../theming/FullWidthCard";

const LandingPageScreen: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => {
        setPopupMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  const handleToggle = () => {
    setIsOnline((prevState) => !prevState);
    setPopupMessage(isOnline ? "Offline mode" : "Online mode");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.avatarAndButtons}>
          <AvatarComponent />
          <View style={styles.buttonContainer}>
            <View style={styles.row}>
              <SmallCircleButtons title="€" screenName="CreditScreen" />
              <SmallCircleButtons title="€" screenName="CreditScreen" />
            </View>
            <View style={styles.row}>
              <Pressable
                style={styles.smallButton}
                onPress={handleToggle}
              >
                <View>
                  <Text style={styles.buttonTitle}>Mode</Text>
                </View>
              </Pressable>
              <Pressable
                style={{width: 35, height: 35, borderRadius: 50, backgroundColor: isOnline ? "green" : "red", margin: 10}}
              >
              </Pressable>
            </View>
          </View>
        </View>
        {popupMessage ? (
          <View style={styles.popup}>
            <Text style={styles.popupText}>{popupMessage}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.bottomSection}>
        <FullWidthCard
          title="Tic Tac Toe"
          description="Play the game"
          imageUrl="https://cdn-icons-png.flaticon.com/256/3292/3292364.png"
          screenName="TicTacToe"
        />
        <FullWidthCard
          title="Chess"
          description="Play the game"
          imageUrl="https://cdn-icons-png.flaticon.com/512/2656/2656506.png"
          screenName="ProfileScreen"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F22",
  },
  topSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 115,
  },
  avatarAndButtons: {
    flexDirection: "row", // Arrange components horizontally
    alignItems: "center", // Center vertically
    marginVertical: 10, // Adjust the vertical spacing
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    paddingTop: 20,
    marginBottom: 30,
  },
  popup: {
    position: "absolute",
    top: 47,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 10,
    padding: 10,
  },
  popupText: {
    color: "white",
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  smallButton: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "#0951BD", // Customize the button color
    margin: 10,
  },
  buttonTitle: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 9,
    padding: 1,
    marginTop: 8
  }
});

export default LandingPageScreen;
