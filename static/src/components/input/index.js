import React, { Component } from 'react'
import connect from 'redux-connect-decorator'
import { filterInputSearch } from '../../actions/products'
import { Filter, Label, Select, Option } from './component'

@connect(store => ({}), { filterInputSearch })

export default class Input extends Component {

  handleChange = (event) => {
    event.preventDefault()
    this.props.filterInputSearch(event.target.value)
  }

  render() {
    return (
      <Filter>
        <Label>Filtrer par catégorie: </Label>
        <Select onChange={(event) => { this.handleChange(event) }}>
          <Option disabled>Choisissez votre filtre</Option>
          <Option value="id">Id</Option>
          <Option value="size">Size</Option>
          <Option value="price">Price</Option>
        </Select>
      </Filter>
    )
  }
}
