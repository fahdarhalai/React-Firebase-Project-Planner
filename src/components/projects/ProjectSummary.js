import React from 'react';
import moment from 'moment'

const ProjectSummary = ({project, colors}) => {
    const rand = Math.floor(Math.random()*colors.length);

    return (
        <div className={"card z-depth-0 project-summary "+colors[rand]}>
            <div className="card-content grey-text text-darken-3 z-depth-1">
                <span className="card-title" style={{"fontWeight": "350"}}>{project.title}</span>
                <p>Posted By: {project.authorFirstName} {project.authorLastName}</p>
                <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    )
}

export default ProjectSummary;