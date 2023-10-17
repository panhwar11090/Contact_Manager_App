import React, {useReducer} from 'react';
import {v4 as uuid} from 'uuid'
import  contactContext  from './contactContext';
import  contactReducer  from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = props =>{
    const initialState ={
        contacts:[
            {
                id:1,
                name:'Huzaifa',
                email: 'huzaifa@gmail.com',
                phone: '111-222-333',
                type: 'personal'

            },
            {
                id:2,
                name:'Ali',
                email: 'ali@gmail.com',
                phone: '000-222-333',
                type: 'personal'

            },
            {
                id:3,
                name:'Ahsan',
                email: 'ahsan@gmail.com',
                phone: '555-222-33344',
                type: 'brother'

            },
        ],
        current: null,
        filtered: null
    }
    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add Contact

    const addContact = contact =>{
        contact.id = uuid();
        dispatch({type: ADD_CONTACT, payload: contact})
    }

    // Delete Contact

    const deleteContact = id =>{
        dispatch({type: DELETE_CONTACT, payload: id});
    };

    // Set Current Contact
    const setCurrent = contact =>{
        dispatch({type: SET_CURRENT, payload: contact});
    };
    // Clear Current Contact
    const clearCurrent = ()=>{
        dispatch({type: CLEAR_CURRENT});
    }
    // Update Contact
    const updateContact = contact =>{
        dispatch({type: UPDATE_CONTACT, payload: contact})
    }
    
    // Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }
    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }
    return(
        <contactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter,
            }}
        >
            {props.children}
           
        </contactContext.Provider>
    )
}

export default ContactState;