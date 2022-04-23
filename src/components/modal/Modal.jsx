import propType from 'prop-types'
import React, { useRef, useState } from 'react'
import { FaAngleLeft, FaEnvelope, FaLock, FaTimes, FaUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { storeUser, storeFavoList, toggleModal } from '../../app/userSlice'
import { Forgot, Login, SignUp } from '../../firebase/firebase-authentication'
import { Favourite, User } from '../../firebase/firestore'
import './Modal.scss'

const form = {
    login: 1,
    register: 2,
    forget: 3,
}

const Modal = (props) => {
    const [formDisplay, setFormDisplay] = useState(form.login)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const messageRef = useRef()
    return (
        <>
            <div className="modal" onClick={() => dispatch(toggleModal(false))}>
                <div className="modal_container">
                    <div className="modal_wrapper" onClick={(e) => e.stopPropagation()}>
                        <div className="modal_close" onClick={() => dispatch(toggleModal(false))}>
                            <FaTimes />
                        </div>
                        {formDisplay === 3 &&
                            <div className="modal_back" onClick={() => setFormDisplay(1)}>
                                <FaAngleLeft />
                            </div>}


                        {formDisplay === 1 && <LoginModal setFormDisplay={setFormDisplay} messageRef={messageRef} isLoading={isLoading} setIsLoading={setIsLoading} />}
                        {formDisplay === 2 && <RegisterModal messageRef={messageRef} isLoading={isLoading} setIsLoading={setIsLoading} />}
                        {formDisplay === 3 && <ForgetPasswordModal setFormDisplay={setFormDisplay} messageRef={messageRef} />}


                        <div ref={messageRef} className="modal_error_message" style={{ display: "none" }}></div>

                        {
                            isLoading &&
                            <div className="loader_wrapper">
                                <div className="loader"></div>
                            </div>
                        }

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

    const dispatch = useDispatch()

    const handleEnter = async (keyCode, email, password) => {
        if (keyCode === 13) {
            props.setIsLoading(true)
            if (email === "" || password === "") {
                props.messageRef.current.classList.remove('modal_message')
                props.messageRef.current.classList.add('modal_error_message')
                props.messageRef.current.innerText = "Please fill all the fields"
                props.messageRef.current.style.display = "block"
                setTimeout(() => {
                    props.messageRef.current.style.display = "none"
                }, 1500)

            }
            else {
                if (password.length < 6) {
                    props.messageRef.current.classList.remove('modal_message')
                    props.messageRef.current.classList.add('modal_error_message')
                    props.messageRef.current.innerText = "Incorrect email or password"
                    props.messageRef.current.style.display = "block"
                    setTimeout(() => {
                        props.messageRef.current.style.display = "none"
                    }, 1500)
                }
                else {
                    const check = await User.getStateUser(email)
                    if (check.state === true) {
                        const user = await Login(email, password)
                        if (user === null) {
                            props.messageRef.current.classList.remove('modal_message')
                            props.messageRef.current.classList.add('modal_error_message')
                            props.messageRef.current.innerText = "Incorrect email or password"
                            props.messageRef.current.style.display = "block"
                            setTimeout(() => {
                                props.messageRef.current.style.display = "none"
                            }, 1500)

                        } else {
                            localStorage.setItem("role", check.role)
                            const user = JSON.parse(localStorage.getItem("authUser"))
                            const favoList = await Favourite.getFavourite(user.user.email)
                            localStorage.setItem("favo", JSON.stringify(favoList))
                            dispatch(storeUser(user))
                            dispatch(storeFavoList(favoList))
                            dispatch(toggleModal(false))
                        }
                    } else {
                        props.messageRef.current.classList.remove('modal_message')
                        props.messageRef.current.classList.add('modal_error_message')
                        props.messageRef.current.innerText = "Your account have been banned by admin"
                        props.messageRef.current.style.display = "block"
                        setTimeout(() => {
                            props.messageRef.current.style.display = "none"
                        }, 1500)
                    }

                }
            }
            props.setIsLoading(false)

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
                    {!props.isLoading && <div className="modal_form_forget" onClick={() => props.setFormDisplay(3)}>
                        Forget password?
                    </div>}
                </div>
            </div>
        </div>
    )

}

const RegisterModal = (props) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPass, setConfirm] = useState('')
    const handleEnter = async (keyCode, email, password, name, confirmPass) => {
        if (keyCode === 13) {
            props.setIsLoading(true)
            if (email === "" || password === "") {
                props.messageRef.current.classList.remove('modal_message')
                props.messageRef.current.classList.add('modal_error_message')
                props.messageRef.current.innerText = "Please fill all the fields"
                props.messageRef.current.style.display = "block"
                setTimeout(() => {
                    props.messageRef.current.style.display = "none"
                }, 1500)
            }
            else {
                if (password.length < 6) {
                    props.messageRef.current.classList.remove('modal_message')
                    props.messageRef.current.classList.add('modal_error_message')
                    props.messageRef.current.innerText = "Your password is too short"
                    props.messageRef.current.style.display = "block"
                    setTimeout(() => {
                        props.messageRef.current.style.display = "none"
                    }, 1500)
                }
                else {
                    if (confirmPass === password) {

                        const user = await SignUp(email, password, name)
                        if (user === null) {
                            props.messageRef.current.classList.remove('modal_message')
                            props.messageRef.current.classList.add('modal_error_message')
                            props.messageRef.current.innerText = "Incorrect email or password"
                            props.messageRef.current.style.display = "block"
                            setTimeout(() => {
                                props.messageRef.current.style.display = "none"
                            }, 1500)
                        } else {
                            const user_ = JSON.parse(localStorage.getItem("authUser"))
                            const info = {
                                name: user.displayName,
                                email: email,
                                role: false,
                                state: true
                            }
                            await User.addUser(info)
                            await Favourite.createFavorite(email)
                            const favoList = await Favourite.getFavourite(user_.user.email)
                            localStorage.setItem("role", "false")
                            localStorage.setItem("favo", JSON.stringify(favoList))
                            dispatch(storeUser(user_))
                            dispatch(storeFavoList(favoList))
                            dispatch(toggleModal(false))
                        }
                    }
                    else {
                        props.messageRef.current.classList.remove('modal_message')
                        props.messageRef.current.classList.add('modal_error_message')
                        props.messageRef.current.innerText = "Wrong confirm password"
                        props.messageRef.current.style.display = "block"
                        setTimeout(() => {
                            props.messageRef.current.style.display = "none"
                        }, 1500)
                    }

                }
            }
            props.setIsLoading(false)
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

            if (email === "") {
                props.messageRef.current.classList.remove('modal_message')
                props.messageRef.current.classList.add('modal_error_message')
                props.messageRef.current.innerText = "Please fill all fields"
                props.messageRef.current.style.display = "block"
                setTimeout(() => {
                    props.messageRef.current.style.display = "none"
                }, 1500)
            }
            else {
                const user = await Forgot(email)

                if (user === null) {
                    props.messageRef.current.classList.remove('modal_message')
                    props.messageRef.current.classList.add('modal_error_message')
                    props.messageRef.current.innerText = "This email doesn't exist"
                    props.messageRef.current.style.display = "block"
                    setTimeout(() => {
                        props.messageRef.current.style.display = "none"
                    }, 1500)
                }
                else {
                    props.setFormDisplay(1)
                    props.messageRef.current.classList.remove('modal_error_message')
                    props.messageRef.current.classList.add('modal_message')
                    props.messageRef.current.innerText = "Please check your email"
                    props.messageRef.current.style.display = "block"
                    setTimeout(() => {
                        props.messageRef.current.style.display = "none"
                    }, 1500)
                }

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


LoginModal.propType = {
    setFormDisplay: propType.func,
    warn: propType.func,
    messageRef: propType.object,
    isLoading: propType.bool,
    setIsLoading: propType.func
}
RegisterModal.propType = {
    messageRef: propType.object,
    isLoading: propType.bool,
    setIsLoading: propType.func
}
ForgetPasswordModal.propType = {
    setFormDisplay: propType.func,
    messageRef: propType.object
}

export default Modal