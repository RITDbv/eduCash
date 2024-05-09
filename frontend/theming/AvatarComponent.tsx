import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

interface AvatarProps {
  imageUrl: string;
  screenName: string; // Add a new prop for the screen name
}

const AvatarComponent: React.FC<AvatarProps> = () => {

  const navigation = useNavigation(); // Get the navigation object

  const handleCardPress = () => {
    // Navigate to the specified screen
    navigation.navigate("ProfileScreen");
  };
  return (
    <View style={styles.avatarContainer}>
      <TouchableOpacity onPress={handleCardPress}>
        <Image
          source={{ uri: 'https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=512' }} // Replace with your avatar image URL
          style={styles.avatarImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40, // Half of the desired avatar width/height
    overflow: 'hidden', // Ensures the image stays within the circle
    marginRight: 100,
    marginLeft: 0,
    marginBottom: 0,
    marginTop: 0
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Same as the container's borderRadius
  },
});

export default AvatarComponent;
