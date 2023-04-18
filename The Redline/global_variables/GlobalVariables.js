import { createGlobalState } from 'react-hooks-global-state';

const {setGlobalState, useGlobalState} = new createGlobalState({
    likes: [], //favorites list for each user
    iconPath: "default" //profile image chosen by each user
});


export {useGlobalState, setGlobalState}
