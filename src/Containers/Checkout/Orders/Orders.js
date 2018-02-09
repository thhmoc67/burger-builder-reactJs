import React, {Component} from 'react';

import Order from '../../../Components/Order/Order';
import axios from '../../../axios-order';
import WithErrorHandler from '../../../Hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component{

    state={
        orders: [],
        loading: true,

    }
//
    componentDidMount (){
        axios.get('/orders.json')
            .then(res => {
                console.log(res.data);
                const fetchedOrders = [];
                //fetch datas indivisually
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                    //console.log(fetchedOrders.id);
                }
                this.setState({loading: false , orders: fetchedOrders })
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    render(){
        return (
            <div>
                {this.state.orders.map( order => (
                    <Order 
                    key={order.id}
                    ingredients = {order.ingredients}
                    price={order.price}
                    customer={order.customer} />
                ) )}
               
                
            </div>
        );
    }
}

export default WithErrorHandler(Orders, axios);