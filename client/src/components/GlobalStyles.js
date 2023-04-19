import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: 'Raleway';
    src: url('./fonts/Raleway.ttf') format('truetype');
  }

// p {
//     font: 40px "Raleway", sans-serif !important;
// }

* {
    margin: 0;
    padding: 0;
}
`;

export default GlobalStyles;
