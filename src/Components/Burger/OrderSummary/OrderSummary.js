import React from 'react';
import Aux from '../../../Hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(IGKey =>{
          return <li key={IGKey}> 
                <span style={{textTransform: 'capitalize'}}>
                    {IGKey}
                </span>
                : {props.ingredients[IGKey]} 
            </li>
    });
    return (

        <Aux>
            <h3> Your Order </h3>
            <p> A delecious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p> <strong> Total Price: {props.price.toFixed(2)} </strong> </p>
            <p>continue to checkout</p>
            <Button 
                btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button 
                btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    )
};

export default orderSummary;