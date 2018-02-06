import React, { Component } from 'react';

import Aux from '../../Hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/BuildControls/BuildControls';
import Model from '../../Components/UI/Model/Model'; 
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

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
    totalPrice : 4,
    purchasable: false,
    purchasing:false
}

updatePurchaseState(ingredients){
   
    const sum = Object.keys(ingredients)
        .map(IGKey =>{
            return ingredients[IGKey];
        })
        .reduce((sum,element)=> {
            return sum + element;
        },0);
    this.setState({purchasable: sum > 0 });
}

purchaseHandler=()=>{
    this.setState({purchasing: true});
}

purchaseCancelHandler= () =>{
    this.setState({purchasing: false});
}

purchaseContinueHandler=() =>{
    alert("you Continue");
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
    this.updatePurchaseState(updatedIngredients);

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
    this.updatePurchaseState(updatedIngredients);
};

    render () {
        const disabledInfo={
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
       // console.log(this.state.ingredients);
        return (
            <Aux>
                <Model 
                    show={this.state.purchasing}
                    modelClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}> </OrderSummary>
                </Model>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded= {this.addIngredientHandler}
                    ingredientRemoved= {this.removeIngredientHandler}
                    disabled={ disabledInfo }
                    purchasable= {this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price= { this.state.totalPrice}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;