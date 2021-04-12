import React from 'react';
import axios from 'axios';

class Create extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      poke: '',
      type: '',
      img: '',
      posted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const {poke, type, img} = this.state;
    console.log(poke, type, img);
    axios.post('/api/pokemon', {name: poke, type, img})
      .then(() => this.setState({posted: true}))
      .catch((err) => console.log(err));
  }

  afterSubmit() {
    if (this.state.posted) {
      this.state.posted = false;
      return (
        <div>
          <div>Successfully Added!</div>
          <button onClick={this.props.goBack}>Home</button>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    return (
      <div>
        <h1>Create New Pokemon</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Add Pokemon</label>
          <input type="text" name="poke" onChange={this.handleChange}></input>
          <label>Add Type</label>
          <input type="text" name="type" onChange={this.handleChange}></input>
          <label>Add Image</label>
          <input type="text" name="img" onChange={this.handleChange}></input>
          <button>Submit</button>
        </form>
        <div>{this.afterSubmit()}</div>
      </div>
    )
  }
}


export default Create;