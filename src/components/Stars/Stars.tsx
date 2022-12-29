import React, { CSSProperties } from 'react';
import Star from './Star';

export interface SkzStarsProps {
    rating: number,
    maxRate?: number,
    onChange: (nextRate: number) => void,
    color?: string,
    offColor?: string,
    size?: number
}

const Stars = ({rating, onChange, maxRate = 5, color = '#fadb14', offColor = '#bbb', size = 30}: SkzStarsProps) => {

    const handleChangeStars = (index: number) => onChange(index);

    const handleDisplayStars = () => {
        let stars = [];
        for (let i = 0; i < maxRate; i++)
            stars.push(<Star 
                key={i}
                isSelected={rating > i} 
                onClick={() => handleChangeStars(i + 1)}
                color={color} 
                offColor={offColor} 
                size={size}
            />);
        return stars;
    }
    console.log(size);
    
    return (
        <div className="skz-stars_wrapper" style={_sStars}>
            {handleDisplayStars()}
        </div>
    )
};

//#region Styles

const _sStars: CSSProperties = {
    display: 'flex',
    alignItems: 'center'
}

//#endregion

export default Stars;