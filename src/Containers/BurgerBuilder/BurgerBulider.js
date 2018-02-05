import React, { Component } from 'react';

import Aux from '../../Hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/BuildControls/BuildControls';

const INGREDIENT_PRICE= {
    salad: 0.5,
    meat: 0.7,
    cheese: 0.4,
    bacon: 0.7
}

class BurgerBuilder extends Component{
state= {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice : 4
}

addIngredientHandler= (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients ={
        ...this.state.ingredients
    };
    updatedIngredients[type]= updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState ({ totalPrice: newPrice , ingredients: updatedIngredients});

};

removeIngredientHandler= (type) => {

    const oldCount = this.state.ingredients[type];
    if( oldCount<= 0){
        return;
    }
        
    const updatedCount = oldCount - 1;
    const updatedIngredients ={
        ...this.state.ingredients
    };
    updatedIngredients[type]= updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState ({ totalPrice: newPrice , ingredients: updatedIngredients});
};

    render () {
        const disabledInfo={
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        console.log(this.state.ingredients);
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded= {this.addIngredientHandler}
                    ingredientRemoved= {this.removeIngredientHandler}
                    disabled={ disabledInfo }
                    price= { this.state.totalPrice}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;