import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Backdrop from '../UI/Backdrop';

class Drawer extends Component {

    renderLinks(links) {
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

        const links = [
            {to: '/', label: 'list', exact: true}
        ]

        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'create test', exact: false})
            links.push({to: '/logout', label: 'logout', exact: false})
        } else {
            links.push({to: '/auth', label: 'auth', exact: false})
        }

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </>
        )
    }

}

export default Drawer