import styled from 'styled-components';


export const Header = styled.h2`
  font-family: ${font.playfair};
  font-size: 36px;
  color: ${color.darkGray}
  font-weight: bold;
  margin: 0 auto 16px;
  padding-bottom: 36px;
  text-align: center;
  position: relative;
  margin-top: ${size.xxl};
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 0;
    height: 1px;
    width: ${size.xxl};
    border-bottom: 2px solid ${color.yellow};
  }
`;

