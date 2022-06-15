import { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {
 const emptyBoard = Array(9).fill("")
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setcurrentPlayer] = useState("O");
  const [winner, setwinner] = useState(null)


  const handleCellClick = (index) => {
    if(board[index] !== "") return null;
    if(winner) return null;

    setBoard(
      board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item));

      setcurrentPlayer(currentPlayer === "x" ? "O" : "x")
  }


const checkWinner = () => {
const possibleWaysToWin = [
  [board[0], board[1], board[2]],
  [board[3], board[4], board[5]],
  [board[6], board[7], board[8]],

  [board[0], board[3], board[6]],
  [board[1], board[4], board[7]],
  [board[2], board[5], board[8]],

  [board[0], board[4], board[8]],
  [board[2], board[4], board[6]],
];

possibleWaysToWin.forEach(cells => {
  if(cells.every(cell => cell === "O")) setwinner("O");
  if(cells.every(cell => cell === "x")) setwinner("x");
})

checkDraw();
} 

const checkDraw = () => {
  if(board.every(item => item !== "")) {
    setwinner("E")
  }
}
useEffect(checkWinner, [board]);

const resetGame = () => {
  setcurrentPlayer("O");
  setBoard(emptyBoard);
  setwinner(null)
}
  return (
    <main>
    <h1 className='title'>jogo da velha</h1>

    <div className={`board ${winner ? "game-over" : ""}`}>
      {board.map((item, index) => (
        <div key={index} className={`cell ${item}`}
        onClick={() => handleCellClick(index)}>
          {item}
          </div>
      ))}
    </div>
    {winner &&
    <footer>
      {winner === "E" ?
      <h2 className='winner-mensage'>
        Empatou!
      </h2>
      :
      <h2 className='winner-mensage'><span className={winner}>{winner}</span> venceu!</h2>
      }
      
      <button onClick={resetGame}>Recomeçar jogo!</button>
    </footer>
}
    </main>
    );
}

export default TicTacToe;
