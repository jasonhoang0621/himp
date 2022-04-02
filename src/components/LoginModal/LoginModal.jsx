import React, { useState } from 'react'

import './LoginModal.scss'
import propType from 'prop-types'
import { FaTimes, FaEnvelope, FaLock } from 'react-icons/fa'

const LoginModal = (props) => {
    const [isLogin, setIsLogin] = useState(false)

    return (
        <div className="login_modal" onClick={() => { props.closeModal(false); }}>
            <div className="modal_container">
                <div className="modal_warper" onClick={(e) => e.stopPropagation()}>
                    <div className="modal_close" onClick={() => { props.closeModal(false); }}>
                        <FaTimes />
                    </div>
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
                            <div className="modal_form_forget">
                                Forget password?
                            </div>
                            {/* <div className="modal_form_submit">
                                <Button className="modal_btn">Login</Button>
                            </div> */}
                        </div>
                    </div>

                    <div className="modal_footer">
                        <div className="modal_footer_section modal_footer_login">
                            <div className="">Login</div>
                        </div>
                        <div className="modal_footer_section modal_footer_register">
                            <div className="">Register</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

const RegisterModal = (props) => {
    return (
        <div className="login_modal" onClick={() => { props.closeModal(false); }}>
            <div className="login_modal_container">
                <div className="login_modal_warper" onClick={(e) => e.stopPropagation()}>
                    <div className="login_modal_close" onClick={() => { props.closeModal(false); }}>
                        <FaTimes />
                    </div>
                    <div className="login_modal_header">
                        <h2>Login</h2>
                    </div>

                    <div className="login_modal_body">
                        <div className="login_modal_form">
                            <div className="login_modal_form_group">
                                <FaEnvelope className='login_modal_form_group_icon' />
                                <input type="email" placeholder='Email' />
                            </div>
                            <div className="login_modal_form_group">
                                <FaLock className='login_modal_form_group_icon' />
                                <input type="password" placeholder='Password' />
                            </div>
                            <div className="login_modal_form_forget">
                                Forget password?
                            </div>
                            {/* <div className="login_modal_form_submit">
                                <Button className="login_modal_btn">Login</Button>
                            </div> */}
                        </div>
                    </div>

                    <div className="login_modal_footer">
                        <div className="login_modal_footer_section modal_footer_login">
                            <div className="">Login</div>
                        </div>
                        <div className="login_modal_footer_section modal_footer_register">
                            <div className="">Register</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

LoginModal.propType = {
    className: propType.string,
    onClick: propType.func,
    closeModal: propType.func
}

export default LoginModal