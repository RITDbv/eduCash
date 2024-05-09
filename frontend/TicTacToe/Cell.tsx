// Cell.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CellProps {
  value: string;
  onPress: () => void;
}

export const Cell: React.FC<CellProps> = ({ value, onPress }) => {
  return (
    <TouchableOpacity style={styles.cell} onPress={onPress}>
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: "#FFFFFF"
  },
});
