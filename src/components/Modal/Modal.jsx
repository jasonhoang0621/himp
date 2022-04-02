
import propType from 'prop-types'
import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaTimes, FaUser, FaAngleLeft } from 'react-icons/fa'
import './Modal.scss'

const form = {
    login: 1,
    register: 2,
    forget: 3
}

const Modal = (props) => {
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

                        {formDisplay === 1 && <LoginModal setFormDisplay={setFormDisplay} />}
                        {formDisplay === 2 && <RegisterModal />}
                        {formDisplay === 3 && <ForgetPasswordModal />}

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

const LoginModal = (props) => {
    return (
        <div className='modal_content'>
            <div className="modal_header">
                <h2>Login</h2>
            </div>

            <div className="modal_body">
                <div className="modal_form">
                    <div className="modal_form_group">
                        <FaEnvelope className='modal_form_group_icon' />
                        <input type="email" placeholder='Email' />
                    </div>
                    <div className="modal_form_group">
                        <FaLock className='modal_form_group_icon' />
                        <input type="password" placeholder='Password' />
                    </div>
                    <div className="modal_form_forget" onClick={() => props.setFormDisplay(3)}>
                        Forget password?
                    </div>
                </div>
            </div>
        </div>
    )
}

const RegisterModal = () => {
    return (
        <div className='modal_content'>
            <div className="modal_header">
                <h2>Register</h2>
            </div>

            <div className="modal_body">
                <div className="modal_form">
                    <div className="modal_form_group">
                        <FaEnvelope className='modal_form_group_icon' />
                        <input type="email" placeholder='Email' />
                    </div>
                    <div className="modal_form_group">
                        <FaLock className='modal_form_group_icon' />
                        <input type="password" placeholder='Password' />
                    </div>
                    <div className="modal_form_group">
                        <FaUser className='modal_form_group_icon' />
                        <input type="text" placeholder='Name' />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ForgetPasswordModal = () => {
    return (
        <div className='modal_content'>
            <div className="modal_header">
                <h2>Forget Password</h2>
            </div>

            <div className="modal_body forget_modal_body">
                <div className="modal_form">
                    <div className="">Receive new password:</div>
                    <div className="modal_form_group">
                        <FaEnvelope className='modal_form_group_icon' />
                        <input type="email" placeholder='Email' />
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propType = {
    closeModal: propType.func
}

LoginModal.propType = {
    setFormDisplay: propType.func
}

export default Modal