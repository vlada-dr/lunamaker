import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'


const marginDir = (p) => p.flow === 'column' ? 'top' : 'left'

export const Layout = styled.div`
  display: flex;
  flex-direction: ${(p) => p.flow};
  flex-wrap: ${(p) => p.wrap};
  padding: ${(p) => `${p.padding}rem`};
  ${(p) => p.width && css`
    width: ${p.width}
  `};
  ${(p) => p.justify && css`
    justify-content: ${p.justify}
  `};
 ${(p) => p.align && css`
    align-items: ${p.align}
  `};
  ${(p) => p.gap && css`
    & > * + * {
      margin-${marginDir}: ${p.gap}rem;
    }
  `}
`

Layout.propTypes = {
  align: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'baseline']),
  flow: PropTypes.oneOf(['column', 'row']).isRequired,
  gap: PropTypes.number,
  justify: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'space-between', 'space-around']),
  padding: PropTypes.number,
  width: PropTypes.string,
  wrap: PropTypes.oneOf(['wrap', 'nowrap']),
}

Layout.defaultProps = {
  wrap: 'nowrap',
  padding: 0,
  gap: 0,
  justify: undefined,
  align: undefined,
  width: '0rem',
}
