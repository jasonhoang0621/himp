import React, { useState } from 'react'
import './Modal.scss'
import propsTypes from 'prop-types'
import Button from '../button/Button'
import { Signin, Login } from '../../firebase/firebase-authentication'


const LoginModal = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (

        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <Button
                        onClick={() => {
                            props.closeModal(false);
                        }}
                    >
                        X
                    </Button>
                </div>
                <div className="title">
                    <h1>LOGIN</h1>
                </div>
                <div className="body ">
                    <div className='form'>
                        <label htmlFor="email">Email: </label>
                        <br />
                        <input id='email' value={email} type="email"
                            onChange={e => setEmail(e.target.value)} required
                        />
                        <br />
                        <label htmlFor="password">Password: </label>
                        <br />
                        <input id='password' type="password" value={password} required
                            onChange={e => setPassword(e.target.value)} />
                        <br />
                        <label className='confirmpassword' style={{display:'none'}}  htmlFor="confirmpassword" >Password: </label>
                        <input className='confirmpassword' style={{display:'none'}} type="password" value={password} required
                            onChange={e => setPassword(e.target.value)} />

                    </div>
                </div>
                <div id="error" style={{ display: 'none' }}>
                    invalid input
                </div>
                <div className="footer" >
                    <Button
                        onClick={async () => {
                            await Login(email, password)
                            props.closeModal(false)
                            
                        }}>
                        Log In
                    </Button>
                    <Button onClick={async () => {
                        //await Signin(email, password)
                        const test=document.getElementsByClassName('confirmpassword')
                        for(let ele of test){
                            ele.style.display='block'
                        }
                        //props.closeModal(false)
                    }}
                    >Sign In</Button>
                </div>
            </div>
        </div>
    )
}
LoginModal.propsTypes = {
    className: propsTypes.string,
    onClick: propsTypes.func,
    closeModal: propsTypes.func
}
export default LoginModal