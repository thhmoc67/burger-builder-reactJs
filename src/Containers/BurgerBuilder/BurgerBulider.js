import React, { Component } from 'react';

import Aux from '../../Hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/BuildControls/BuildControls';
import Model from '../../Components/UI/Model/Model'; 
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../Hoc/WithErrorHandler/WithErrorHandler';


const INGREDIENT_PRICE= {
    salad: 0.5,
    meat: 0.7,
    cheese: 0.4,
    bacon: 0.7
}

class BurgerBuilder extends Component{
state= {
    ingredients: null,
    totalPrice : 4,
    purchasable: false,
    purchasing: false,
    loading: false ,//For spinner 
    error: false
}
 
componentDidMount(){
    axios.get('https://burger-builder-reactjs.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ ingredients : response.data });
        })
        .catch( error => {
            this.setState({error: true});
        });
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
    //alert("You Continue");
    this.setState({loading : true});
//placing an order
    const order={
        ingredients: this.state.ingredients,
        price: this.state.totalPrice.toFixed(2),
        customer:{
            name:'De saini',
            address:{
                street : 'ramnasgar',
                zip: '302033',
                email: 'dayalsaini67@gmail.com'
            }
        },
        deliveryMethod: 'Fastest'
    }
    axios.post('/orders.json',order)//to post the data to server
        .then(response=>{
            this.setState({ loading: false , purchasing : false });
        })
        .catch(error=> this.setState({ loading : false , purchasing : false  }));
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
        let orderSummary = null;
       

        let burger = this.state.error? 'ingredients can\'t be loaded ' : <Spinner />;

        if(this.state.ingredients){
            burger= (
                <Aux>
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
            orderSummary = <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}> 
                </OrderSummary> ;
            
            
        }

        

        if(this.state.loading){
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Model 
                    show={this.state.purchasing}
                    modelClosed={this.purchaseCancelHandler}>
                    
                    { orderSummary }

                </Model>
               
                {burger}
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder , axios);