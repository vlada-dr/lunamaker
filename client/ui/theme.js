const css = String.raw;

export const color = {
  primary: '#3897f0',

  backgroundLight: '#fafafa',
  backgroundWhite: 'rgba(255,255,255,0.8)',

  text: '#262626',
  textLight: '#999',

  border: '#efefef',
  borderDark: '#e6e6e6',

  success: '#35DC83',
  danger: '#DC3545',

  highlight: '#FDFAEE',
  light: '#F1E198',
  yellow: '#FFCA28',
  gray: '#E6E6E6',
  lightGray: '#4a4a4a',
  darkGray: '#333333',
  blue: '#5FBDC5',
  darkBlue: '#3C9DA5',
};

export const size = {
  xs: '4px',
  s: '8px',
  m: '16px',
  l: '24px',
  xl: '48px',
  xxl: '64px',
};

export const font = {
  playfair: 'Playfair Display',
  lato: 'Lato',
  formElement: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

export const globalStyles = css`
  html, body {
    font-size: 16px;
    color: ${color.darkGray};
    font-family: ${font.lato};
    line-height: 18px;
    -webkit-font-smoothing: antialiased;
    margin: 0;
    padding: 0;
    background-color: #fff;
    background-attachment: fixed;
  }
  
  h1 {
    line-height: 63px;
    font-family: ${font.playfair};
    font-weight: bold;
    font-size: 54px;
    
    ${media.pho`
      line-height: 42px;
      font-size: 36px;
    `}
  }
  
  h2 {
    line-height: 36px;
    font-family: ${font.playfair};
    font-weight: bold;
    font-size: 40px;
    letter-spacing: 0.5px;
    
     ${media.pho`
      line-height: 34px;
      font-size: 24px;
      letter-spacing: 0;
    `}
  }
  
  h3 {
    line-height: 34px;
    font-family: ${font.lato};
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
  }
  
  a {
    text-decoration: none;
    color: ${color.darkGray};
  }
  
  a:visited, a:focus, a:active {
    text-decoration: none;
    color: ${color.darkGray};
  }
  * {
    box-sizing: border-box;
  }
`;

export const variables = {
  fieldHeight: 5,
  fieldUnit: 'rem',
  inputHeight: 3.6,
  inputUnit: 'rem',
};
