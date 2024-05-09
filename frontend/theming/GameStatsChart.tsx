// GameStatsChart.tsx

import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet } from 'react-native';

const GameStatsChart: React.FC<{ gamesWon: number; gamesLost: number }> = ({ gamesWon, gamesLost }) => {

  const data = [
    {
      name: 'Games Won',
      population: gamesWon,
      color: '#2ecc71',
      legendFontColor: '#7f7f7f',
      legendFontSize: 12,
    },
    {
      name: 'Games Lost',
      population: gamesLost,
      color: '#e74c3c',
      legendFontColor: '#7f7f7f',
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Game Statistics</Text>
      <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#FFFFFF"
  },
});

export default GameStatsChart;
