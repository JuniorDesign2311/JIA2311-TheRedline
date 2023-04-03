import { GlobalStore } from 'react-native-global-state-hooks';

// initialize your store with the default value of the same.
const countStore = new GlobalStore([]);

// get the hook
export const useLikesGlobal = countStore.getHook();

// inside your component just call...
const [likes, setLikes] = useLikesGlobal(); // no paremeters are needed since this is a global store