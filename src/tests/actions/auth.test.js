import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth"
import { types } from "../../types/types";

import '@testing-library/jest-dom';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);


describe('Pruebas con las acciones de auth', () => {

    beforeEach( ()=>{
        store = mockStore(initState);
    } )

    test('Login y Logout deben de crear las acciones respectivas', () => {

        const uid = 'ABC123';
        const displayName = 'Bimbo Tostado'

        const actionLogin = login( uid, displayName);

        expect( actionLogin ).toEqual( { type: types.login, payload:{ uid: uid,displayName: displayName } });

        const actionLogout = logout();

        expect( actionLogout ).toEqual( { type: types.logout } );
    })

    test('Debe de realizar la accion => starLogout', async() => {

        await store.dispatch( startLogout() );
        const action = store.getActions();

        expect( action[0] ).toEqual( { type: types.logout} );
        expect( action[1] ).toEqual( { type: types.notesLogoutCleaning } );

    })

    test('Debe de iniciar el startLoginEmailPassword', async() => {

        await store.dispatch( startLoginEmailPassword('test@testing.com','123456') );
        const actions = store.getActions();

        expect( actions[0] ).toEqual( { type: types.uiStartLoading } );
        expect( actions[1] ).toEqual( { type: types.login, payload: { uid:'paspdgvDhLOxEm9jIugYjarj2KV2',displayName: null } } );
        expect( actions[2] ).toEqual( { type: types.uiFinishLoading } );
    })
})