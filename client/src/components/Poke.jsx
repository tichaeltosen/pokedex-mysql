import React from 'react';
import PokeItem from './PokeItem.jsx';

const Poke = (props) => (
  <div id="poke">
    {props.pokes.map((poke, index) => (
      <PokeItem poke={poke} key={index} handleSingle={props.handleSingle}/>
    ))}
  </div>
)

export default Poke;