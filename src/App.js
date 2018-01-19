import React, { Component } from 'react';
import './App.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" disabled={this.props.disabled} onClick={ () => {this.props.squareHandler(this.props.id);}}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i, value, disabled) {
    return <Square id={i} value={value} disabled={disabled} squareHandler={this.props.squareHandler} />;
  }

  render() {
    const status = "It is currently: " + this.props.playerName;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0, this.props.board[0].value, this.props.board[0].disabled)}
          {this.renderSquare(1, this.props.board[1].value, this.props.board[1].disabled)}
          {this.renderSquare(2, this.props.board[2].value, this.props.board[2].disabled)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, this.props.board[3].value, this.props.board[3].disabled)}
          {this.renderSquare(4, this.props.board[4].value, this.props.board[4].disabled)}
          {this.renderSquare(5, this.props.board[5].value, this.props.board[5].disabled)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, this.props.board[6].value, this.props.board[6].disabled)}
          {this.renderSquare(7, this.props.board[7].value, this.props.board[7].disabled)}
          {this.renderSquare(8, this.props.board[8].value, this.props.board[8].disabled)}
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

			turn: true,

			count: 0,

			winner: '',

			board: [
				{'cellId':0, 'value':null, 'disabled':false},
				{'cellId':1, 'value':null, 'disabled':false},
				{'cellId':2, 'value':null, 'disabled':false},
				{'cellId':3, 'value':null, 'disabled':false},
				{'cellId':4, 'value':null, 'disabled':false},
				{'cellId':5, 'value':null, 'disabled':false},
				{'cellId':6, 'value':null, 'disabled':false},
				{'cellId':7, 'value':null, 'disabled':false},
				{'cellId':8, 'value':null, 'disabled':false}
			]
		}
		this.squareHandler = this.squareHandler.bind(this);
		this.getSign = this.getSign.bind(this);
		this.getCurrentPlayerName = this.getCurrentPlayerName.bind(this);
		this.processWinner = this.processWinner.bind(this);
		this.checkForWinner = this.checkForWinner.bind(this);
		this.checkForEqual = this.checkForEqual.bind(this);
	}

  	getSign() {
		return this.state.turn ? 'X': 'O';
  	}

  	getCurrentPlayerName() {
    	return this.state.turn ? this.state.player[0].name : this.state.player[1].name;
  	}

  	squareHandler(cellId) {
    	let arr = this.state.board.map( item => {
      		if(cellId === item.cellId){
        		return {'cellId':item.cellId, 'value': this.getSign(), 'disabled':true};
      		}
		 	else{ return item; }
		});

		this.setState({board: arr, turn:!this.state.turn, count: parseInt(this.state.count)+1} , () => {
      		this.processWinner(this.state.board, this.state.count);
		});
		this.processWinner();
		console.log("WINNER?: " + this.state.winner);

	}

	processWinner(board, count) {
		console.log("Count: " + count);
		if(this.checkForWinner()) {
			this.setState({winner:"We have a WINNER!!"});
		}
		else if(count === 9){
			this.setState({winner:"We have a draw..."});
		}
	}

	checkForEqual(a, b, c){
		return a != null && a === b && b === c ? true : false;
	}

	checkForWinner() {
		console.log("Checking for winner...");
		if(this.checkForEqual(this.state.board[0].value, this.state.board[1].value,
			this.state.board[2].value)) {
			return true;
		}
		else if(this.checkForEqual(this.state.board[3].value,
			this.state.board[4].value, this.state.board[5].value)) {
			return true;
		}
		else if(this.checkForEqual(this.state.board[6].value,
			this.state.board[7].value, this.state.board[8].value)) {
			return true;
		}
		else if(this.checkForEqual(this.state.board[0].value, this.state.board[3].value,
			this.state.board[6].value)) {
			return true;
		}
		else if(this.checkForEqual(this.state.board[1].value,
			this.state.board[4].value, this.state.board[7].value)) {
			return true;
		}
		else if(this.checkForEqual(this.state.board[2].value, this.state.board[5].value, this.state.board[8].value)) {
			return true;
		}
		else if(this.checkForEqual(this.state.board[0].value, this.state.board[4].value, this.state.board[8].value)) {
			return true;
		}
		else if(this.checkForEqual(this.state.board[2].value, this.state.board[4].value, this.state.board[6].value)) {
			return true;
		}

		return false;
	}

	render() {
    	return (
			<div className="container">
				<h1>{this.state.winner}</h1>
				<div className="game">
					<div className="game-board">
						<Board squareHandler={this.squareHandler} playerName={this.getCurrentPlayerName()} board={this.state.board} />
					</div>
					<div className="game-info">
						<div>{/* status */}</div>
						<ol>{/* TODO */}</ol>
					</div>
				</div>
			</div>
    	);
  	}
}

export default Game;
