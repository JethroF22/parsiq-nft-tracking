import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import Meta from './Meta';

const theme = {
  smokyBlack: '#12100eff',
  grayWeb: '#7f7f7fff',
  quickSilver: '#a5a5a5ff',
  lightGray: '#ccccccff',
  cultured: '#f2f2f2ff',
};

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .full-screen-container {
    height: 94vh;
    margin-top: 6vh;
  }

  a {
    text-decoration: none;
    color: #12100eff;
  }

  a:visited {
    color: #fff;
  }

  input, textarea {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000;
    padding: 0.5rem;
    font-size: 1.5rem;
    color: #000;

    :focus {
      outline: none;
    }
  }

  input:disabled {
    color: #8b8b8b;
  }

  .modal-container {
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-close {
    position: absolute;
    right: 15px;
    top: 0px;
    cursor: pointer;
    border: none;
    font-size: 25px;
    font-weight: bold;
  }

  .modal-body {
    position: relative;
    width: 450px;
    height: 350px;
    box-shadow: 0 5px 10px 2px rgba(195,192,192,.5);
    padding: 20px;
    text-align: center;
    background: #fff;
  }
`;

const Page = (props): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Meta />
      <GlobalStyle />
      {props.children}
    </ThemeProvider>
  );
};

export default Page;
