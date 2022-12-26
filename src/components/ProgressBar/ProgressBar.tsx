import React, { CSSProperties, useEffect, useRef } from 'react';
import { getProgression } from './utils';

export interface SkzProgressBarProps {
    color?: string,
    barColor?: string,
    size?: number,
}

const ProgressBar = ({color = '#009BE6', barColor = '#ccc', size = 8}: SkzProgressBarProps) => {

    const progressRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (!progressRef.current) return;
            progressRef.current.style.width = getProgression();
        })
    }, []);
    

    return (
        <div className="skz-progress-bar" style={{..._sProgressBar, backgroundColor: barColor, height: size || 8}}>
            <div ref={progressRef} className="skz-progress" style={{..._sProgress, backgroundColor: color}}>

            </div>
        </div>
    )
};

//#region Styles

const _sProgressBar: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0
}

const _sProgress: CSSProperties = {
    width: '0%',
    height: '100%'
}

//#endregion

export default ProgressBar;