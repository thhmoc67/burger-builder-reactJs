import React, { Component } from 'react';
import Aux from '../../../Hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //this could be functional component , doen't have to be a class
    componentWillUpdate(){
        console.log("[Ordersummary] will update");
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(IGKey =>{
            return <li key={IGKey}> 
                    <span style={{textTransform: 'capitalize'}}>
                        {IGKey}
                    </span>
                    : {this.props.ingredients[IGKey]} 
                </li>
        });
        return(
            <Aux>
                <h3> Your Order </h3>
                <p> A delecious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p> <strong> Total Price: {this.props.price.toFixed(2)} </strong> </p>
                <p>continue to checkout</p>
                <Button 
                    btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button 
                    btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </Aux>
        );
    }
};

export default OrderSummary;