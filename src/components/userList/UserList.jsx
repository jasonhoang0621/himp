import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import Button, { OutlineButton } from '../button/Button'
import { User } from '../../firebase/firestore'
import './UserList.scss'

const tab = {
    active: 1,
    prohibited: 2,
}
let userList = 1
let result = []
const UserList = (props) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    let tmp = null

    const handle = async () => {
        setIsLoading(true)
        tmp = await User.getListUser()

        if (result.length !== 0)
            result = []
        if (userList === 1) {
            for (let i = 0; i < tmp.length; i++) {
                if (tmp[i].state === true) {
                    result.push(tmp[i])
                }
            }
        } else {
            for (let i = 0; i < tmp.length; i++) {
                if (tmp[i].state !== true) {
                    result.push(tmp[i])
                }
            }
        }
        setData(result)
        setIsLoading(false)
    }

    const blockUser = async (email) => {
        await User.blockUser(email)
        for (let i = 0; i < result.length; i++) {
            if (result[i].email === email) {
                result[i].state = false
                result.splice(i, 1)
            }
        }
        const temp = [...result]
        setData(temp)
    }

    const unblockUser = async (email) => {
        await User.unblockUser(email)
        for (let i = 0; i < result.length; i++) {
            if (result[i].email === email) {
                result[i].state = true
                result.splice(i, 1)
            }
        }
        const temp = [...result]
        setData(temp)
    }

    useEffect(() => {
        setIsLoading(true)
        const loadData = async () => {
            const tmp = await User.getListUser()

            if (result.length !== 0)
                result = []
            if (userList === 1) {
                for (let i = 0; i < tmp.length; i++) {
                    if (tmp[i].state === true) {
                        result.push(tmp[i])
                    }
                }
            } else {
                for (let i = 0; i < tmp.length; i++) {
                    if (tmp[i].state !== true) {
                        result.push(tmp[i])
                    }
                }
            }
            setData(result)
        }

        loadData()
        setIsLoading(false)
    }, [])

    return (
        <>
            <div className="modal" onClick={() => { props.closeModal(false); }}>
                <div className="modal_container">
                    <div className="modal_wrapper" onClick={(e) => e.stopPropagation()}>
                        <div className="modal_close" onClick={() => { props.closeModal(false); }}>
                            <FaTimes />
                        </div>

                        {
                            !isLoading ?
                                <div className="modal_body">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userList === tab.active ?
                                                    data.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>
                                                                <Button onClick={() => blockUser(item.email)}>BLock</Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    :
                                                    data.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>
                                                                <OutlineButton onClick={() => unblockUser(item.email)}>Unblock</OutlineButton>
                                                            </td>
                                                        </tr>
                                                    ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div className="loader_wrapper">
                                    <div className="loader"></div>
                                </div>
                        }

                        {(userList === 1 || userList === 2) &&
                            <div className="modal_footer">
                                <div className="modal_footer_section modal_footer_active" onClick={() => {
                                    userList = tab.active
                                    handle()
                                }
                                } >
                                    <div className="">Active</div>
                                </div>
                                <div className="modal_footer_section modal_footer_prohibited" onClick={() => {
                                    userList = tab.prohibited
                                    handle()
                                }}>
                                    <div className="">Prohibited</div>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserList