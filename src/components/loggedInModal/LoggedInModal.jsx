import React from 'react'

import './LoggedInModal.scss'
import { FaEnvelope, FaUser } from 'react-icons/fa'

const form = {
    information: 1,
    password: 2,
}

const LoggedInModal = (props) => {
    const [formDisplay, setFormDisplay] = useState(form.login)

    return (
        <>
            <div className="modal" onClick={() => { props.closeModal(false); }}>
                <div className="modal_container">
                    <div className="modal_warper" onClick={(e) => e.stopPropagation()}>
                        <div className="modal_close" onClick={() => { props.closeModal(false); }}>
                            <FaTimes />
                        </div>
                        {formDisplay === 3 &&
                            <div className="modal_back" onClick={() => setFormDisplay(1)}>
                                <FaAngleLeft />
                            </div>}

                        {formDisplay === 1 && <LoginModal setFormDisplay={setFormDisplay} closeModal={props.closeModal} />}
                        {formDisplay === 2 && <RegisterModal closeModal={props.closeModal} />}

                        <div className="modal_error_message">
                            Incorrect password or email
                        </div>

                        {(formDisplay === 1 || formDisplay === 2) &&
                            <div className="modal_footer">
                                <div className="modal_footer_section modal_footer_login" onClick={() => setFormDisplay(1)}>
                                    <div className="">Login</div>
                                </div>
                                <div className="modal_footer_section modal_footer_register" onClick={() => setFormDisplay(2)}>
                                    <div className="">Register</div>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

const InformationModal = () => {
    return (
        <div className='modal_content'>
            <div className="modal_header">
                <h2>Information</h2>
            </div>

            <div className="modal_body">
                <div className="modal_form">
                    <div className="modal_form_group">
                        <FaEnvelope className='modal_form_group_icon' />
                        <input onKeyUp={e => {
                            handleEnter(e.keyCode, email, password)
                        }} type="email" placeholder='Email' />
                    </div>
                    <div className="modal_form_group">
                        <FaUser className='modal_form_group_icon' />
                        <input type="Name" placeholder='text' value={password} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoggedInModal