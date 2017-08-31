import React, { Component } from 'react'

const Emoticon = ({ emoticon, index, manageDate }) => {
  return (
    <div key={index} className="emoticon">
      <div>{emoticon.face}</div>
      <div>id: {emoticon.id.substr(0,10)}...</div>

      <div>{ manageDate(emoticon) }</div>

      <div>price: {emoticon.price}</div>
      <div>size: {emoticon.size} px</div>
    </div>
  )
}

export default Emoticon
