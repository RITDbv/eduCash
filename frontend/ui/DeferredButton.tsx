import React, { useState } from "react";
import {
  StyleSheet,
  GestureResponderEvent,
  Pressable,
  Text,
  View,
  FlexAlignType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "../theming/UseTheme";

interface Props {
  label: string;
  alignItems?: FlexAlignType;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export const DeferredButton: React.FC<Props> = ({
  label,
  disabled,
  onPress,
  alignItems,
}) => {
  const { colors } = useTheme();
  const [isFocussed, setIsFocussed] = useState(false);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      marginBottom: 20,
      alignItems,
    },
    text: {
      color: colors.primary,
      fontSize: 14,
      fontFamily: "Roboto Flex",
      fontWeight: "600",
    },
    textFocus: {
      textDecorationLine: "underline",
    },
    textDisabled: {
      color: "#4E4E4E",
    },
    button: {
      display: undefined,
    },
    buttonFocus: {
      // @ts-ignore
      outlineStyle: "none",
    },
    buttonDisabled: {
      pointerEvents: "none",
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onFocus={() => setIsFocussed(true)}
        onBlur={() => setIsFocussed(false)}
        style={[
          styles.button,
          isFocussed ? styles.buttonFocus : null,
          disabled ? styles.buttonDisabled : null,
        ]}
      >
        <Text
          style={[
            styles.text,
            isFocussed ? styles.textFocus : null,
            disabled ? styles.textDisabled : null,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};
