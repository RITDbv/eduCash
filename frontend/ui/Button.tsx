import React, { useState } from "react";
import {
  StyleSheet,
  GestureResponderEvent,
  Pressable,
  Text,
  Animated,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "../theming/UseTheme";

interface Props {
  label: string;
  disabled?: boolean;
  isSecondary?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
}

export const Button: React.FC<Props> = ({
  label,
  disabled,
  isSecondary = false,
  onPress,
  isLoading = false,
}) => {
  const { colors } = useTheme();
  const [isFocussed, setIsFocussed] = useState(false);

  const gradientColors = () => {
    return isSecondary
      ? [
          "#0A3A81", "#0A3A81", "#0A3A81"
        ]
      : ["#0A3A81", "#0A3A81", "#0A3A81"];
  };

  const isDisabled = () => disabled || isLoading;

  const styles = StyleSheet.create({
    text: {
      color: "#ffffff",
      fontSize: 16,
      fontFamily: "Roboto Flex",
      fontWeight: "600",
      textAlign: "center",
    },
    textDisabled: {
      color: "#000000",
    },
    button: {
      width: "100%",
      backgroundColor: "transparant",
      borderWidth: 2,
      borderColor: "rgba(0,0,0,0)",
      borderRadius: 99,
      marginBottom: 20,
    },
    buttonFocus: {
      borderColor: "#FB383B",
      outlineStyle: "none",
    },
    buttonDisabled: {
      pointerEvents: "none",
    },
    gradient: {
      borderRadius: 99,
      padding: 8,
      flexDirection: "row",
      justifyContent: "center",
    },
    gradientDisabled: {
      opacity: 0.6,
    },
  });

  return (
    <Pressable
      disabled={isDisabled()}
      onPress={onPress}
      onFocus={() => setIsFocussed(true)}
      onBlur={() => setIsFocussed(false)}
      style={[
        styles.button,
        isFocussed ? styles.buttonFocus : null,
        isDisabled() ? styles.buttonDisabled : null,
      ]}
    >
      <LinearGradient
        style={[styles.gradient, isDisabled() ? styles.gradientDisabled : null]}
        colors={gradientColors()}
        locations={[0, 0.6, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {isLoading && (
          <ActivityIndicator
            style={{ marginRight: 12 }}
            size="small"
            color={isSecondary ? colors.primary : colors.textContrast}
          />
        )}
        <Text style={[styles.text, isDisabled() ? styles.textDisabled : null]}>
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};
