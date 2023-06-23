import {
    ADD_PREORDER_SUCCESS,
    ADD_PREORDER_FAIL,
    DELETE_PREORDER_SUCCESS,
    DELETE_PREORDER_FAIL,
    GET_PREORDER_SUCCESS,
    GET_PREORDER_FAIL
} from '../actions/types';

const initialState = {
    preorder: null,
    preorder_id: null
};

export default function Preorders(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case
            ADD_PREORDER_SUCCESS,
            ADD_PREORDER_FAIL:
            return {
                ...state,
            }
        case GET_PREORDER_SUCCESS:
            return {
                ...state,
                preorder: payload.preorder
            }
        case GET_PREORDER_FAIL:
            return {
                ...state,
            }
        /*case 
            DELETE_PREORDER_SUCCESS,
            DELETE_PREORDER_FAIL:
            return {
                ...state,
            }*/
        default:
            return state;
    }
}
