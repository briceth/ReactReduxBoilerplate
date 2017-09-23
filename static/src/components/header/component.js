import styled from 'styled-components'
import CSS from '../../globales/css_var'

export const HeaderWrapper = styled.div`
  background: ${CSS.blueSky};  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, ${CSS.blue}, ${CSS.blueSky});  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, ${CSS.blue}, ${CSS.blueSky}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border-bottom: 20px solid #c2e0ff;
  border-left: 20px solid ${CSS.blueSky};
  border-right: 20px solid ${CSS.deepBlue};;
`

export const HeaderContent = styled.div`
  color: white;
  text-shadow: 2px 2px ${CSS.deepBlue};;

  h1 {
    margin: 0;
  }
`
