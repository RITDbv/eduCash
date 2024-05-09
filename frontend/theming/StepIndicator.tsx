import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useTheme from "../theming/UseTheme";

const StepIndicator = ({ currentStep, completedStep }) => {
  const steps = ['Jouw account', 'Kinder-accounts'];
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 50,
      marginTop:10
    },
    stepIndicator: {
      flex: 1,
      height: 2,
      borderRadius: 0,
      backgroundColor: colors.hr,
      marginHorizontal: 0,
    },
    stepIndicatorActive: {
      backgroundColor: colors.primary,
    },
    stepText: {
      flex: 1,
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 600,
      marginTop: 0,
      top:-22
    },
    completedStep: {
      backgroundColor: colors.primary, 
    },
  });

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View
          key={index}
          style={[
            styles.stepIndicator,
            index === currentStep - 1 && styles.stepIndicatorActive,
            index < completedStep && styles.completedStep,
          ]}
        >
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </View>
  );
};

export default StepIndicator;
