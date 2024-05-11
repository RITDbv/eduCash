import React from "react";
import { StyleSheet, View, Text, ImageBackground  } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient from expo-linear-gradient

// Define your dark grey gradient colors
const gradientColors = [
  " rgba(91,91,91,1)",
  "rgba(14,14,14,1)",
  // "rgba(253, 159, 62, 0.10)",
];

// Custom component for gradient background
const GradientBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/peakpx.jpg')} // Change the path to your image file
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
    {/* <LinearGradient colors={gradientColors} style={styles.container}> */}
      {children}
    {/* </LinearGradient> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // You can adjust other styles here if needed
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imageStyle: {
    opacity: 1, // Adjust the opacity of the image if needed
  },
});

export default GradientBackground;
