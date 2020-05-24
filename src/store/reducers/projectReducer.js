
const initState = {
    projects: [
        {id: "1", title: "Project Title 1", content: "Project content 1"},
        {id: "2", title: "Project Title 2", content: "Project content 2"},
        {id: "3", title: "Project Title 3", content: "Project content 3"}
    ]
}

const projectReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_PROJECT':
            console.log('created project', action.project);
            return state; 
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err);
            return state;
        case 'UPDATE_PROJECT':
            console.log("updated project", action.projectState);
            return state;
        case 'UPDATE_PROJECT_ERROR':
            console.log('update project error', action.err);
            return state;
        default:
            return state;
    }
}

export default projectReducer;