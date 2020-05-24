import React, { Component } from 'react'
import {createProject} from '../../store/actions/projectActions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class CreateProject extends Component {
    state = {
        title: "",
        content: "",
        projectState: "active"
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.title != "" && this.state.content != ""){
            this.props.createProject(this.state);
            this.props.history.push('/');
        }
    }

    render() {
        const {auth} = this.props;
        if(!auth.uid){
            return <Redirect to='/login' />
        }
        return (
            <div className="container" style={{marginTop: 70+'px'}}>
                <div className="row valign-wrapper">
                    <div className="col s12 l10 pull-l1">
                        <form onSubmit={this.handleSubmit}>
                            <h5 className="grey-text text-darken-3">Create new Project</h5>
                            <div className="input-field">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="content">Project Content</label>
                                <textarea className="materialize-textarea" id="content" onChange={this.handleChange}></textarea>
                            </div>
                            <div className="input-field">
                                <button className="btn grey darken-3 z-depth-0">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => {
            dispatch(createProject(project));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
