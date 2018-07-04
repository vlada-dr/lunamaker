const css = String.raw

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
    darkBlue: '#1C1C59',

    darkGrey: '#888898',
    lightGrey: '#DBDBE3'
}

export const font = {
    formElement: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
}

export const globalStyles = css`
  html, body {
    font-size: 12px;
    font-family: ${font.formElement};
    -webkit-font-smoothing: antialiased;
    margin: 0;
    padding: 0;
    background-color: #fff;
    background-attachment: fixed; 
    background-image: linear-gradient(0, #fdfbfb 0%, #ebedee 100%);
  }
  a {
    text-decoration: none;
  }
  a:visited, a:focus, a:active {
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }
`
export const variables = {
    fieldHeight: 5,
    fieldUnit: 'rem',
    inputHeight: 3.6,
    inputUnit: 'rem'

}