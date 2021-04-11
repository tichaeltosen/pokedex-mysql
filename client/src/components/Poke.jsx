import React from 'react';
import PokeItem from './PokeItem.jsx';

const Poke = (props) => (
  <div id="poke">
    {props.pokes.map((poke, index) => (
      <PokeItem poke={poke} key={index} />
    ))}
  </div>
)

export default Poke;