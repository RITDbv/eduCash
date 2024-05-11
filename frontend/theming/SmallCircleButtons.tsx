// components/SmallCircleButtons.tsx

import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

interface ButtonProps {
  title: string;
  screenName: string;
}

const SmallCircleButtons: React.FC<ButtonProps> = ({ title, screenName }) => {
  const navigation = useNavigation(); // Get the navigation object

  const handleCardPress = () => {
    // Navigate to the specified screen
    navigation.navigate(screenName);
  };

  return (
    <Pressable style={styles.smallButton} onPress={handleCardPress}>
      <View>
        <Text style={styles.buttonTitle}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
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
    backgroundColor: "#4070b8", // Customize the button color
    margin: 10,
  },
  buttonTitle: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 22,
    padding: 1
  }
});

export default SmallCircleButtons;
