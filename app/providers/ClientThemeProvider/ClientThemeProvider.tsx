'use client'; // only this file is client-side
import { ThemeProvider, CssBaseline } from '@mui/material';
import { extendedTheme } from '@/styles/mui-theme';

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={extendedTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}