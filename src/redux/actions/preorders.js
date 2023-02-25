import axios from 'axios';
import {
    ADD_PREORDER_SUCCESS,
    ADD_PREORDER_FAIL,
    DELETE_PREORDER_SUCCESS,
    DELETE_PREORDER_FAIL,
    GET_PREORDER_SUCCESS,
    GET_PREORDER_FAIL,
    GET_PREORDER_DETAIL_SUCCESS,
    GET_PREORDER_DETAIL_FAIL
} from './types';
import { setAlert } from './alert';


export const delete_preorder = id => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            }
        };

        const body = JSON.stringify({
            id
        });

        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/preorders/deletepreorder`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_PREORDER_DETAIL_SUCCESS,
                    payload: res.data
                });
                dispatch(setAlert('La preorden se ha eliminado satisfactoriamente', 'green'));
            } else {
                dispatch({
                    type: GET_PREORDER_DETAIL_FAIL
                });
                dispatch(setAlert('Ha ocurrido un error al elimianr la preorden', 'green'));
            }
        } catch (err) {
            dispatch({
                type: GET_PREORDER_DETAIL_FAIL
            });
        }
    }
}

export const get_preorder_detail = identification => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/preorders/getpreorder/${identification}`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_PREORDER_DETAIL_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_PREORDER_DETAIL_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: GET_PREORDER_DETAIL_FAIL
            });
        }
    }
}

export const add_preorder_detail = (identification_types, identification, rif_types, rif, full_name, address_line, city, state_province_region, telephone_number, whatsapp_number, postal_zip_code, transaction_type, shipping_branch) => async dispatch => {
    if (localStorage.getItem('access')) {
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };

        const body = JSON.stringify({
            identification_types,
            identification,
            rif_types,
            rif,
            full_name,
            address_line,
            city,
            state_province_region,
            telephone_number,
            whatsapp_number,
            postal_zip_code,
            transaction_type,
            shipping_branch
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/preorders/makepreorder`, body, config);
            if (res.status === 201) {
                dispatch({
                    type: ADD_PREORDER_SUCCESS,
                });
                dispatch(setAlert('El pedido se ha cargado satisfactoriamente', 'green'));
            } else if (res.status === 404) {
                dispatch({
                    type: ADD_PREORDER_FAIL,
                    payload: res.data
                });
                dispatch(setAlert('HOla', 'red'));
            } else if (res.status === 500) {
                dispatch({
                    type: ADD_PREORDER_FAIL,
                });
                dispatch(setAlert('Error al cargar el pedido, intente mas tarde', 'red'));
            }

        } catch (err) {
            dispatch({
                type: ADD_PREORDER_FAIL,
            });
            dispatch(setAlert('Ha ocurrido un error cargando la información, intente más tarde', 'red'));
            console.log(err)
        }
    }

}