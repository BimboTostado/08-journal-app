import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import React from 'react';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{},
    ui:{
        loading: false,
        msgError: null
    },
    notes:{
        notes: [],
        active: null
    }
};

let store = mockStore( initState );
//store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter >
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
    );

describe('Pruebas en <LoginScreen />', () => {

    /*beforeEach( () => {
        store = mockStore( initState );
    } )*/

    test('Debe de hacer match con el Snapshoot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe de hacer el dispatch de la acción respectiva', () => {
        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change', {
            target:{
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();

        expect( actions[0] ).toEqual( { type: types.uiSetError, payload: 'name is required' } ); 
    });

    test('Debe de mostrar la caja de alarta con el error' , () => {
        const initState = {
            auth:{},
            ui:{
                loading: false,
                msgError: 'email is no valid'
            },
            notes:{
                notes: [],
                active: null
            }
        };
        
        const store = mockStore( initState );       
        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter >
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect( wrapper.find('.auth__alert-error').exists() ).toBe( true );
        expect( wrapper.find('.auth__alert-error').text().trim() ).toEqual( initState.ui.msgError );
    })
})