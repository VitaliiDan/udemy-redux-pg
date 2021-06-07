import React from "react";

const Button = ({children, onClick, disabled, type}) => {
    const cls = [
        'button',
        type,
    ]

    return (
        <button
        onClick={onClick}
        className={cls.join(' ')}
        disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;