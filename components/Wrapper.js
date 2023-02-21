import styled, { ThemeProvider } from 'styled-components';
import groq from 'groq';
import theme, { media } from './theme';
import GlobalStyle from './GlobalStyle';

export const body = groq`
  ...,
  markDefs[] {
    ...,
    pageLink->{ ... }
  },
  asset->{ ... }
`;

export default function Wrapper({ home = false, children }) {
  return (
    <ThemeProvider theme={theme}>
      <>
        {children}
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
}
