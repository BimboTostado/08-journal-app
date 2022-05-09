import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import React from "react";
import { mount } from "enzyme"
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import { firebase } from '../../firebase/firebase-config';



jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}) );


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{},
    ui:{
        loading: false,
        msgError: null
    },
    notes:{
        active:{
            id:'ABC',
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en el componente <AppRouter />', () => {

    test('Debe de llamar el login si estoy autenticado', async() => {

        let user;

        await act( async() => {

            const authCredencial = await firebase.auth().signInWithEmailAndPassword('test@testing.com','123456');

            user = authCredencial.user;

            const wrapper = mount( 
                <Provider store={ store }>
                    <MemoryRouter >
                        <AppRouter /> 
                    </MemoryRouter>
                </Provider>
            );
        });
        
        expect( login ).toHaveBeenCalledWith( 'paspdgvDhLOxEm9jIugYjarj2KV2', null );
    })
})