import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {signUp} from '../../store/actions/authActions';

class SignUp extends Component {
    state = {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render() {
        const {auth, authError} = this.props;
        if(auth.uid){
            return <Redirect to='/' />
        }
        return (
            <div className="container" style={{marginTop: 50+'px'}}>
                <div className="row valign-wrapper">
                    <div className="col s10 pull-s1 m8 pull-m2 l4 pull-l4">
                        <div className="card hoverable">
                            <div className="card-content">
                                <span className="card-title center">Sign Up</span>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-field">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" id="firstName" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" id="lastName" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" onChange={this.handleChange} />
                                    </div>
                                    <div className="input-field row center">
                                        <button className="btn grey darken-3 z-depth-0">Sign Up</button>
                                    </div>
                                    <div className="red-text center" style={{fontWeight: "bold"}}>{authError ? <p>{authError}</p>: null}</div>
                                </form>
                            </div>
                            <div className="card-action">
                                <p>Already have an account ? <NavLink className="blue-text text-darken-4" to="/login">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
