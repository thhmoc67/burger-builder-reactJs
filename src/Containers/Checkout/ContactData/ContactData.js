import React, { Component } from 'react';
import classes from './ContactData.css';

import Button from '../../../Components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactData extends Component{
    state={
             controls: [],
        orderForm: { 
            
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            country : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                   options:[
                       { value : 'fastest' , displayValue: 'Fastest'},
                       { value : 'cheepest' , displayValue: 'Cheepest'}
                   ]
                },
                validation: {
                    required: true,
                },
                valid:true,
                value: '',
                
            },
        },
        formIsValid: false,
        loading : false
    }

    checkValidity(value, rules){
        let isValid= true;
        
        if(rules.required){
            isValid = value.trim() !== ''  && isValid;
        }

        if (rules.minLength ){
            isValid= value.length >= rules.minLength && isValid;
        }

        if( rules.maxLength ){
            isValid= value.length <= rules.maxLength && isValid ;
        }


        return isValid;
    }

    OrderHandler= ( event )=> {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading : true});

         //to send the data to server
         const formData= {} ;
         for ( let formElementIdentifier in this.state.orderForm){
             formData[ formElementIdentifier ] = this.state.orderForm[formElementIdentifier].value;
         }
        //placing an order
        const order={
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            orderData: formData 
        }
        axios.post('/orders.json',order)//to post the data to server
            .then(response=>{
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error=> this.setState({ loading : false  })); 
    }

    inputChangeHandler= (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity( updatedFormElement.value , updatedFormElement.validation ) ;
        updatedFormElement.touched= true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        

        let formIsValid = true;
        
        for( let inputIdentifier in updatedOrderForm)
        {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            console.log(updatedOrderForm[inputIdentifier].valid);
        }
        this.setState({orderForm : updatedOrderForm ,formIsValid: formIsValid});
        
    }

    render(){

        //enter date dynamically
        const formElementArray=[];
        for( let key in this.state.orderForm ){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
            //console.log(this.state.orderForm[key]);
        }

        let form = (
            <form onSubmit = {this.OrderHandler }>
                
                {formElementArray.map( formElement => (
                     <Input  
                        key={ formElement.id }
                        elementtype={formElement.config.elementType} 
                        elementconfig={ formElement.config.elementConfig}
                        value={ formElement.config.value } 
                        changed={ (event) => this.inputChangeHandler(event, formElement.id )}
                        invalid= {!formElement.config.valid}
                        shouldValidate= { formElement.config.validation }
                        touched= {formElement.config.touched}/>
                        
                     ))
                }
                <Button btnType="Success" disabled= {!this.state.formIsValid} > Order </Button>
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
