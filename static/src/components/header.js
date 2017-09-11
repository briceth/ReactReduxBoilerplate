import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  background: #00d2ff;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #3a7bd5, #00d2ff);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #3a7bd5, #00d2ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

export const HeaderContent = styled.div`
  color: white;
  text-shadow: 2px 2px #3a7bd5;

  h1 {
    margin: 0;
  }
`
