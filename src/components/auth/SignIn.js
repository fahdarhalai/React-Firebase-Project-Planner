import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {signIn} from '../../store/actions/authActions';
import {Redirect} from 'react-router-dom';

class SignIn extends Component {
    state = {
        email: "",
        password: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {
        const {authError, auth} = this.props;
        if(auth.uid){
            return <Redirect to='/' />
        }
        return (
            <div className="container" style={{marginTop: 70+'px'}}>
                <div className="row valign-wrapper">
                    <div className="col s10 pull-s1 m6 pull-m3 l4 pull-l4">
                        <div className="card hoverable">
                            <div className="card-content">
                                <span className="card-title center">Sign In</span>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-field">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-field center">
                                        <button className="btn grey darken-3 z-depth-0">Login</button>
                                    </div>
                                    <div className="red-text center" style={{fontWeight: "bold"}}>
                                        {authError ? <p>{authError}</p> : null }
                                    </div>
                                </form>
                            </div>
                            <div className="card-action">
                                <p>Don't have an account ? <NavLink className="blue-text text-darken-4" to="/signup">Sign Up</NavLink></p>
                                <p>Forgot password ?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapstateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(SignIn);
