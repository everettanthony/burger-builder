import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.module.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Drawer from '../Navigation/Drawer/Drawer';

class Layout extends Component {
    state = {
        drawerOpen: false
    }

    drawerCloseHandler = () => {
        this.setState({ drawerOpen: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { drawerOpen: !prevState.drawerOpen };
        } );
    }

    render() {
        return (
            <Aux>
                <div className={styles.container}>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                    <Drawer 
                        open={this.state.drawerOpen} 
                        closed={this.drawerCloseHandler} />
                    <main  className={styles.main}>
                        {this.props.children}
                    </main>
                </div>
            </Aux>
        );
    };
};

export default Layout;
