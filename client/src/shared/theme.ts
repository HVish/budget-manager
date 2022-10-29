import { createTheme } from '@mui/material';

export const colors = {
  common: {
    bg: '#DFE7EA',
    white: '#FFFFFF',
    black: '#000000',
  },
  primary: {
    main: '#0B1008',
    bg: '#F5F5F5',
  },
  success: {
    main: '#3BBD9A',
    bg: '#ECFBF6',
  },
  error: {
    main: '#F96766',
    bg: '#FEF0F2',
  },
  text: {
    primary: '#070707',
    secondary: '#3C595D',
    light: '#93A3A6',
  },
  grey: {
    dark: '#819496',
    main: '#E9EEEF',
  },
};

const theme = createTheme({
  palette: {
    background: {
      default: '#DFE7EA',
      app: '#F5F5F5',
    },
    primary: {
      main: '#0B1008',
    },
    success: {
      main: '#3BBD9A',
    },
    error: {
      main: '#F96766',
    },
    text: {
      primary: '#070707',
      secondary: '#3C595D',
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
          height: 64,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
    },
    MuiFab: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: '100px',
          textTransform: 'initial',
        },
      },
    },
  },
});

export default theme;
