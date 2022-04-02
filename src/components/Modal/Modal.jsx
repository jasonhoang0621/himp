
import propType from 'prop-types'
import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaTimes, FaUser, FaAngleLeft } from 'react-icons/fa'
import './Modal.scss'
import { SignUp, Login, Forgot } from '../../firebase/firebase-authentication'


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

                        {formDisplay === 1 && <LoginModal setFormDisplay={setFormDisplay} closeModal={props.closeModal} />}
                        {formDisplay === 2 && <RegisterModal closeModal={props.closeModal} />}
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
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEnter = async (email, password) => {
        console.log(email)
        console.log(password)
        const user = await Login(email, password)
        if (user === null) {

        } else {
            props.closeModal(false);
        }
    }
    return (
        <div className='modal_content'>
            <div className="modal_header">
                <h2>Login</h2>
            </div>

            <div className="modal_body">
                <div className="modal_form">
                    <div className="modal_form_group">
                        <FaEnvelope className='modal_form_group_icon' />
                        <input onKeyUp={e => {
                            if (e.keyCode === 13)
                                handleEnter(email, password)
                        }} type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="modal_form_group">
                        <FaLock className='modal_form_group_icon' />
                        <input onKeyUp={e => {
                            if (e.keyCode === 13)
                                handleEnter(email, password)
                        }} type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="modal_form_forget" onClick={() => props.setFormDisplay(3)}>
                        Forget password?
                    </div>
                </div>
            </div>
        </div>
    )

}

const RegisterModal = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    // const [confirmPass, setConfirm] = useState('')
    const handleEnter = async (email, password, name, confirmPass) => {
        const user = await SignUp(email, password, name)
        if (user === null) {

        } else {
            console.log(user)
            props.closeModal(false);
        }
    }
    return (
        <div className='modal_content'>
            <div className="modal_header">
                <h2>Register</h2>
            </div>

            <div className="modal_body">
                <div className="modal_form">
                    <div className="modal_form_group">
                        <FaEnvelope className='modal_form_group_icon' />
                        <input type="email" placeholder='Email' onKeyUp={e => {
                            if (e.keyCode === 13)
                                handleEnter(email, password, name)
                        }} value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="modal_form_group">
                        <FaLock className='modal_form_group_icon' />
                        <input type="password" placeholder='Password' value={password} onKeyUp={
                            e => {
                                if (e.keyCode === 13)
                                    handleEnter(email, password, name)
                            }} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="modal_form_group">
                        <FaUser className='modal_form_group_icon' />
                        <input type="text" placeholder='Name' value={name} onKeyUp={e => {
                            if (e.keyCode === 13)
                                handleEnter(email, password, name)
                        }} onChange={e => setName(e.target.value)} required />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ForgetPasswordModal = () => {
    const [email, setEmail] = useState('')
    const handleEnter = async (email) => {
        const user = await Forgot(email)
        if (user === null) {

        } else {

        }
    }
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
                        <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} onKeyUp={e => {
                            if (e.keyCode === 13)
                                handleEnter(email)
                        }} />
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
    setFormDisplay: propType.func,
    closeModal: propType.func
}
RegisterModal.propType = {
    closeModal: propType.func
}

export default Modal