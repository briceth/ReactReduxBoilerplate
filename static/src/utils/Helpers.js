import React, { Component } from 'react'
import update from 'react-addons-update'

export function _calculateDateDiff(notFormatedDate) {
  var currentDate = new Date()
  var dateProduct = new Date(notFormatedDate)

  var diff = {}
  var tmp = currentDate - dateProduct
  tmp = Math.floor(tmp/1000)            // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60                    // Extraction du nombre de secondes

  tmp = Math.floor((tmp-diff.sec)/60)    // Nombre de minutes (partie entière)
  diff.min = tmp % 60                    // Extraction du nombre de minutes

  tmp = Math.floor((tmp-diff.min)/60)    // Nombre d'heures (entières)
  diff.hour = tmp % 24                   // Extraction du nombre d'heures

  tmp = Math.floor((tmp-diff.hour)/24)   // Nombre de jours restants
  diff.day = tmp

  if (diff.day > 6) {
    return dateProduct
  } else {
    return diff
  }
}


export function _formatDateAndPrice(selectAllprices) {
  return selectAllprices.map(element => {
    const formatedPrice = '$' + element.price.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    let totalDate = []
    totalDate.push(_calculateDateDiff(element.date))

    const newPriceAndDate = update(element, {
      price: { $set: formatedPrice },
      date: { $set: totalDate }
    })
    return newPriceAndDate;
  })
}

export function _manageDate(emoticon) {
  if(emoticon.date[0].day > 0) {
    return <p>{emoticon.date[0].day} days ago</p>
  } else if (emoticon.date[0].day < 0) {
   return <p>{emoticon.date[0].hour} hours ago</p>
 } else {
   const entireDate = emoticon.date[0].toString().substr(0,15)
   return entireDate.split(' ').join('/')
 }
}
