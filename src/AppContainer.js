import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";

const materialTheme = createTheme();

const AppContainer = ({ children }) => {
  return (
    <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <div className="container">
        {children}
      </div>
    </ThemeProvider>
  );
};

export default AppContainer;
