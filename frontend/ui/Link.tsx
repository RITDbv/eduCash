import React, { PropsWithChildren } from "react";
import { StyleSheet, TextStyle } from "react-native";
import useTheme from "../theming/UseTheme";
import { Link as NativeLink, NavigationAction } from "@react-navigation/native";
import { To } from "@react-navigation/native/lib/typescript/src/useLinkTo";

interface Props {
  to: To<ReactNavigation.RootParamList>;
  action?: NavigationAction;
  disabled?: boolean;
  textAlign?: "left" | "center" | "right";
  style?: TextStyle;
}

export const Link: React.FC<PropsWithChildren<Props>> = ({
  textAlign = "left",
  style,
  children,
  ...rest
}) => {
  const { typography } = useTheme();

  const styles = StyleSheet.create({
    link: {
      marginBottom: 8,
      ...style,
      ...typography.link,
      textAlign,
    },
  });

  return (
    <NativeLink {...rest} style={styles.link}>
      {children}
    </NativeLink>
  );
};
