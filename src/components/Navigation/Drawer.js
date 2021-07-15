import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Backdrop from '../UI/Backdrop';

const links = [
    {to: '/', label: 'list', exact: true},
    {to: '/auth', label: 'auth', exact: false},
    {to: '/quiz-creator', label: 'create test', exact: false},
]

class Drawer extends Component {

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName='active'
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>)
        })
    }

    render() {
        const cls = ['Drawer']

        if (!this.props.isOpen) {
            cls.push('close')
        }

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </>
        )
    }

}

export default Drawer