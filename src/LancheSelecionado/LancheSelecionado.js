import React, { Component } from 'react';
import './LancheSelecionado.scss';
import _ from 'underscore';

class LancheSelecionado extends Component {

  constructor(props) {
    super(props)
    this.state = {
      valorAtualLanche: 0,
      ingredientesLanche: this.props.lancheSelecionado.ingredientes,
      telaFim: false
    }
  }

  componentWillMount = () => {
    this._valorLancheSelecionado()
  }

  _valorLancheSelecionado = () => {
    let valorLanche = 0;
    let valorFinalComDesconto = 0;
    let quantidadeIngredientesLanche = this.state.ingredientesLanche.length;
    let ingredientesLanche = this.state.ingredientesLanche;
    let arrayIngredientesTotais = this.props.ingredientes;

    let contadorAlface = 0;
    let contadorBacon = 0;
    let contadorCarne = 0;
    let contadorQueijo = 0

    if(quantidadeIngredientesLanche > 0) {

      // Contadores de Alface, Bacon, Queijo e Carne.
      contadorAlface = (_.countBy(ingredientesLanche, ingrediente => ingrediente === 'Alface')).true
      contadorBacon = (_.countBy(ingredientesLanche, ingrediente => ingrediente === 'Bacon')).true
      contadorCarne = (_.countBy(ingredientesLanche, ingrediente => ingrediente === 'Hambúrguer de Carne')).true
      contadorQueijo = (_.countBy(ingredientesLanche, ingrediente => ingrediente === 'Queijo')).true

      console.log('Bacon ->',contadorBacon, 'Alface =>', contadorAlface, 'Carne =>', contadorCarne, 'Queijo =>', contadorQueijo)

      _.map(ingredientesLanche, ingredienteLanche => {
        let ingredienteRetornado = _.find(arrayIngredientesTotais, ingrediente => ingrediente.nomeProduto === ingredienteLanche)
        valorLanche = valorLanche + ingredienteRetornado.precoProduto
      })

      if(contadorAlface > 0 && !contadorBacon) {
        valorLanche = valorLanche * 0.9
        this.setState({valorAtualLanche: valorLanche.toFixed(2)})
      }
      if(contadorCarne >= 3) {
        let ingredienteCarne = _.filter(arrayIngredientesTotais, ingrediente => {
          if(ingrediente.nomeProduto === 'Hambúrguer de Carne')
            return ingrediente
        })
        let quociente = contadorCarne/3
        let restoDivisao = contadorCarne%3
        let parteInteiraQuociente = parseInt(quociente)
        if(restoDivisao == 0) {
          valorLanche = valorLanche - contadorCarne * (ingredienteCarne[0].precoProduto) + (parteInteiraQuociente*(2*ingredienteCarne[0].precoProduto))
        }
        else {
          valorLanche = valorLanche - contadorCarne * (ingredienteCarne[0].precoProduto) + (parteInteiraQuociente*(2*ingredienteCarne[0].precoProduto)) + (restoDivisao * ingredienteCarne[0].precoProduto)
          }
      }
      if(contadorQueijo > 3) {
        let ingredienteQueijo = _.filter(arrayIngredientesTotais, ingrediente => {
          if(ingrediente.nomeProduto === 'Queijo')
            return ingrediente
        })
        let quociente = contadorQueijo/3
        let restoDivisao = contadorQueijo%3
        let parteInteiraQuociente = parseInt(quociente)
        if(restoDivisao == 0) {
          valorLanche = valorLanche - contadorQueijo * (ingredienteQueijo[0].precoProduto) + (parteInteiraQuociente*(2*ingredienteQueijo[0].precoProduto))
        }
        else {
          valorLanche = valorLanche - contadorQueijo * (ingredienteQueijo[0].precoProduto) + (parteInteiraQuociente*(2*ingredienteQueijo[0].precoProduto)) + (restoDivisao * ingredienteQueijo[0].precoProduto)
          }
      }
      else {
        this.setState({valorAtualLanche: valorLanche.toFixed(2)})
      }
    }
    else {
      this.setState({valorAtualLanche: 0})
    }
    this.setState({valorAtualLanche: valorLanche.toFixed(2)})
  }

  _removeItemLanche = (itemLanche, index) => {
    console.log(index)
    let ingredientesLanche = this.state.ingredientesLanche
    let arrayIngredientesSemIngredienteRemovido = ingredientesLanche.splice(index, 1)
    this.setState({ingredientesLanche: ingredientesLanche}, () => {this._valorLancheSelecionado()})
  }

  _adicionaIngredienteLanche = (itemLanche) => {
    let ingredienteLanche = this.state.ingredientesLanche
    let arrayIngredientesComIngredienteAdicionado = ingredienteLanche.concat(itemLanche)
    this.setState({ingredientesLanche: arrayIngredientesComIngredienteAdicionado}, () => {this._valorLancheSelecionado()})
  }

  _redirectTelaFim = () => {
    this.setState({telaFim: true})
  }

  render() {
    let lanche = this.props.lancheSelecionado
    let ingredientes = this.props.ingredientes
    return (
      !this.state.telaFim ?
      <div className="LancheSelecionado">
        <div className="LancheSelecionado__card">

          <div className="LancheSelecionado__card__title-lanche">
            {lanche.nomeLanche}
          </div>
        </div>
        <div className="LancheSelecionado__card-ingredientes">
        <div className="LancheSelecionado__lista-ingredientes__titulo">
          Conteudo do Lanche:
        </div>
        <div className="LancheSelecionado__lista-ingredientes">
          {_.map(this.state.ingredientesLanche, (itemLanche, index) =>
            <div className="LancheSelecionado__lista-ingredientes__item">
          <div className="LancheSelecionado__lista-ingredientes__item__nome-produto">
            {itemLanche}
          </div>
          <div className="LancheSelecionado__lista-ingredientes__item__remover-produto" onClick={e => this._removeItemLanche(itemLanche, index)}>
            x
          </div>
          </div>
        )}
        </div>
        <div className="LancheSelecionado__preco-confirmar">
          <div className="LancheSelecionado__preco-lanche">
            R$ {this.state.valorAtualLanche}
          </div>
          {this.state.valorAtualLanche > 0 &&
            <div className="LancheSelecionado__finalizar-compra">
              <div className="LancheSelecionado__finalizar-compra__bnt-finalizar" onClick={e => this._redirectTelaFim()}>
                Concluir
              </div>
            </div>
          }
          </div>
        </div>
        <div className="LancheSelecionado__card-adicionar">
          <div className="LancheSelecionado__card-adicionar__title">
          Deseja acrescentar algo?
          </div>
          <div className="LancheSelecionado__menu-adicionar">
            {_.map(this.props.ingredientes, ingrediente =>
              <li className="LancheSelecionado__menu-adicionar__item" onClick={e => this._adicionaIngredienteLanche(ingrediente.nomeProduto)}>
               {ingrediente.nomeProduto}
              </li>
            )}
          </div>
        </div>
      </div>
      :
      <div className="LancheSelecionado__telaFim">
        Seu pedido foi realizado com sucesso!
      </div>
    );
  }
}

export default LancheSelecionado;
