import React, { CSSProperties } from 'react';
import { colorSet, colorSets } from './colors';

export interface SkzTagProps {
    text: string,
    colorSet?: colorSet,
    leftEl?: JSX.Element,
    rightEl?: JSX.Element,
    style?: CSSProperties,
    withBorder?: boolean
}

const Tag = ({text, colorSet = 'blue', leftEl, rightEl, style, withBorder = false}: SkzTagProps) => {

    return (
        <div className="skz-tag_wrapper" style={_sTagWrapper}>
            <div 
                className="skz-tag" 
                style={{
                    ..._sTag,
                    border: withBorder ? '1px solid' : 'none',
                    ... (colorSet && colorSet in colorSets ? 
                            colorSets[colorSet] : colorSets.cyan),
                    ...style
                }}
            >
                {Boolean(leftEl) && leftEl}
                <p 
                    style={{
                        ..._sText,
                        marginLeft: leftEl ? 5 : 0,
                        marginRight: rightEl ? 5 : 0
                    }}
                >
                    {text}
                </p>
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
    fontSize: 13,
    color: '#005F91',
    backgroundColor: '#0087D225',
}

const _sText: CSSProperties = {
    margin: 0,
    fontFamily: 'inherit'
}

//#endregion

export default Tag;