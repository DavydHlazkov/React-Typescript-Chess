import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Figure, FigureNames } from "../models/figures/Figure";
import { King } from "../models/figures/King";
import { Player } from "../models/Player";

interface TimerProps {
    currentPlayer: Player | null;
    restart: ()=> void;
    childWhite : (childWhiteData:number) => void
    childBlack :(childBlackData:number) => void
    lostBlackFigures : Figure[];
    lostWhiteFigures : Figure[];
}

const Timer: React.FC <TimerProps> = ({currentPlayer, restart, childWhite, childBlack, lostBlackFigures, lostWhiteFigures }) => {
    const [whiteTime, setWhiteTime] = useState(1000)
    const [blackTime, setBlackTime] = useState(1000)
    const timer = useRef <null|  ReturnType<typeof setInterval>> (null)

    useEffect(()=>{
        startTimer()
    },[currentPlayer])

    function startTimer() {
        if(timer.current){
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    useEffect (()=>{
        deleteBlackTimer()
    },[lostBlackFigures.length])

    useEffect (()=> {
        deleteWhiteTimer()
    }, [lostWhiteFigures.length])

    function deleteBlackTimer (){
        if(timer.current){
            clearInterval(timer.current)
        }
        const deleteTime = lostBlackFigures[lostBlackFigures.length -1]?.name === FigureNames.KING ? deleteBlackTime : decrementBlackTimer
        timer.current = setInterval(deleteTime, 1000)
    }

    function deleteWhiteTimer (){
        if(timer.current){
            clearInterval(timer.current)
        }
        const deleteTime = lostWhiteFigures[lostWhiteFigures.length -1]?.name === FigureNames.KING ? deleteWhiteTime : decrementWhiteTimer
        timer.current = setInterval(deleteTime, 1000)
    }


    childWhite(whiteTime)
    childBlack(blackTime)

    function decrementWhiteTimer(){
        setWhiteTime(prev => prev -1)
    }

    function decrementBlackTimer(){
        setBlackTime (prev => prev -1)
        
    }

    const handleRestart = () => {
        setBlackTime(1000)
        setWhiteTime(1000)
        childWhite(whiteTime)
        childBlack(blackTime)
        restart()
    }

    function deleteBlackTime (){
        setBlackTime(prev => prev - prev)
    }
   
    function deleteWhiteTime (){
        setWhiteTime (prev => prev - prev)
    }


    return(
        <div className="timer">
            {whiteTime > 0 && blackTime > 0 ? <div className="game-going">
                <h2 id="white">white: {whiteTime}</h2>
                <h2>black: {blackTime}</h2>
            </div> : <div className="game-not"></div> }
            
              {whiteTime <= 0 || blackTime <= 0 ? <button className ="restart" onClick = {handleRestart}>press restart to start new game</button> : <button className ="pre-restart" onClick = {handleRestart}>press for restart</button>} 
        </div>
    )
}

export default Timer