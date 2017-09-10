import React, { Component } from 'react'
import { EmoticonItem, EmoticonFace, EmoticonId, EmoticonDate, EmoticonPrice, EmoticonSize, EmoticonFaceWrapper, EmoticonDetails } from '../components/emoticon'

const Emoticon = ({ emoticon, index, manageDate }) => {
  return (
    <EmoticonItem key={index}>
      <EmoticonFaceWrapper>
        <EmoticonFace size={emoticon.size}>{emoticon.face}</EmoticonFace>
      </EmoticonFaceWrapper>

      <EmoticonDetails>
        <EmoticonPrice>{emoticon.price}</EmoticonPrice>
        <EmoticonSize>Size: {emoticon.size}px</EmoticonSize>

        <EmoticonId>Emoticon number:<br />{emoticon.id}</EmoticonId>
        <EmoticonDate>{ manageDate(emoticon) }</EmoticonDate>
      </EmoticonDetails>
    </EmoticonItem>
  )
}

export default Emoticon
