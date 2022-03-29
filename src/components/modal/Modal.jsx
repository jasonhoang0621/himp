import React, { useState } from 'react'
import './Modal.scss'
import propsTypes from 'prop-types'
import Button , {OutlineButton}from '../button/Button'
import { SignUp, Login } from '../../firebase/firebase-authentication'
import { FaTimes } from 'react-icons/fa'

const buttonState={
    true:{
        name:'Log In',
        async function(email,password){
            return await Login(email,password)
        }
    },
    false:{
        name:'SignUp',
        async function(email,password){
            return await SignUp(email,password)
        }
    },
}

const LoginModal = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [state,setState] = useState(true)
    var title=""
    var confirmButton
    var otherButton
    if(state == true){
        title = buttonState.true.name.split(" ").join("")
        confirmButton= buttonState.true
        otherButton = buttonState.false
    }
    else{
        var title = buttonState.false.name.split(" ").join("")
        confirmButton= buttonState.false
        otherButton = buttonState.true
    }
    const handleClick=()=>{
        if(otherButton.name =="SignUp"){
            const height = document.getElementById('Container')
            console.log(height)
            height.style.height='470px'
            const test=document.getElementsByClassName('confirmpassword')
            for(let ele of test){
                ele.style.display='block'
            }
            document.getElementById('error').style.display='none'
            var temp = otherButton
            otherButton=confirmButton
            confirmButton=temp
            setState(false)
        }
        else{
            const height = document.getElementById('Container')
            console.log(height)
            height.style.height='420px'
            const inputConfirm=document.getElementsByClassName('confirmpassword')
            for(let ele of inputConfirm){
                ele.style.display='none'
            }
            document.getElementById('error').style.display='none'
            setState(true)
        }
        
    }
    const handleFunction= async (email,password,confirmpassword)=>{
        var user = null
        if(confirmButton.name=="SignUp"){
            if(password!==confirmpassword){
                document.getElementById('error').style.display='block'
                setTimeout(() => {
                    document.getElementById('error').style.display='none'
                }, 2000);
            }
            else{
                user = await confirmButton.function(email, password)
            }
        }
        else{
            user = await confirmButton.function(email, password)
        }    
        if(user){
            document.getElementById('error').style.display='none'
            props.closeModal(false) 
        }else{
            console.log(user)
            document.getElementById('error').style.display='block'
            setTimeout(() => {
                document.getElementById('error').style.display='none'
            }, 2000);
            
        }
    }
    return (

        <div className="modalBackground">
            <div className="modalContainer" id ="Container">
                <div className="titleCloseBtn">                     
                <FaTimes className = 'exit' onClick={() => {
                    props.closeModal(false);
                }}/>  

                </div>
                <div className="title">
                    <h1>{title.toUpperCase()}</h1>
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
                        
                        <label className='confirmpassword' style={{display:'none'}}  htmlFor="confirmpassword" >Confirm Password: </label>
                        <input className='confirmpassword' style={{display:'none'}} type="password" value={confirmpassword} required
                            onChange={e => setConfirmPassword(e.target.value)} />

                    </div>
                    <div className="form-forgot">
                        <a>Forgot password?</a>
                    </div>
                    
                </div>
                <div id="error" style={{ }}>
                    <p>INVALID INPUT</p>
                </div>
                <div className="footer" >
                    <Button
                        onClick={async () => {
                            if(confirmButton.name==="SignUp")
                                handleFunction(email,password,confirmpassword)
                            else{
                                handleFunction(email,password)
                            }                                   
                        }}>
                        {confirmButton.name}
                    </Button>
                    <OutlineButton onClick={async () => {
                        handleClick()              
                    }}
                    >{otherButton.name}</OutlineButton>
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