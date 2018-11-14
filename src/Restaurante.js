import React, { Component } from 'react';
import './Restaurante.scss';
import './LanchePronto/LanchePronto.scss';
import LanchePronto from './LanchePronto/LanchePronto.js';
import MontarLanche from './MontarLanche/MontarLanche.js';
import _ from 'underscore';

class Restaurante extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuSelected: 'Pronto',
      lancheSelecionado: ''
    }
  }

  // Uso da função, somente para deixar o código mais organizado e limpo.
  _defineMenuSelecionado = (opcaoSelecionada) => {
      this.setState({menuSelected: ''},() => this.setState({menuSelected: opcaoSelecionada}))
  }

  render() {
    return (
      <div className="restaurante-dextraBurguer">
        <div className="restaurante-dextraBurguer__header">
          <div className="restaurante-dextraBurguer__header__interno">
            <div className="restaurante-dextraBurguer__header__logo">
              DextraBurguers
            </div>
            <div className="restaurante-dextraBurguer__header__buttons">
              <div className="restaurante-dextraBurguer__header__buttons__top-button" onClick={e => this._defineMenuSelecionado("Pronto")}>
                Lanches Prontos
              </div>
              <div className="restaurante-dextraBurguer__header__buttons__top-button" onClick={e => this._defineMenuSelecionado("Montar")}>
                Montar meu lanche!
              </div>
            </div>
          </div>
        </div>
        <div className="restaurante-dextraBurguer__body">
            {this.state.menuSelected === 'Pronto' &&
              <LanchePronto lancheSelecionado={this.state.lancheSelecionado}/>
            }

            {this.state.menuSelected === 'Montar' &&
              <MontarLanche/>
            }
        </div>
        <div className="restaurante-dextraBurguer__footer">
        <div className="restaurante-dextraBurguer__title">
          Todos os direitos reservados ©
          </div>
        </div>
      </div>
    );
  }
}

export default Restaurante;
