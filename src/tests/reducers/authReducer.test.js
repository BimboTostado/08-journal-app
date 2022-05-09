import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";

describe('Pruebas en el authReducer', () => {

    test('Debe de realizar el login', () => {
        const initialState = {};

        const action = {
            type: types.login,
            payload:{
                uid: 'abc',
                displayName: 'Pancito'
            }
        }

        const state = authReducer( initialState, action );

        expect( state ).toEqual({ uid: 'abc', name: 'Pancito' });
    });

    test('Debe de realizar el logout', () => {
        const initialState = {
            uid: 'abc',
            name: 'Pancito'
        };

        const action = {
            type: types.logout
        }

        const state = authReducer( initialState, action );

        expect( state ).toEqual({ });
    });

    test('Debe de retornar el estado inicial => estado invalido', () => {
        const initialState = {
            uid: 'abc',
            name: 'Pancito'
        };

        const action = {
            type: 'invalid state'
        }

        const state = authReducer( initialState, action );

        expect( state ).toEqual( initialState );
    })
})