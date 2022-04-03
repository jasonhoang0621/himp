import propType from 'prop-types'
import React, { useState } from 'react'
import { FaAngleLeft, FaEnvelope, FaLock, FaTimes, FaUser } from 'react-icons/fa'
import { Forgot, Login, SignUp } from '../../firebase/firebase-authentication'
import './Modal.scss'

const form = {
    login: 1,
    register: 2,
    forget: 3
}

const Modal = (props) => {
    const [formDisplay, setFormDisplay] = useState(form.login)
    const [warn, setWarn] = useState(true)
    const [message, setMessage] = useState(true)

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

                        {formDisplay === 1 && <LoginModal setFormDisplay={setFormDisplay} closeModal={props.closeModal} warn={setWarn} />}
                        {formDisplay === 2 && <RegisterModal closeModal={props.closeModal} warn={setWarn} />}
                        {formDisplay === 3 && <ForgetPasswordModal warn={setWarn} setFormDisplay={setFormDisplay} mess={setMessage} />}

                        <div className="modal_error_message" hidden={warn}>
                            Incorrect password or email
                        </div>
                        <div className="modal_message" hidden={message}>
                            Please check your email
                        </div>

                        {(formDisplay === 1 || formDisplay === 2) &&
                            <div className="modal_footer">
                                <div className="modal_footer_section modal_footer_login" onClick={() => setFormDisplay(1)} >
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
    const handleEnter = async (keyCode, email, password) => {
        if (keyCode === 13) {
            const user = await Login(email, password)
            if (user === null) {
                props.warn(false)
                setTimeout(() => {
                    props.warn(true)
                }, 1500)

            } else {
                props.closeModal(false);
            }
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
                            handleEnter(e.keyCode, email, password)
                        }} type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="modal_form_group">
                        <FaLock className='modal_form_group_icon' />
                        <input onKeyUp={e => { handleEnter(e.keyCode, email, password) }} type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
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
    const [confirmPass, setConfirm] = useState('')
    const handleEnter = async (keyCode, email, password, name, confirmPass) => {
        if (keyCode === 13) {

            if (confirmPass === password) {

                const user = await SignUp(email, password, name)
                if (user === null) {
                    props.warn(false)
                    setTimeout(() => {
                        props.warn(true)
                    }, 1500)
                } else {
                    props.closeModal(false);
                }
            }
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
                        <input type="email" placeholder='Email' onKeyUp={e => { handleEnter(e.keyCode, email, password, name, confirmPass) }} value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="modal_form_group">
                        <FaLock className='modal_form_group_icon' />
                        <input type="password" placeholder='Password' value={password} onKeyUp={e => { handleEnter(e.keyCode, email, password, name, confirmPass) }} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="modal_form_group">
                        <FaLock className='modal_form_group_icon' />
                        <input type="password" placeholder='Confirm your password' value={confirmPass} onKeyUp={e => { handleEnter(e.keyCode, email, password, name, confirmPass) }} onChange={e => setConfirm(e.target.value)} required />
                    </div>
                    <div className="modal_form_group">
                        <FaUser className='modal_form_group_icon' />
                        <input type="text" placeholder='Name' value={name} onKeyUp={e => { handleEnter(e.keyCode, email, password, name, confirmPass) }} onChange={e => setName(e.target.value)} required />
                    </div>

                </div >
            </div >
        </div >
    )
}

const ForgetPasswordModal = (props) => {
    const [email, setEmail] = useState('')
    const handleEnter = async (keyCode, email) => {
        if (keyCode === 13) {
            const user = await Forgot(email)
            console.log()
            if (user === null) {
                props.warn(false)
                setTimeout(() => {
                    props.warn(true)
                }, 1500)
            }
            else {
                props.setFormDisplay(1)
                props.mess(false)
                setTimeout(() => {
                    props.mess(true)
                }, 2500)
            }
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
                        <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} onKeyUp={e => { handleEnter(e.keyCode, email) }} />
                    </div >
                </div >
            </div >
        </div >
    )
}

Modal.propType = {
    closeModal: propType.func
}

LoginModal.propType = {
    setFormDisplay: propType.func,
    closeModal: propType.func,
    warn: propType.func
}
RegisterModal.propType = {
    closeModal: propType.func,
    warn: propType.func
}
ForgetPasswordModal.propType = {
    setFormDisplay: propType.func,
    warn: propType.func,
    mess: propType.func,
}

export default Modal