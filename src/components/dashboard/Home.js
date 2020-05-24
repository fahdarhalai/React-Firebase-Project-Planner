import React from 'react';
import bg from '../../images/bg.jpg';
import {Link} from 'react-router-dom';

const Home = (props) => {
    return (
        <div className="container home">
            <img src={bg} alt="Background" id="bg-image" />
            <div className="row content">
                <div className="col s12 m6 l5">
                    <h2>Welcome <br/>to ProPlanner.</h2>
                    <p>Become a ProPlanner today and do more with less.</p>
                    <Link to='/signup'>
                        <button className="btn waves-effect waves-light">SIGN UP
                            <i className="material-icons right">send</i>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;