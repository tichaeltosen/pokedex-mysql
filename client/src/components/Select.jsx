import React from 'react';
import SelectItem from './SelectItem.jsx';

const Select = (props) => (
  <select id="types" onChange={props.handleSelect}>
    <option>Sort by Type</option>
    {props.types.map((type, index) => (
      <SelectItem type={type} key={index}/>
    ))}
</select>
)

export default Select;