import React from 'react';
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const materialTheme = createTheme();

const AppContainer = ({ children }) => {
  return (
    <ThemeProvider theme={materialTheme}>
      <div className="container">
        {children}
      </div>
    </ThemeProvider>
  );
};

export default AppContainer;
