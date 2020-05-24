import React, { Component } from 'react'
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import moment from 'moment';
import {updateProject} from '../../store/actions/projectActions';

class ProjectDetails extends Component {
    state = {
        projectState: "",
        update: false
    }

    handleClick = (e) => {
        this.setState({
            id: this.props.match.params.id,
            ...this.props.project,
            projectState: e.target.id,
            update: true
        });
    }

    componentDidUpdate(){
        if(this.state.update){
            this.setState({
                ...this.state,
                update: false
            })
            this.props.updateProject(this.state);
        }
    }

    render(){
        const {project, auth} = this.props;
        if(!auth.uid){
            return <Redirect to='/login' />
        }

        if(project){
            let controlBtn = "";
            if(project.projectState == "inactive"){
                controlBtn = (
                    <div className="row">
                        <a className="btn blue" style={{"width": "120px", "marginRight": "5px"}} id="active" onClick={this.handleClick}>Active</a>
                        <a className="btn" style={{"width": "120px", "marginLeft": "5px"}} id="completed" onClick={this.handleClick}>Completed</a>
                    </div>
                )
            }else if(project.projectState == "active"){
                controlBtn = (
                    <div className="row">
                        <a className="btn grey" style={{"width": "120px", "marginLeft": "5px"}} id="inactive" onClick={this.handleClick}>Inactive</a>
                        <a className="btn" style={{"width": "120px", "marginLeft": "5px"}} id="completed" onClick={this.handleClick}>Completed</a>
                    </div>
                )
            }
            return(
                <div className="container section project-details">
                    <div className="row valign-wrapper">
                        <div className="col s12 m8 pull-m2 center-align card z-depth-0" style={{backgroundColor: "rgb(245, 245, 247)"}}>
                            <div className="card-content">
                                <span className="card-title">{project.title}</span>
                                <p>{project.content}</p>
                            </div>
                            {controlBtn}
                            <div className="card-action gret lighten-4 grey-text">
                                <div>Currently: {project.projectState}</div>
                                <div>Posted By: {project.authorFirstName} {project.authorLastName}</div>
                                <div>{moment(project.createdAt.toDate()).calendar()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else {
            return (
                <div className="container center">
                    <p>No projects yet. Add a new project ?</p>
                </div>
            )
        }
    }
    
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
        project,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateProject: (project) => dispatch(updateProject(project))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'projects'}
    ])
)(ProjectDetails);
