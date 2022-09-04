import { css, Global } from '@emotion/react';
import { colors } from '../shared/theme';

const Styles = () => {
  return (
    <Global
      styles={css`
        html,
        body {
          margin: 0;
          padding: 0;
          font-size: 1rem;
          font-family: 'Lato', sans-serif;
          color: ${colors.text.primary};
          background-color: ${colors.common.bg};
        }

        *,
        *::after,
        *::before {
          box-sizing: border-box;
        }
      `}
    />
  );
};

export default Styles;
