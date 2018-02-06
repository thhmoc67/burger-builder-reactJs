import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredients';


const burger = ( props ) => {
   
//Insert ingredients through state
    let transformedIngredients= Object.keys( props.ingredients)
        .map( IGKey => {
            return [...Array( props.ingredients[ IGKey ])].map(( _, i ) => {
                return < BurgerIngredient key= { IGKey + i } type= { IGKey } />;
            });
        })
        .reduce( (arr, element)=> {
            return arr.concat(element);
        }, [])
    //console.log( transformedIngredients);
    
    if( transformedIngredients.length === 0){
        transformedIngredients = <p> please start adding ingredients </p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type= "bread-top" />
             { transformedIngredients }
            <BurgerIngredient type= "bread-bottom"/>
        </div>
    );
};

export default burger;