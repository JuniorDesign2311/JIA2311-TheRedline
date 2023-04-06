import { GlobalStore } from 'react-native-global-state-hooks';

// initialize your store with the default value of the same.
const likeStore = new GlobalStore(0);

// get the hook
export const useLikeGlobal = likeStore.getHook();

// inside your component just call...
const [likes, setLikes] = useLikeGlobal(); // no paremeters are needed since this is a global store

export const [getLikes, sendLikes] = likeStore.getHookDecoupled();