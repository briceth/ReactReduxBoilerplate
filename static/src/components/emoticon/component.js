import styled from 'styled-components';
import CSS from '../../globales/css_var';

export const Emoticons = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-around;
`;

export const EmoticonItem = styled.div`
  border-radius: ${CSS.radius}px;
  margin-top: 5%;
  min-width: 450px;
  min-height: 200px;
  display: flex;
  background: ${CSS.blueSky};
  background: -webkit-linear-gradient(to right, ${CSS.blue}, ${CSS.blueSky});
  background: linear-gradient(to right, ${CSS.blue}, ${CSS.blueSky});
  transition: 0.2s all ease;
  box-shadow: ${CSS.boxShadow1};
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transform: translateY(-2%);
  }
`;

export const EmoticonFaceWrapper = styled.div`
  flex: 1 1 40%;
  margin: auto;
`;

export const EmoticonDetails = styled.div`
  flex: 1 1 60%;
  position: relative;
  color: #3a7bd5;
  background-color: white;
  top: -15px;
  right: -10px;
  box-shadow: -5px 5px 15px #397dd6;
  border-radius: 3px;
  transform: translateY(25%);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;

  &:hover {
    box-shadow: -5px 5px 20px 3px rgba(2, 69, 163, 0.4);
  }

  ${props => props.enter && `transform: translateY(0%);`};
`;

export const EmoticonFace = styled.p`
  font-size: ${props => props.size}px;
  color: white;
  text-shadow: 2px 2px #3a7bd5;
}
`;

export const EmoticonId = styled.p`
  position: absolute;
  bottom: 0;
  left: 28px;
  font-weight: 100;
  font-size: 14px;
  border-bottom: 1px solid;
  border-image: linear-gradient(135deg, red, blue) 1 1;
`;

export const EmoticonDate = styled.p`
  position: absolute;
  bottom: 0px;
  right: 20px;
  font-weight: 100;
  font-size: 14px;
`;

export const EmoticonPrice = styled.p`
  position: absolute;
  top: 0px;
  left: 28px;
  font-size: 20px;
  font-weight: bolder;
  border: 1px solid;
  border-radius: 2px;
  padding: 0 5px;
  border-image: linear-gradient(135deg, red, blue) 1 1;
  background: -webkit-linear-gradient(135deg, red, blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const EmoticonSize = styled.p`
  position: absolute;
  top: 0;
  right: 20px;
  border: 1px solid #397dd6;
  padding: 0 10px;
  border-radius: 2px;
  font-weight: 100;
  border-image: linear-gradient(135deg, red, blue) 1 1;
`;

export const AddSponsor = styled(EmoticonItem)``;
