import {TypedUseSelectorHook,useSelector} from 'react-redux';

import { RootState } from 'store/stores';

const useTypedSelector:TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector