import React, { useState, useRef } from 'react'
import { FaLock, FaUser, FaTimes } from 'react-icons/fa'
import './LoggedInModal.scss'
import auth,{UpdateProfile,UpdatePassword} from '../../firebase/firebase-authentication'



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
                                <div className="logged_modal_footer_section logged_modal_footer_password" onClick={() => setFormDisplay(2) }>
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
    const [name,setName]=useState("");
    
    const saveChangeName=(code,name)=>{
        if(code ===13){
            UpdateProfile(name);
            setChange(false);
        }
            
    }
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
                                <input type="text" placeholder='Name' onKeyUp={e=>saveChangeName(e.keyCode,name)} value ={name} onChange={e=>setName(e.target.value)}/>
                            </div>
                            <div className="logged_modal_form_info_change" onClick={() => setChange(!change)}>
                                {change ? 'save' : 'change'}
                            </div>
                        </div>
                    }

                    {!change &&
                        <div className="logged_modal_form_info">
                            <div className="logged_modal_form_info_content">
                                <span className='logged_modal_form_info_content_label'>Name:</span> {auth.currentUser.displayName}
                            </div>
                            <div className="logged_modal_form_info_change" onClick={() => setChange(!change)} >
                                {change ? 'save'  : 'change'}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const RegisterModal = () => {
    const [newPass,setNewPass]=useState("")
    const [confirm,setConfirm]=useState("")
    const messageRef = useRef()
    const updatePassword=async (code,newPass,confirm)=>{
        if(code===13){
            if(newPass===""||confirm===""){
                messageRef.current.classList.remove('logged_modal_message')
                messageRef.current.classList.add('logged_modal_error_message')
                messageRef.current.innerText="Please fill all the fields"
                messageRef.current.style.display="block"
                setTimeout(()=>{
                    messageRef.current.style.display="none"
                },1500)
            }else{
                if (newPass===confirm){
                    const user = await UpdatePassword(newPass);
                    if(user===null){
                        messageRef.current.classList.remove('logged_modal_message')
                        messageRef.current.classList.add('logged_modal_error_message')
                        messageRef.current.innerText="Your password is too short"
                        messageRef.current.style.display="block"
                        setTimeout(()=>{
                            messageRef.current.style.display="none"
                        },1500)
                    }else{
                        
                        messageRef.current.classList.remove('logged_modal_error_message')
                        messageRef.current.classList.add('logged_modal_message')
                        messageRef.current.innerText="UpdateSuccess"
                        messageRef.current.style.display="block"
                        setTimeout(()=>{
                            messageRef.current.style.display="none"
                        },1500)
                    }
                }else{
                    messageRef.current.classList.remove('logged_modal_message')
                    messageRef.current.classList.add('logged_modal_error_message')
                    messageRef.current.innerText="Your confirm password is incorrect"
                    messageRef.current.style.display="block"
                    setTimeout(()=>{
                        messageRef.current.style.display="none"
                    },1500)
                }
            }
        }
    }
    return (
        <div className='logged_modal_content'>
            <div className="logged_modal_header">
                <h2>Change password</h2>
            </div>

            <div className="logged_modal_body">
                <div className="logged_modal_form">
    
                    <div className="logged_modal_form_group">
                        <FaLock className='logged_modal_form_group_icon' />
                        <input type="password" placeholder='New password' required value={newPass} onChange={(e)=>setNewPass(e.target.value)}onKeyUp={e=>updatePassword(e.keyCode,newPass,confirm)}/>
                    </div>
                    <div className="logged_modal_form_group">
                        <FaLock className='logged_modal_form_group_icon' />
                        <input type="password" placeholder='Retype password' required onChange={(e)=>setConfirm(e.target.value)} onKeyUp={e=>updatePassword(e.keyCode,newPass,confirm)} />
                    </div>
                    <div ref={messageRef} className="logged_modal_error_message" style={{display:"none"}}>
                        Incorrect password or email
                    </div>
                </div >
                
            </div >

        </div >
    )
}


export default LoggedInModal