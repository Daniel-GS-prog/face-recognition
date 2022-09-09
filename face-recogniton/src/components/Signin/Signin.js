import {React, Component} from "react";
import './Signin.css';


class Signin extends Component {

    // setting state variables for the signin functionality.
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    //updating state variables with input from user.
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }
    OnPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }
    onSubmitSignin = () => {
        fetch('http://localhost:3000/signin', {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data === 'success'){
               this.props.onRouteChange('home'); 
            }
        })
        
    }


    render(){

        const {onRouteChange} = this.props;// destructuring;

        return (
        // from tachyons
        <article className=" br3 ba  b--black-10 mv4  mw5 shadow-5 center">
            <div className="pa2 black-80">
                <div className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 br1 input-reset b--black ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={this.onEmailChange}
                            />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 br1 input-reset b--black ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={this.OnPasswordChange}
                            />
                    </div>
                    
                    </fieldset>
                    <div className="">
                    <input 
                        onClick={this.onSubmitSignin} // rerouting to home
                        className="b ph3 pv2 br1 center input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in"
                    />
                    </div>
                    <div className="lh-copy mt3">
                    <p 
                        className="f6 link dim black db"
                        onClick={() => onRouteChange('register')} // rerouting to register
                        >Register
                    </p>
                    
                    </div>
                </div>
            </div>
        </article>
        );
    }
}

export default Signin;