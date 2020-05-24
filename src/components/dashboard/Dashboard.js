import React, {Component} from 'react';
import ProjectList from '../projects/ProjectList';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import Home from './Home';

class Dashboard extends Component{
    render() {
        const {auth} = this.props;
        let {projects} = this.props;
        
        projects = projects ? projects.filter((project) => {
            return project.authorId === auth.uid;
        }) : null;

        let activeProjects = projects ? projects.filter(project => {
            return project.projectState === "active"
        }) : null;

        let inactiveProjects = projects ? projects.filter(project => {
            return project.projectState === "inactive"
        }) : null;

        let completedProjects = projects ? projects.filter(project => {
            return project.projectState === "completed"
        }) : null;

        if(!auth.uid){
            if(this.props.match.path=='/dashboard'){
                this.props.history.push("/");
            }
            return <Home />
        }
        
        const colors = ["pink lighten-4", "blue lighten-4", "indigo lighten-4", "deep-purple lighten-4", "light-blue lighten-4", "cyan lighten-3", "green lighten-3", "green accent-2", "amber lighten-4", "yellow lighten-2", "lime lighten-3", "teal lighten-4", "purple lighten-4", "red lighten-4"]
        const color = ["blue-grey lighten-5"]

        return (
            <div className="container dashboard">
                <div className="row">
                    <div className="col s12 m4">
                        <h6 className="center-align">Active</h6>
                        <ProjectList colors={colors} projects={activeProjects} />
                    </div>
                    <div className="col s12 m4">
                        <h6 className="center-align">Completed</h6>
                        <ProjectList colors={colors} projects={completedProjects} />
                    </div>
                    <div className="col s12 m4">
                        <h6 className="center-align">Inactive</h6>
                        <ProjectList colors={color} projects={inactiveProjects} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    })
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects'}
    ])
)(Dashboard);