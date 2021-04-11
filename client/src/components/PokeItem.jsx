import React from 'react';

const PokeItem = (props) => (
  <div id="poke">
    <div>{props.poke.name}</div>
    <img src={props.poke.img} />
    <div>{props.poke.type}</div>
  </div>
)

export default PokeItem;