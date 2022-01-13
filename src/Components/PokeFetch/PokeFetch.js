import React, { Component } from 'react'
import './PokeFetch.css';


export default class PokeFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      pokemonShow: false,
      timer: 10,
      timerOn: false,
      timerInterval: '',
    }
  }

  startTimer = () => {
    clearInterval(this.state.timerInterval)
    this.fetchPokemon()
    this.setState({ timerOn: true, pokemonShow: false, timer: 10 })
    this.setState({
      timerInterval: setInterval(() => {

        if (this.state.timer > 0) {
          this.setState({ timer: this.state.timer - 1, })
        } else {
          this.setState({ timerOn: false, pokemonShow: true })
        }
      }, 1000)
    })
  }



  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }



  render() {

    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={this.startTimer}>Start!</button>
        <h1 className={'timer'}>{this.state.timer}</h1>
        <div className={'pokeWrap'}>
          <img className={this.state.pokemonShow ? 'pokeImg' : 'pokeImg2'}src={this.state.pokeSprite} />
          <h1 className={this.state.pokemonShow ? 'pokeName':'pokeName2'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

