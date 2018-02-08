import React, { Component } from 'react';
import classes from './ContactData.css';

import Button from '../../../Components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component{
    state={
        name: "",
        email:"",
        address: {
            street: "",
            postalCode: ""
        }
    }

    OrderHandler= ( event )=> {
        event.preventDefault();
        console.log(this.props.ingredients);
         this.setState({loading : true});
        //placing an order
            const order={
                ingredients: this.props.ingredients,
                price: this.props.price.toFixed(2),
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
                    this.setState({ loading: false });
                    this.props.history.push('/');
                })
                .catch(error=> this.setState({ loading : false  })); 
    }

    render(){
        let form = (
            <form>
                <input className={classes.Input} type= "text" name="name" placeholder="your Name" />
                <input className={classes.Input} type= "text" name="email" placeholder="your email" />
                <input className={classes.Input} type= "text" name="street" placeholder="street" />
                <input className={classes.Input} type= "text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.OrderHandler}> Order </Button>
            </form>
        );

        if(this.state.loading){
            form = < Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
