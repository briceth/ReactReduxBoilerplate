import styled from 'styled-components'

export const Emoticons = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  flex-direction: row;
  text-align: center;
  flex: 1 1 0;
  justify-content: space-around;
`
export const EmoticonItem = styled.div`
  border-radius: 5px;
  margin-top: 5%;
  border: 1px solid #f5f5f5;
  min-width: 586px;
  min-height: 221px;
  display: flex;
  flex-direction: row;
  box-shadow: ${CSS.boxShadow1};
  background-color: #c2e0ff;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`

export const EmoticonFaceWrapper = styled.div`
  flex: 1 1 40%;
  margin: auto;
`
export const EmoticonDetails = styled.div`
  flex: 1 1 60%;
  background-color: #fcfcfc;
  position: relative;
`
export const EmoticonFace = styled.div`
  font-size: ${props => props.size}px;
  color: #007eff;
`

export const EmoticonId = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`

export const EmoticonDate = styled.div`
position: absolute;
  bottom: 0;
  right: 0;
`

export const EmoticonPrice = styled.div`
  position: absolute;
  top: 26px;
  left: 28px;
  background-color: #e74c3c;
  padding: 10px;
  border-radius: 5px;
  color: wheat;
`

export const EmoticonSize = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
