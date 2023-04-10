import { createGlobalState } from 'react-hooks-global-state';

const {setGlobalState, useGlobalState} = new createGlobalState({
    likes: []
});


export {useGlobalState, setGlobalState}
