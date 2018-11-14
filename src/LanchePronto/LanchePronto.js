import React, { Component } from 'react';
import LancheSelecionado from '../LancheSelecionado/LancheSelecionado.js'
import './LanchePronto.scss';
import _ from 'underscore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LanchePronto extends Component {

  constructor(props){
    super(props);
    this.state = {
      arrayLanches: [],
      ingredientes: [],
      lancheSelecionado: this.props.lancheSelecionado
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/produtos')
    .then(results => {return results.json()})
    .then(lanches => this.setState({arrayLanches: lanches}));
    fetch('http://localhost:3001/precoIngredientes')
    .then(results => {return results.json()})
    .then(arrayIngredientes => this.setState({ingredientes: arrayIngredientes}))
  }

  _selecionaLanche = (lanche) => {
    this.setState({lancheSelecionado: lanche})
    }


  render() {
    return (
      <div className="LanchePronto">
      {this.state.lancheSelecionado == '' ?
        <div className="LanchePronto__div-superior">
        {_.map(this.state.arrayLanches, lanche => {
          return <div className="LanchePronto__card-lanche">
              <div className="LanchePronto__card-lanche__flip">

                <div className="LanchePronto__card-lanche__front">
                  <div className="LanchePronto__card-lanche__nome-lanche">
                    {lanche.nomeLanche}
                  </div>
                </div>

                <div className="LanchePronto__card-lanche__back">
                  <p className="LanchePronto__card-lanche__back__titulo">Nosso lanche é feito com:</p>
                  {_.map(lanche.ingredientes, ingrediente =>
                    <li className="LanchePronto_card-lanche__back__ingrediente">{ingrediente}</li>
                  )}
                  <div className="LanchePronto__card-lanche__back__div-button">
                    <div className="LanchePronto__card-lanche__back__button" onClick={() => this._selecionaLanche(lanche)}>Comprar</div>
                  </div>
                </div>

              </div>
            </div>
        })}
        </div>
          :
          <LancheSelecionado
          lancheSelecionado={this.state.lancheSelecionado}
          ingredientes={this.state.ingredientes}
          />
        }
      </div>
    );
  }
}

export default LanchePronto;
