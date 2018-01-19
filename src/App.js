import React, { Component } from 'react';
import './App.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square"  onClick={ () => {this.props.squareHandler(this.props.id);}}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i, value, enabled) {
    return <Square id={i} value={value} enabled={enabled} squareHandler={this.props.squareHandler} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0, this.props.board[0].value, this.props.board[0].enabled)}
          {this.renderSquare(1, this.props.board[1].value, this.props.board[1].enabled)}
          {this.renderSquare(2, this.props.board[2].value, this.props.board[2].enabled)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, this.props.board[3].value, this.props.board[3].enabled)}
          {this.renderSquare(4, this.props.board[4].value, this.props.board[4].enabled)}
          {this.renderSquare(5, this.props.board[5].value, this.props.board[5].enabled)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, this.props.board[6].value, this.props.board[6].enabled)}
          {this.renderSquare(7, this.props.board[7].value, this.props.board[7].enabled)}
          {this.renderSquare(8, this.props.board[8].value, this.props.board[8].enabled)}
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
        {'id':'player1', 'name':'Player 1', 'sign':'X'},
        {'id':'player2', 'name':'Player 2', 'sign':'O'}
      ],

      turn:true,

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
    this.getSign = this.getSign.bind(this);
  }
getSign(){
  return this.state.turn ? 'X': 'O';
}
  squareHandler( cellId ) {
    let arr = this.state.board.map( item => {
      if(cellId === item.cellId){
        return {'cellId':item.cellId, 'value': this.getSign(), 'enabled':false};
      }
      else{ return item; }
    })
    this.setState({board: arr, turn:!this.state.turn} , () => {
      console.log(this.state.board);

    });

  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board squareHandler={this.squareHandler} board={this.state.board} />
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
