import React, { Component } from 'react'
import connect from 'redux-connect-decorator'
import { filterInputSearch } from '../../actions/products'
import { Filter } from './component'

@connect(store => ({}), { filterInputSearch })

export default class Input extends Component {

  handleChange = (event) => {
    event.preventDefault()
    this.props.filterInputSearch(event.target.value)
  }

  render() {
    return (
      <Filter>
        <label>Filtrer par catégorie: </label>
        <select onChange={(event) => { this.handleChange(event) }}>
          <option disabled>Choisissez votre filtre</option>
          <option value="id">Id</option>
          <option value="size">Size</option>
          <option value="price">Price</option>
        </select>
      </Filter>
    )
  }
}
