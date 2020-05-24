import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';

class SignedInLinks extends Component {
    state = {
        userdropdown_btn: {
            hover: false,
            click: false
        },
        notif_btn: {
            hover: false,
            click: false
        }
    }

    componentDidMount(){
        const M = window.M;
        var elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems, {});
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (e) => {
        try{
            let cond1 = e.target.id != 'dropdown-container';
            let cond2 = e.target.parentNode.id != 'dropdown-container';
            let cond3 = e.target.parentNode.parentNode.id != 'dropdown-container';
            let cond4 = e.target.parentNode.parentNode.parentNode.id != 'dropdown-container';
            let cond5 = e.target.parentNode.parentNode.parentNode.parentNode.id != 'dropdown-container';
            let cond6 = e.target.id != 'notif-btn';
            let cond7 = e.target.id != 'userdropdown-btn';
            let cond8 = e.target.tagName != 'I';

            if(cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8){
                this.setState({
                    ...this.state,
                    userdropdown_btn:{
                        ...this.state.userdropdown_btn,
                        click: false
                    },
                    notif_btn:{
                        ...this.state.notif_btn,
                        click: false
                    }
                })
            }
        }catch(exc){
            this.setState({
                ...this.state,
                userdropdown_btn:{
                    ...this.state.userdropdown_btn,
                    click: false
                },
                notif_btn:{
                    ...this.state.notif_btn,
                    click: false
                }
            })
        }
    }

    handleClick = (e) => {

        if(e.target.id == 'notif-btn' || e.target.parentNode.id == 'notif-btn'){
            const click = !this.state.notif_btn.click;
            this.setState({
                ...this.state,
                userdropdown_btn:{
                    ...this.state.userdropdown_btn,
                    click: false
                },
                notif_btn:{
                    ...this.state.notif_btn,
                    click
                }
            })
        }else if(e.target.id == 'userdropdown-btn' || e.target.parentNode.id == 'userdropdown-btn'){
            const click = !this.state.userdropdown_btn.click;
            this.setState({
                ...this.state,
                userdropdown_btn:{
                    ...this.state.userdropdown_btn,
                    click
                },
                notif_btn:{
                    ...this.state.notif_btn,
                    click: false
                }
            })
        }
    }

    render(){
        let dropdown = null;
        if(this.state.notif_btn.click){
            dropdown = (
                <div className="dropdown-menu" id="notification-container" onClick={this.handleClickInside}>
                    <div className="card blue-grey lighten-5">
                        <i className="fa fa-sort-up"></i>
                        <div className="card-content">
                            <span className="card-title">Notifications</span>
                            <p></p>
                        </div>
                    </div>
                </div>
            );
        }else if(this.state.userdropdown_btn.click){
            dropdown = (
                <div className="dropdown-menu" id="userdropdown-container" onClick={this.handleClickInside}>
                    <div className="card blue-grey lighten-5">
                        <i className="fa fa-sort-up"></i>
                        <div className="card-content">
                            <span className="card-title">{this.props.profile.firstName} {this.props.profile.lastName}</span>
                            <NavLink to="/create">New Project</NavLink>
                        </div>
                        <div className="card-action">
                            <a onClick={this.props.signOut} style={{"width": "100%"}}>Log out</a>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <ul className="right">
                <li>
                    <a className="btn btn-floating" id="notif-btn" onClick={this.handleClick} ><i className="fa fa-bell" style={{color: this.state.notif_btn.hover ? "rgb(245, 245, 247)":"rgb(70, 70, 70)"}}  onClick={this.handleClick}></i></a>
                </li>
                <li>
                    <a className="btn btn-floating" id="userdropdown-btn" onClick={this.handleClick} ><i className="fa fa-user" style={{color: this.state.userdropdown_btn.hover ? "rgb(245, 245, 247)":"rgb(70, 70, 70)"}}  onClick={this.handleClick}></i></a>
                </li>
                <div className="row dropdown-container" id='dropdown-container'>
                    {dropdown}
                </div>
            </ul>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);