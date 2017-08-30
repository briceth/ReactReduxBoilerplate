import React, { Component } from 'react'

const Emoticon = ({emoticon, index, manageDate}) => {
  return (
    <div key={index} className="emoticon">
      <div>{emoticon.face}</div>
      <div>id:{emoticon.id.substr(0,10)}...</div>

      { manageDate(emoticon) }

      <div>price:{emoticon.price}</div>
      <div>size:{emoticon.size}</div>
    </div>
  )
}

export default Emoticon
