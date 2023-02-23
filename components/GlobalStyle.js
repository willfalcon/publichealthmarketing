import { createGlobalStyle, css } from 'styled-components';

const imgStyle = css`
  display: block;
  max-width: 100%;
  height: auto;
`;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  :focus {
    outline-color: ${({ theme }) => theme.lightOrange};
  }
  body {
    padding: 0;
    margin: 0;
    font-family: ${({ theme }) => theme.font.family};
    font-weight: 400;
    font-style: normal;
    font-size: 1.6rem;
    line-height: 2;
    /* background-color: ${({ theme }) => theme.offWhite}; */
    /* color: ${({ theme }) => theme.dark}; */
    color: black;
    /* max-width: 100vw; */
    /*     
    @media (prefers-color-scheme: dark) {
      background-color: ${({ theme }) => theme.dark};
      color: ${({ theme }) => theme.offWhite};
    } */
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.orange};
  }
  button {
    font-family: ${({ theme }) => theme.font.family};
  }
  img {
    ${imgStyle}
  }
  h1 {
    font-family: ${({ theme }) => theme.font.heading};
    font-size: 36px;
    font-weight: ${({ theme }) => theme.font.black};
  }
  h2 {
    font-family: ${({ theme }) => theme.font.heading};
    font-weight: ${({ theme }) => theme.font.black};
    color: ${({ theme }) => theme.dark};
    font-style: normal;
    line-height: 1.25;
    margin: 0;
    font-size: 2.8rem;
  }
  h3 {
    font-weight: bold;
    color: ${({ theme }) => theme.orange};
    font-size: 2.6rem;
  }
  h3, label, input, textarea {
    /* font-family: ${({ theme }) => theme.font.heading}; */
    font-weight: 900;
    font-style: normal;
    /* letter-spacing: 2px; */
    line-height: 2.15;
    margin: 0 0 .5rem;
    /* font-size: 1.6rem; */
  }
  h4 {
    /* font-family: , sans-serif; */
    /* font-family: ${({ theme }) => theme.font.heading}; */
    font-weight: 700;
    font-style: normal;
    letter-spacing: 2px;
  }
  label {
    color: ${({ theme }) => theme.dark};
  }
  p {
    margin: 0 0 1rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }
  ul {
    padding-left: 20px;
  }
`;

export { imgStyle };
export default GlobalStyle;
