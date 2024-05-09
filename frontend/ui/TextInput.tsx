import React, { useState } from "react";
import {
  TextInput as NativeTextInput,
  Text,
  View,
  StyleSheet,
  TextInputProps,
  Platform,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import useTheme from "../theming/UseTheme";

interface Props extends TextInputProps {
  label?: string;
  icon?: IconDefinition;
  disabled?: boolean;
  smallMargin?: boolean;
}

export const TextInput: React.FC<Props> = (props) => {
  const { colors } = useTheme();
  const [isFocussed, setIsFocussed] = useState(false);

  const styles = StyleSheet.create({
    label: {
      color: colors.text,
      fontWeight: "500",
      fontFamily: "Roboto Flex",
      marginBottom: 4,
      width: "100%",
      textAlign: "left",
    },
    inputContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#3D3C43",
      width: "100%",
      marginBottom: props.smallMargin ? 8 : 20,
      borderRadius: 8,
    },
    input: {
      color: colors.text,
      borderColor: colors.border,
      flex: 1,
      fontFamily: "Roboto Flex",
      padding: 12,
      borderRadius: 8,
      borderWidth: 2,
    },
    inputFocus: {
      borderColor: colors.primary,
    },
    inputDisabled: {
      pointerEvents: "none",
      backgroundColor: "#E3E0DF",
      borderColor: "#AAAAAA",
    },
    icon: {
      color: "#555555",
      position: "absolute",
      right: 12,
      pointerEvents: "none",
    },
  });

  return (
    <>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.inputContainer}>
        <NativeTextInput
          {...props}
          onFocus={() => setIsFocussed(true)}
          onBlur={() => setIsFocussed(false)}
          style={[
            styles.input,
            isFocussed ? styles.inputFocus : null,
            props.disabled ? styles.inputDisabled : null,
          ]}
        />
        {props.icon && (
          <FontAwesomeIcon icon={props.icon} style={styles.icon} />
        )}
      </View>
    </>
  );
};
