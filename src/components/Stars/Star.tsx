import React, { CSSProperties } from "react";
import { AiFillStar } from 'react-icons/ai';

interface SkzStarProps {
    isSelected: boolean,
    onClick: () => void,
    color: string,
    offColor: string,
    size: number
}

const Star = ({ isSelected, onClick, color, offColor, size}: SkzStarProps) => {
    return (
        <div className="star" onClick={onClick}>
            <AiFillStar 
                style={{
                    ..._sStar, 
                    width: size,
                    height: size,
                    color: isSelected ? color : offColor
                }}
            />
        </div>
    )
}

//#region Styles

const _sStar: CSSProperties = {
    marginRight: 10,
    cursor: 'pointer',
    transition: '.2s ease'
}

//#endregion

export default Star;