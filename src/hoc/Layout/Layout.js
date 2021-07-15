import React, {Component} from 'react';
import MenuToggle from '../../components/Navigation/MenuToggle';
import Drawer from '../../components/Navigation/Drawer';

class Layout extends Component {

    state = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        return (
            <div style={{width: '100%', height: '100vh'}}>
                <Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler}/>
                <MenuToggle onToggle={this.toggleMenuHandler} isOpen={this.state.menu}/>
                <main style={{width: '100%', height: '100%'}}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;