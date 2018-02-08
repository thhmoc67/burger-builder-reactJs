import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className = {classes.NavigationItems}>
       < NavigationItem  Link="/" exact > Burger Builder </NavigationItem>
       < NavigationItem Link="/orders"  > Orders </NavigationItem>

    </ul>
)

export default navigationItems;