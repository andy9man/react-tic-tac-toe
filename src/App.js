import React, { Component } from 'react';
import './App.css';

class Player extends React.Component {
	render() {
		return (
			<div className="player">
				<label htmlFor={this.props.id}>{this.props.player} Name: </label>
				<input id={this.props.id} type="text" placeholder={this.props.playerName} onInput={(e) => {this.props.setPlayerName(e.target.value, this.props.id);}}/>
				 &nbsp; &nbsp;WINS: {this.props.wins}
			</div>
		);
	}
}

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
    const status = this.props.playerName + "'s Turn...";

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
				{id:'player1', name:'Player 1', wins:0},
				{id:'player2', name:'Player 2', wins:0}
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
		this.setPlayerName = this.setPlayerName.bind(this);
		this.resetBoard = this.resetBoard.bind(this);
	}

	resetBoard() {
		document.getElementById("game-board").classList.remove('disabled');
		let arr = this.state.board.map( (item, index) => {
			return {'cellId':index, 'value':null, 'disabled':false};
		});
		this.setState({board: arr, winner:'', turn: true, count: 0});
	}

  	getSign() {
		return this.state.turn ? 'X': 'O';
  	}

  	getCurrentPlayerName() {
    	return this.state.turn ? this.state.player[0].name : this.state.player[1].name;
	}

	setPlayerName(name, playerId) {
		console.log("SetPlayerName: " + name + "  PlayerID: " + playerId);
		let arr = this.state.player.map( item => {
			return playerId === item.id ? {id:item.id, name:name, wins:item.wins} : item;
		});
		this.setState({player: arr}, () => { console.log(this.state.player); });
	}

  	squareHandler(cellId) {
    	let arr = this.state.board.map( item => {
      		if(cellId === item.cellId){
        		return {'cellId':item.cellId, 'value': this.getSign(), 'disabled':true};
      		}
		 	else{ return item; }
		});

		this.setState({board: arr, turn:!this.state.turn, count: parseInt(this.state.count, 10)+1} , () => {
      		this.processWinner(this.state.board, this.state.count);
		});

	}

	processWinner(board, count) {
		console.log("Count: " + count);
		const checkWinner = this.checkForWinner();

		if(checkWinner.winner) {
			console.log(this.state.player);
			//Get winning player name and the index based on cell value
			const player = ( (index) => {
				return {name: this.state.player[index].name, index: index};
			})( checkWinner.winnerSign === 'X' ? 0 : 1 );

			//Get a new player array with updated wins count for winning player
			const playerArr = this.state.player.map( (item, index) => {
				return index === player.index ? {id:item.id, name:item.name, wins:parseInt(item.wins, 10)+1} : item;
			});
			console.log("New Player Array: ");
			console.log(playerArr);
			//We have a winner so let's disable the board
			document.getElementById("game-board").classList.add('disabled');

			//Last, let's update the state with winning message and update the player array
			this.setState({winner:"We have a WINNER... " + player.name + "!!", player: playerArr});
		}
		else if(count === 9){
			this.setState({winner:"We have a draw..."});
		}
	}

	/*
		- Takes 3 values and compares them to see if they are equal and not null
			- Returns true or false
	*/
	checkForEqual(a, b, c){
		return a != null && b != null && c != null && a === b && b === c ? true : false;
	}

	/*
		- Checks for a winner based on they 8 possible tic-tac-toe winning scenarios
			- Returns object with winner true or false and the sign
	*/
	checkForWinner() {
		console.log("Checking for winner...");
		if(this.checkForEqual(this.state.board[0].value, this.state.board[1].value,
			this.state.board[2].value)) {
			return {winner: true, winnerSign: this.state.board[0].value};
		}
		else if(this.checkForEqual(this.state.board[3].value,
			this.state.board[4].value, this.state.board[5].value)) {
			return {winner: true, winnerSign: this.state.board[3].value};
		}
		else if(this.checkForEqual(this.state.board[6].value,
			this.state.board[7].value, this.state.board[8].value)) {
			return {winner: true, winnerSign: this.state.board[6].value};
		}
		else if(this.checkForEqual(this.state.board[0].value, this.state.board[3].value,
			this.state.board[6].value)) {
			return {winner: true, winnerSign: this.state.board[0].value};
		}
		else if(this.checkForEqual(this.state.board[1].value,
			this.state.board[4].value, this.state.board[7].value)) {
			return {winner: true, winnerSign: this.state.board[1].value};
		}
		else if(this.checkForEqual(this.state.board[2].value, this.state.board[5].value, this.state.board[8].value)) {
			return {winner: true, winnerSign: this.state.board[2].value};
		}
		else if(this.checkForEqual(this.state.board[0].value, this.state.board[4].value, this.state.board[8].value)) {
			return {winner: true, winnerSign: this.state.board[0].value};
		}
		else if(this.checkForEqual(this.state.board[2].value, this.state.board[4].value, this.state.board[6].value)) {
			return {winner: true, winnerSign: this.state.board[2].value};
		}

		return {winner: false, winnerSign: ''};
	}

	render() {
    	return (
			<div className="container">
				<h1 id="title">React Tic-Tac-Toe</h1>
				<div id="playerInfo">
					{this.state.player.map( (item, index) => {
						return (
							<Player key={index} id={this.state.player[index].id} player={"Player " + (index + 1)} playerName={this.state.player[index].name} setPlayerName={this.setPlayerName} wins={this.state.player[index].wins} />
						);
					})}
					<button id="resetButton" onClick={this.resetBoard} className="float-r">&#8635;</button>
				</div>
				<div id="gameInfo">
					<h1 className="center">{this.state.winner}</h1>
				</div>
				<div className="game">
					<div id="game-board">
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
