import React from "react";
import { Cell } from "../models/Cell";

interface CellProps {
    cell: Cell
    selected: boolean;
    click: (cell:Cell) => void;
}


const CellComponent: React.FC<CellProps> = ({cell, selected, click}) => {
    return (
        <div className={['cell', cell.color, selected ? "selected" : ''].join(' ')}
         onClick = {()=>click(cell)} 
         style = {{background :cell.available && cell.figure ? "#FFB0FC" : ''}}>
            {cell.available && !cell.figure && <div className="available"></div>}
            {cell.figure?.logo && <img src = {cell.figure.logo} alt = ""></img>}

        </div>
    )
}

export default CellComponent