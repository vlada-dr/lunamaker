import { css } from 'styled-components';

const sizes = {
  ppho: {
    max: 479,
  },
  lpho: {
    min: 480,
    max: 767,
  },
  pho: {
    max: 767,
  },
  ptab: {
    min: 768,
    max: 1023,
  },
  ltab: {
    min: 1024,
    max: 1191,
  },
  tab: {
    min: 768,
    max: 1191,
  },
  desktop: {
    min: 1192,
  },
};

const getMedia = ({ min, max }) => {
  if (!min) {
    return `@media (max-width: ${max}px)`;
  }

  if (!max) {
    return `@media (min-width: ${min}px)`;
  }

  return `@media (min-width: ${min}px) and (max-width: ${max}px)`;
};

const media = Object.entries(sizes).reduce((acc, [name, value]) => {
  acc[name] = (...args) => css`
    ${getMedia(value)} {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export default media;
