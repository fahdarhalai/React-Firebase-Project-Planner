import React from 'react';
import {NavLink} from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <ul className="right">
            <li>
                <NavLink to="/signup">Sign up</NavLink>
            </li>
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
        </ul>
    )
}

export default SignedOutLinks;