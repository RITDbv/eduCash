// CreditScreen.tsx

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import GameStatsChart from '../theming/GameStatsChart';
import FullWidthCard from '../theming/FullWidthCard';

const CreditScreen: React.FC = () => {
  // Fetch game statistics (replace with actual data)
  const gamesWon = 10;
  const gamesLost = 5;

  return (
    <View style={styles.container}>
      <Text style={styles.statics}>Your credit is: 500 Coins</Text>
      <FullWidthCard
          title="Buy Coins"
          description="Buy Coins to play"
          imageUrl="https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-11/512/cash-icon.png"
          screenName="TicTacToe"
        />
      <FullWidthCard
          title="Sell Coins"
          description="Sell Coins for money"
          imageUrl="https://www.shareicon.net/download/2017/02/09/878588_hand_512x512.png"
          screenName="TicTacToe"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F1F22',
    padding: 20,
    textAlign: "center"
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  statics: {
    color: "#FFFFFF",
    fontSize: 28,
    padding: 20,
    margin: 40,
    textAlign: "center"
  }
});

export default CreditScreen;
