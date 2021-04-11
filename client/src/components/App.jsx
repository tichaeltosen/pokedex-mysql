import React from 'react';
import axios from 'axios';
import Select from './Select.jsx';
import Poke from './Poke.jsx';

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      types: [],
      allPokes: [],
      selected: []
    }
    this.getAllPokemon = this.getAllPokemon.bind(this);
    this.showPokes = this.showPokes.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleShowAll = this.handleShowAll.bind(this);
  }

  componentDidMount() {
    this.getAllPokemon();
  }

  handleShowAll(){
    this.setState({
      selected: []
    }, () => {
      let el = document.getElementById('types');
      el.value = 'Sort by Type';
    })
  }

  getAllPokemon() {
    axios.get('/api/pokemon')
      .then(({data}) => {
        this.setState({
          allPokes: data,
          types: data.map((pokemon) => pokemon.type).filter((type, ind, arr) => {
            return arr.indexOf(type) === ind;
          })
        })
      })
      .catch(err => console.log(err));
  }

  showPokes() {
    if (this.state.selected.length) {
      return (
        <Poke pokes={this.state.selected} />
      )
    } else if (this.state.allPokes.length) {
      return (
        <Poke pokes={this.state.allPokes} />
      )
    } else {
      return <div></div>
    }
  }

  handleSelect(e) {
    if (e.target.value !== 'Sort by Type') {
      console.log(e.target.value);
      let option = this.state.allPokes.filter(poke => {
        return poke.type === e.target.value;
      });
      this.setState({
        selected: option
      })
    }
  }

  render() {
    return (
    <div>
      <h1>Fullstack Pokedex!</h1>
      <button onClick={this.handleShowAll}>Show All</button>
      <Select types={this.state.types} handleSelect={this.handleSelect}/>
      <div>{this.showPokes()}</div>
    </div>
    )
  }
}

export default App;
