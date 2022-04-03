import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaUser, FaTimes } from 'react-icons/fa'
import './LoggedInModal.scss'


const form = {
    information: 1,
    password: 2,
}

const LoggedInModal = (props) => {
    const [formDisplay, setFormDisplay] = useState(form.information)

    return (
        <>
            <div className="modal" onClick={() => { props.closeModal(false); }}>
                <div className="modal_container">
                    <div className="modal_warper" onClick={(e) => e.stopPropagation()}>
                        <div className="modal_close" onClick={() => { props.closeModal(false); }}>
                            <FaTimes />
                        </div>

                        {formDisplay === 1 && <InformationModal setFormDisplay={setFormDisplay} closeModal={props.closeModal} />}
                        {formDisplay === 2 && <RegisterModal closeModal={props.closeModal} />}

                        {(formDisplay === 1 || formDisplay === 2) &&
                            <div className="modal_footer">
                                <div className="modal_footer_section modal_footer_login" onClick={() => setFormDisplay(1)}>
                                    <div className="">Information</div>
                                </div>
                                <div className="modal_footer_section modal_footer_register" onClick={() => setFormDisplay(2)}>
                                    <div className="">Password</div>
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
                        <FaUser className='modal_form_group_icon' />
                        <input type="text" placeholder='Name' />
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
                <h2>Change password</h2>
            </div>

            <div className="modal_body">
                <div className="modal_form">
                    <div className="modal_form_group">
                        <FaLock className='modal_form_group_icon' />
                        <input type="password" placeholder='Current password' required />
                    </div>
                    <div className="modal_form_group">
                        <FaLock className='modal_form_group_icon' />
                        <input type="password" placeholder='New password' required />
                    </div>
                    <div className="modal_form_group">
                        <FaLock className='modal_form_group_icon' />
                        <input type="password" placeholder='Retype password' required />
                    </div>

                </div >
            </div >
        </div >
    )
}


export default LoggedInModal