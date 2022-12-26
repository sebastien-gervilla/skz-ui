import React, { CSSProperties } from 'react';

export interface SkzTagProps {
    text: string,
    fontSize?: number,
    textColor?: string,
    color?: string,
    leftEl?: JSX.Element,
    rightEl?: JSX.Element,
    styles?: CSSProperties
}

const Tag = ({text, fontSize = 13, color = '#0087D225', textColor = '#005F91', leftEl, rightEl, styles}: SkzTagProps) => {

    return (
        <div className="skz-tag_wrapper" style={_sTagWrapper}>
            <div 
                className="skz-tag" 
                style={{
                    ..._sTag, 
                    ...styles, 
                    backgroundColor: color, 
                    color: textColor, 
                    fontSize
                }}
            >
                {Boolean(leftEl) && leftEl}
                <p style={_sText}>{text}</p>
                {Boolean(rightEl) && rightEl}
            </div>
        </div>
    )
};

//#region Styles

const _sTagWrapper: CSSProperties = {
    display: 'flex',
}

const _sTag: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '7px 15px',
    borderRadius: 9999,
    fontFamily: 'Helvetica, Arial'
}

const _sText: CSSProperties = {
    margin: 0
}

//#endregion

export default Tag;