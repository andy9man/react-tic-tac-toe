import React, { Component } from 'react';
import './App.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={ () => {this.props.squareHandler(this.props.id);}}>

      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square id={i} squareHandler={this.props.squareHandler} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      player: [
        {'id':'player1', 'name':'Player 1'},
        {'id':'player2', 'name':'Player 2'}
      ],

      turn: 'player1',

      board: [
        {'cellId':0, 'value':null, 'enabled':true},
        {'cellId':1, 'value':null, 'enabled':true},
        {'cellId':2, 'value':null, 'enabled':true},
        {'cellId':3, 'value':null, 'enabled':true},
        {'cellId':4, 'value':null, 'enabled':true},
        {'cellId':5, 'value':null, 'enabled':true},
        {'cellId':6, 'value':null, 'enabled':true},
        {'cellId':7, 'value':null, 'enabled':true},
        {'cellId':8, 'value':null, 'enabled':true}
      ]
    }
    this.squareHandler = this.squareHandler.bind(this);
  }

  squareHandler( cellId ) {
    let arr = this.state.board.map( item => {
      if(cellId === item.cellId){
        return {'cellId':item.cellId, 'value':'X', 'enabled':false};
      }
      else{ return item; }
    })
    this.setState({board: arr}, () => {
      console.log(this.state.board);
    });

  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board squareHandler={this.squareHandler} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
