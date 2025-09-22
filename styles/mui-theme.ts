// theme.ts
import { createTheme } from "@mui/material/styles";
import {colors} from "./colors";
import { spacing, fontSizes, radius } from "./tokens";
// 2.Extend Palette and PaletteOptions
declare module "@mui/material/styles" {
  interface Palette {
    customColors: {
      roseRed: string[];
      gray: string[];
      dark: string[];
      cyan: string[];
      success: string[];
      error: string[];
    };
  }
  interface PaletteOptions {
    customColors?: {
      roseRed?: string[];
      gray?: string[];
      dark?: string[];
      cyan?: string[];
      success?: string[];
      error?: string[];
    };
  }
}

// 3. Create theme
export const theme = createTheme({
  palette: {
    primary: {
      main: colors.roseRed[5],
      light: colors.roseRed[3],
      dark: colors.roseRed[7],
      contrastText: "#fff",
    },
    secondary: {
      main: colors.cyan[7],
    },
    success: {
      main: colors.success[5],
      light: colors.success[3],
      dark: colors.success[8],
      contrastText: "#fff",
    },
    error: {
      main: colors.error[5],
      light: colors.error[3],
      dark: colors.error[9],
      contrastText: "#fff",
    },
    // Mantine-style arrays in a separate object
    customColors: {
      roseRed: colors.roseRed,
      gray: colors.gray,
      dark: colors.dark,
      cyan: colors.cyan,
      success: colors.success,
      error: colors.error,
    },
  },
});


// 4. Add custom Mantine-like tokens (spacing, fontSizes, radius)
declare module "@mui/material/styles" {
  interface Theme {
    customSpacing: {
      xxxs: string;
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    customFontSizes: {
      xxxs: string;
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    customRadius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
  }
  interface ThemeOptions {
    customSpacing?: Partial<Theme["customSpacing"]>;
    customFontSizes?: Partial<Theme["customFontSizes"]>;
    customRadius?: Partial<Theme["customRadius"]>;
  }
}

export const extendedTheme = createTheme(theme, {
  customSpacing: spacing,
  customFontSizes: fontSizes,
  customRadius: radius,
});
