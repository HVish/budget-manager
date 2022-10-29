// TypeBackground
import { TypeBackground as _TypeBackground } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground extends _TypeBackground {
    app: string;
  }
}
