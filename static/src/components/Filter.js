import React, { Component } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class Filter extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(val) {
    this.props.callbackFromParent(val)
    console.log(val)
  }

  render() {
  const options = [
    { value: 'Size', label: 'Size' },
    { value: 'Price', label: 'Price' },
    { value: 'Id', label: 'Id' }
  ];

    return (
      <div>
        <Select
          name="form-field-name"
          value="one"
          options= {options}
          onChange={this.handleChange}/>
      </div>
    )
  }
}

export default Filter;
