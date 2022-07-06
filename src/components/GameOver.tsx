import React from "react";


interface GameOverProps{
    white : number;
    black: number;
}

const GameOver: React.FC <GameOverProps> = ({white, black}) => {
    return(
        <div id= {white>black ? "white" : ""} className="game-over">
            <h1>{white>black ? "white" : "black"} player win!</h1>
        </div>
    )
}

export default GameOver