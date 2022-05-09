import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { mount } from "enzyme";
import { Provider } from "react-redux";
import { Sidebar } from "../../../components/journal/Sidebar";
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}) );

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}) )

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{
        uid:'1',
        name:'AG'
    },
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
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <Sidebar /> 
    </Provider>
    );

describe('Pruebas en el componente <Sidebar />', () => {

    test('Debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe de llamar el starLogout', () => {

        wrapper.find('.btn').prop('onClick')();

        expect( startLogout ).toHaveBeenCalled();
    });

    test('Debe de llamar el startNewNote', () => {

        wrapper.find('.journal__new-entry').prop('onClick')();

        expect( startNewNote ).toHaveBeenCalled();
    });
})