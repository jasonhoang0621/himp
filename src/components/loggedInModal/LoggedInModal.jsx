import React, { useState } from 'react'
import { FaLock, FaUser, FaTimes } from 'react-icons/fa'
import './LoggedInModal.scss'


const form = {
    information: 1,
    password: 2,
}

const LoggedInModal = (props) => {
    const [formDisplay, setFormDisplay] = useState(props.form || form.information)

    return (
        <>
            <div className="logged_modal" onClick={() => { props.closeModal(false); }}>
                <div className="logged_modal_container">
                    <div className="logged_modal_wrapper" onClick={(e) => e.stopPropagation()}>
                        <div className="logged_modal_close" onClick={() => { props.closeModal(false); }}>
                            <FaTimes />
                        </div>

                        {formDisplay === 1 && <InformationModal setFormDisplay={setFormDisplay} closeModal={props.closeModal} />}
                        {formDisplay === 2 && <RegisterModal closeModal={props.closeModal} />}

                        {(formDisplay === 1 || formDisplay === 2) &&
                            <div className="logged_modal_footer">
                                <div className="logged_modal_footer_section logged_modal_footer_information" onClick={() => setFormDisplay(1)}>
                                    <div className="">Information</div>
                                </div>
                                <div className="logged_modal_footer_section logged_modal_footer_password" onClick={() => setFormDisplay(2)}>
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
    const [change, setChange] = useState(false)

    return (
        <div className='logged_modal_content'>
            <div className="logged_modal_header">
                <h2>Information</h2>
            </div>

            <div className="logged_modal_body">
                <div className="logged_modal_form">
                    {change &&
                        <div className="logged_modal_form_input">
                            <div className="logged_modal_form_group" style={{ margin: 0 }}>
                                <FaUser className='logged_modal_form_group_icon' />
                                <input type="text" placeholder='Name' />
                            </div>
                            <div className="logged_modal_form_info_change" onClick={() => setChange(!change)}>
                                {change ? 'save' : 'change'}
                            </div>
                        </div>
                    }

                    {!change &&
                        <div className="logged_modal_form_info">
                            <div className="logged_modal_form_info_content">
                                <span className='logged_modal_form_info_content_label'>Name:</span> Nhan Hoang
                            </div>
                            <div className="logged_modal_form_info_change" onClick={() => setChange(!change)}>
                                {change ? 'save' : 'change'}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const RegisterModal = () => {
    return (
        <div className='logged_modal_content'>
            <div className="logged_modal_header">
                <h2>Change password</h2>
            </div>

            <div className="logged_modal_body">
                <div className="logged_modal_form">
                    <div className="logged_modal_form_group">
                        <FaLock className='logged_modal_form_group_icon' />
                        <input type="password" placeholder='Current password' required />
                    </div>
                    <div className="logged_modal_form_group">
                        <FaLock className='logged_modal_form_group_icon' />
                        <input type="password" placeholder='New password' required />
                    </div>
                    <div className="logged_modal_form_group">
                        <FaLock className='logged_modal_form_group_icon' />
                        <input type="password" placeholder='Retype password' required />
                    </div>

                </div >
            </div >
        </div >
    )
}


export default LoggedInModal