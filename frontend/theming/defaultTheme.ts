import { TextStyle } from "react-native";

const defaultTheme = {
  dark: false,
  colors: {
    primary: "#FFFFFF",
    background: "#1F1F22",
    card: "#FCF9F8",
    text: "#C0C0C0",
    textContrast: "#ffffff",
    border: "#797689",
    notification: "#EB5A00",
    error: "#f00000",
    hr: "#7a7a7a"
  },
  typography: {
    h1: {
      fontFamily: "Roboto Serif",
      fontWeight: "600" as TextStyle["fontWeight"],
      fontSize: 24,
      color: "#333333",
    },
    h2: {
      fontFamily: "Roboto Serif",
      fontWeight: "500" as TextStyle["fontWeight"],
      fontSize: 20,
      color: "#333333",
    },
    h3: {
      fontFamily: "Roboto Flex",
      fontWeight: "600" as TextStyle["fontWeight"],
      fontSize: 14,
      color: "#333333",
    },
    text: {
      fontFamily: "Roboto Flex",
      fontWeight: "400" as TextStyle["fontWeight"],
      fontSize: 12,
      color: "#333333",
    },
    link: {
      fontFamily: "Roboto Flex",
      fontSize: 12,
      textDecorationLine: "underline" as TextStyle["textDecorationLine"],
      color: "#0A3A81",
    }
  },
};

export default defaultTheme;
