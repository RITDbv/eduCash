// ProfileScreen.tsx

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import GameStatsChart from "../theming/GameStatsChart";
import GradientBackground from "../theming/GradientBackground";

const ProfileScreen: React.FC = () => {
  // Fetch game statistics (replace with actual data)
  const gamesWon = 10;
  const gamesLost = 5;

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=512",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.statics}>
          Total Games Played: {gamesWon + gamesLost}
        </Text>
        <GameStatsChart gamesWon={gamesWon} gamesLost={gamesLost} />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  statics: {
    color: "#FFFFFF",
  },
});

export default ProfileScreen;
