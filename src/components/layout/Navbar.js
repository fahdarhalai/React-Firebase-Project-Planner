import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import {connect} from 'react-redux';
import logo from '../../images/logo1.png';

const Navbar = (props) => {
    const {auth, profile} = props;
    const links = auth.uid ? <SignedInLinks profile={profile} clickOutside={props.clickOutside} /> : <SignedOutLinks />;
    return (
        <nav className="nav-wrapper" id="nav-menu">
            <div className="container">
                <Link to="/" className="brand-logo"><img src={logo} alt="ProPlanner" id="logo" /></Link>
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar);