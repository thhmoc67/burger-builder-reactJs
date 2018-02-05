import React from 'react';
import Aux from '../../../Hoc/Aux';

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
            <p>continue to checkout</p>
        </Aux>
    )
};

export default orderSummary;