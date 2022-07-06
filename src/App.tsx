import React, {useState} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';
import { useEffect } from 'react';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import GameOver from './components/GameOver';

function App() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState <Player | null>(null)
  const [white, setWhite] = useState(10000)
  const [black, setBlack] = useState(10000)

  const childWhite = (childWhiteData:number) =>{
      setWhite(childWhiteData)
  }

  const childBlack = (childBlackData: number) => {
    setBlack(childBlackData)
  }


  React.useEffect(()=>{
    setWhite(white)
  },[white])

  React.useEffect(()=>{
    restart()
    setCurrentPlayer(whitePlayer)
  },[])

  function restart (){
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }


  function swapPlayer(){
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className='app'>
      {white > 0 && black > 0 ? <div>
          <LostFigures id ="black" title="black figures" figures ={board.lostBlackFigure}/>
          </div> : null}
      
      {white <= 0 || black <= 0 
      ? <div>
          <GameOver white = {white} black = {black}/>
          <Timer
        restart={restart}
        currentPlayer = {currentPlayer}
        childWhite = {childWhite}
        childBlack = {childBlack}
        lostBlackFigures = {board.lostBlackFigure}
        lostWhiteFigures = {board.lostWhiteFigure}
      />

        </div>  
      : <div><BoardComponent board={board}
       setBoard = {setBoard}
       currentPlayer = {currentPlayer}
       swapPlayer = {swapPlayer}
       />
       <Timer
        restart={restart}
        currentPlayer = {currentPlayer}
        childWhite = {childWhite}
        childBlack = {childBlack}
        lostBlackFigures = {board.lostBlackFigure}
        lostWhiteFigures = {board.lostWhiteFigure}
      />
       </div>}
       {white > 0 && black > 0 ? <div>
          <LostFigures id="white" title="white figures" figures ={board.lostWhiteFigure}/>
       </div> : null}
       
    </div>
  );
}

export default App;
