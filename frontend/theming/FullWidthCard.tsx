// components/FullWidthCard.tsx

import React from 'react';
import { View, Pressable, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  screenName: string; // Add a new prop for the screen name
}

const FullWidthCard: React.FC<CardProps> = ({ title, description, imageUrl, screenName }) => {
  const navigation = useNavigation(); // Get the navigation object

  const handleCardPress = () => {
    // Navigate to the specified screen
    navigation.navigate(screenName);
  };

  return (
    <Pressable onPress={handleCardPress}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'lightgray', // Customize the card background color
    padding: 20,
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
    maxHeight: 220
  },
  cardImage: {
    width: '100%',
    height: 100, // Customize the image height
    resizeMode: 'contain', // Adjust image scaling
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: "center"
  },
  cardDescription: {
    fontSize: 14,
    color: 'gray',
    textAlign: "center"
  },
});

export default FullWidthCard;
