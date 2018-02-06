import React , { Component } from 'react';

import Aux from '../../Hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
//made class so thiat it can use methods
class Layout extends Component {
  /*-->*/
    state = {
        showSideDrawer: false
    }

    sideDrawerClaosedHandler= () => {
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler = () =>{
        this.setState( ( prevState ) =>{
            return {showSideDrawer: !prevState.showSideDrawer}
        }); 
    }

    render(){
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClaosedHandler} />
                <main className={ classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )  
    }
}

export default Layout;