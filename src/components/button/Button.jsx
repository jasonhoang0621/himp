import propsTypes from 'prop-types'
import React from 'react'
import './Button.scss'

const Button = (props) => {
    return (
        <button
            className={`btn ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </button>
    )
}

export const OutlineButton = (props) => {
    return (
        <button
            className={`outline_btn ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </button>
    )
}

Button.propsTypes = {
    className: propsTypes.string,
    onClick: propsTypes.func,
}


export default Button