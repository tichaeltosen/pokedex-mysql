import React from 'react';
import axios from 'axios';
import Select from './Select.jsx';
import Poke from './Poke.jsx';
import Create from './Create.jsx';

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      types: [],
      allPokes: [],
      selected: [],
      singlePoke: [],
      changeName: '',
      createPage: false
    }
    this.getAllPokemon = this.getAllPokemon.bind(this);
    this.showPokes = this.showPokes.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleShowAll = this.handleShowAll.bind(this);
    this.handleSingle = this.handleSingle.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.delete = this.delete.bind(this);
    this.newPokePage = this.newPokePage.bind(this);
  }

  componentDidMount() {
    this.getAllPokemon();
  }
  handleSubmit(e) {
    e.preventDefault();
    let id = this.state.singlePoke[0].id;
    axios.put(`/api/pokemon/${id}`, {name: this.state.changeName})
      .then(() => {
        this.setState({
          singlePoke: []
        }, () => this.getAllPokemon())
      })
  }

  newPokePage() {
    this.setState({createPage: true});
  }

  handleText(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleShowAll(){
    this.setState({
      selected: [],
      singlePoke: [],
      createPage: false
    }, () => {
      let el = document.getElementById('types');
      el.value = 'Sort by Type';
    })
  }

  handleSingle(e) {
    console.log(e.target.textContent);
    let poke = this.state.allPokes.filter(poke => poke.name === e.target.textContent);
    this.setState({
      selected: [],
      singlePoke: poke
    })
  }

  delete() {
    let id = this.state.singlePoke[0].id;
    axios.delete(`/api/pokemon/${id}`)
      .then(() => {
        this.setState({
          singlePoke: []
        }, () => this.getAllPokemon())
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
        <Poke pokes={this.state.selected} handleSingle={this.handleSingle} />
      )
    } else if (this.state.singlePoke.length) {
      return (
        <div>
          <Poke pokes={this.state.singlePoke} />
          <form onSubmit={this.handleSubmit}>
            <label>Change Name</label>
            <input name="changeName" onChange={this.handleText}></input>
            <button>Submit</button>
          </form>
          <button onClick={this.delete}>Delete{this.state.singlePoke[0].name}</button>
        </div>
      )
    } else if (this.state.allPokes.length) {
      return (
        <Poke pokes={this.state.allPokes} handleSingle={this.handleSingle}/>
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
    let content = () => {
      if (!this.state.createPage) {
        return this.showPokes();
      } else {
        return <Create goBack={this.handleShowAll}/>;
      }
    }

    return (
    <div>
      <h1>Fullstack Pokedex!</h1>
      <div>
        <button id="add" onClick={this.newPokePage}>Add New Pokemon</button>
      </div>
      <button onClick={this.handleShowAll}>Show All</button>
      <Select types={this.state.types} handleSelect={this.handleSelect}/>
      <div>{content()}</div>
    </div>
    )
  }
}

export default App;
