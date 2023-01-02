import React, { CSSProperties, useEffect, useRef } from 'react';
import { getProgression } from './utils';

export interface SkzProgressBarProps {
    value?: number,
    style?: CSSProperties,
    color?: string,
    barColor?: string,
    size?: number,
    trackScroll?: boolean
}

const ProgressBar = ({
        value = 0,
        style = _sProgressBar,
        color = '#009BE6',
        trackScroll = false
    }: SkzProgressBarProps) => {

    const progressRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const getProgressWidth = () => {
        if (!progressBarRef.current) return 0;
        const rect = progressBarRef.current.getBoundingClientRect();
        value = value > 100 ? 100 : value < 0 ? 0 : value;
        return (value * rect.width) / 100;
    }

    useEffect(() => {
        if (!progressRef.current || trackScroll) return;
        progressRef.current.style.width = getProgressWidth() + 'px';
    }, [value]);
    
    useEffect(() => {
        trackScroll && window.addEventListener('scroll', () => {
            if (!progressRef.current) return;
            progressRef.current.style.width = getProgression();
        })
    }, []);
    

    return (
        <div 
            className="skz-progress-bar"
            ref={progressBarRef}
            style={{
                ..._sProgressBar,
                ...style
            }}
        >
            <div 
                ref={progressRef} 
                className="skz-progress" 
                style={{
                    ..._sProgress, 
                    backgroundColor: color
                }}
            >

            </div>
        </div>
    )
};

//#region Styles

const _sProgressBar: CSSProperties = {
    width: 140,
    height: 16,
    backgroundColor: '#ccc'
}

const _sProgress: CSSProperties = {
    width: '0%',
    height: '100%',
    transition: '.1s ease'
}

//#endregion

export default ProgressBar;