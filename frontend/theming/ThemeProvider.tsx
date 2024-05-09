import * as React from "react";

import ThemeContext from "./ThemeContext";
import defaultTheme from "./defaultTheme";

type Props = {
  value: typeof defaultTheme;
  children: React.ReactNode;
};

export default function ThemeProvider({ value, children }: Props) {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
