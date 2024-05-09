import * as React from "react";

import defaultTheme from "./defaultTheme";

const ThemeContext = React.createContext<typeof defaultTheme>(defaultTheme);

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;
