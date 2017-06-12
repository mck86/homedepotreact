import { FETCH_FIXER } from '../actions/index';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_FIXER:
            return action.payload.data;
    }
    return state;
}
