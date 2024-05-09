import React, { PropsWithChildren } from "react";
import { Text as NativeText, StyleSheet, TextStyle } from "react-native";
import useTheme from "../theming/UseTheme";

interface Props {
  type?: "h1" | "h2" | "h3" | "text";
  textAlign?: "left" | "center" | "right";
  contrastText?: boolean;
  style?: TextStyle;
}

export const Text: React.FC<PropsWithChildren<Props>> = ({
  type = "text",
  textAlign = "left",
  contrastText,
  style,
  children,
}) => {
  const { typography, colors } = useTheme();

  const styles = StyleSheet.create({
    text: {
      marginBottom: 8,
      ...typography[type],
      color: contrastText ? colors.textContrast : colors.text,
      textAlign,
      ...style,
    },
  });

  return <NativeText style={styles.text}>{children}</NativeText>;
};
