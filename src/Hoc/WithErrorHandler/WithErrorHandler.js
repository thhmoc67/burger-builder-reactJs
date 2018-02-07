import React, { Component } from 'react';
import Model from '../../Components/UI/Model/Model';
import Aux from '../Aux';

const withErrorHandler = ( WrappedComponent , axios ) => {

    return class extends Component {

        state={
            error: null
        }

        componentWillMount(){

            axios.interceptors.request.use( req => {
                this.setState({error : null });
                return req;
            });
            axios.interceptors.response.use( res => res , error => {
                this.setState( {error: error });
            });
        }

        errorConfirmHandler = () => {
            this.setState({ error : null }); 
        }
        render(){
            return (
                <Aux>
                    <Model 
                        show={ this.state.error }
                        modelClosed = { this.errorConfirmHandler }>
                        
                        { this.state.error ? this.state.error.message  : null} 
                    </Model>
                    < WrappedComponent { ...this.props } />
                </Aux>
            );
        }
            
    }
}

export default withErrorHandler;