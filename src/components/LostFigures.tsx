import { title } from "process";
import React from "react";
import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
    title: string;
    figures: Figure[];
    id : string;
}

const LostFigures: React.FC <LostFiguresProps> = ({title, figures, id}) => {
    return(
        <div className="lost">
            <h3 id={id}>{title}</h3>
            {figures.map(figur => <div id={id} key={figur.id}>
                    {figur.name} {figur.logo && <img width={20} height={20} src={figur.logo}/>}
            </div>
            )}
        </div>
    )
}

export default LostFigures