import styled from 'styled-components';
import CSS from '../../globales/css_var';

export const HeaderWrapper = styled.div`
  background: ${CSS.blueSky};
  background: -webkit-linear-gradient(to right, ${CSS.blue}, ${CSS.blueSky});
  background: linear-gradient(to right, ${CSS.blue}, ${CSS.blueSky});
  border-bottom: 20px solid #c2e0ff;
  border-left: 20px solid ${CSS.blueSky};
  border-right: 20px solid ${CSS.deepBlue};
`;

export const HeaderContent = styled.div`
  color: white;
  text-shadow: 2px 2px ${CSS.deepBlue};

  h1 {
    margin: 0;
  }
`;
