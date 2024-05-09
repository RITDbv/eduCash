// WinScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import GameStatsChart from '../theming/GameStatsChart';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const WinScreen: React.FC = () => {
  const navigation = useNavigation(); // Get the navigation object
  const gamesWon = 10;
  const gamesLost = 5;

  const handleClick = () => {
    navigation.navigate("landing screen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statics}>Congratulations!! you have won</Text>
      <Text style={styles.statics}>Total Coins won: 4</Text>
      <GameStatsChart gamesWon={gamesWon} gamesLost={gamesLost} />
      <Pressable
                style={styles.button}
                onPress={handleClick}
              >
                <View>
                  <Text style={styles.buttonTitle}>Play Again</Text>
                </View>
              </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F22',
  },
  statics: {
    color: "#FFFFFF",
    fontSize: 18,
    padding: 5
  },
  button: {
    backgroundColor: "#0A316A",
    padding: 10,
    borderRadius: 5,

  },
  buttonTitle: {
    color: "#FFFFFF"
  }
});


export default WinScreen;
