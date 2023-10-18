import React from "react";
import PropTypes from 'prop-types';
import { useContext,useState } from "react";
import ContactContext from '../../context/contact/contactContext';
import { CSSTransition} from 'react-transition-group';

const ContactItem =({contact}) =>{
    const contactContext = useContext(ContactContext);

    const [isVisible, setIsVisible] = useState(true);

    const{deleteContact, clearCurrent, setCurrent} = contactContext;
    
    const {id , name, email, phone, type} = contact;
  
    const handleDeleteBox = () => {
        setIsVisible(false);
      };

    const handleBoxExited = () =>{
        
        deleteContact(id);
        clearCurrent();
    }




    return(
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '}
                <span style={{float:'right'}} className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {email && (
                    <li>
                        <i className='fas fa-envelope-open'/>{email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className='fas fa-phone'/>{phone}
                    </li>
                )}
            </ul>
            <p>
                <button className='btn btn-dark btn-sm' onClick={()=>setCurrent(contact)}>Edit</button>
                
                    <CSSTransition in={isVisible} timeout={500} unmountOnExit onExited={()=>  handleBoxExited()}>
                        <button className='btn btn-danger btn-sm' onClick={() => handleDeleteBox()}>Delete</button>
                    </CSSTransition>
                
                
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default ContactItem;