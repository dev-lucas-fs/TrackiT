import styled, { createGlobalStyle } from "styled-components";

const ResetCSS = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
`;

export const GlobalStyle = styled(ResetCSS)`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Lexend Deca", sans-serif;
    font-size: 10px;
  }
`;

export const GlobalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #126ba5;
  filter: grayscale(20%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerApp = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;

  @media screen and (min-width: 900px) {
    width: 90%;
    max-width: 400px;
    height: 90%;
    border-radius: 10px;
  }
`;
