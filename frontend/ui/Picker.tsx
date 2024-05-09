import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker as NativePicker } from "@react-native-picker/picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import useTheme from "../theming/UseTheme";

interface Props {
  label?: string;
  icon?: IconDefinition;
  disabled?: boolean;
  smallMargin?: boolean;
  items: { label: string; value: string }[];
  onValueChange: (itemValue: string) => void;
  selectedValue: string;
}

export const StyledPicker: React.FC<Props> = (props) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const styles = StyleSheet.create({
    label: {
      color: colors.text,
      fontWeight: "500",
      fontFamily: "Roboto Flex",
      marginBottom: 4,
      width: "100%",
      textAlign: "left",
    },
    pickerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FCF9F8",
      width: "100%",
      marginBottom: props.smallMargin ? 8 : 20,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 8,
    },
    picker: {
      color: colors.text,
      flex: 1,
      fontFamily: "Roboto Flex",
      padding: 8,
    },
    pickerFocus: {
      borderColor: colors.primary,
    },
    pickerDisabled: {
      backgroundColor: "#E3E0DF",
      borderColor: "#AAAAAA",
    },
    icon: {
      color: "#555555",
      position: "absolute",
      right: 12,
    },
  });

  return (
    <>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View
        style={[
          styles.pickerContainer,
          props.disabled ? styles.pickerDisabled : null,
        ]}
      >
        <NativePicker
          selectedValue={props.selectedValue}
          onValueChange={props.onValueChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.picker, isFocused ? styles.pickerFocus : null]}
        >
          {props.items.map((item) => (
            <NativePicker.Item
              label={item.label}
              value={item.value}
              key={item.value}
            />
          ))}
        </NativePicker>
        {props.icon && (
          <FontAwesomeIcon icon={props.icon} style={styles.icon} />
        )}
      </View>
    </>
  );
};
