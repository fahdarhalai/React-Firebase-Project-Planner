export const createProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        })
        .then(() => {
            dispatch({
                type: 'CREATE_PROJECT',
                project
            })
        })
        .catch((err) => {
            dispatch({
                type: 'CREATE_PROJECT_ERROR',
                err
            })
        })
    }
};

export const updateProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        console.log(project);
        firestore.collection('projects').doc(project.id).update({
            projectState: project.projectState
        })
        .then(() => {
            dispatch({
                type: 'UPDATE_PROJECT',
                projectState: project.projectState
            })
        })
        .catch((err) => {
            dispatch({
                type: 'UPDATE_PROJECT_ERROR',
                err
            })
        })
    }
}