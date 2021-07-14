import React from 'react'


const MenuToggle = ({onToggle, isOpen}) => {
    const cls = [
        'MenuToggle',
        'fa',
    ]

    if (isOpen) {
        cls.push('fa-times')
        cls.push('open')
    } else {
        cls.push('fa-bars')
    }

    return (
        <i
        className={cls.join(' ')}
        onClick={onToggle}
        />
    )
}

export default MenuToggle;