import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import Button, { OutlineButton } from '../button/Button'

import './UserList.scss'

const tab = {
    active: 1,
    prohibited: 2,
}

const UserList = (props) => {
    const [userList, setUserList] = useState(tab.active)

    const data = [
        {
            name: 'John Doe',
            email: 'abc@gmai.com',
        },
        {
            name: 'Alice',
            email: 'abc@gmai.com',
        },
        {
            name: 'Bob',
            email: 'abc@gmai.com',
        },
        {
            name: 'Gina',
            email: 'abc@gmai.com',
        },
    ]

    return (
        <>
            <div className="modal" onClick={() => { props.closeModal(false); }}>
                <div className="modal_container">
                    <div className="modal_wrapper" onClick={(e) => e.stopPropagation()}>
                        <div className="modal_close" onClick={() => { props.closeModal(false); }}>
                            <FaTimes />
                        </div>

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
                                                    <Button>BLock</Button>
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        data.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>
                                                    <OutlineButton>Unblock</OutlineButton>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>


                        {(userList === 1 || userList === 2) &&
                            <div className="modal_footer">
                                <div className="modal_footer_section modal_footer_active" onClick={() => setUserList(tab.active)} >
                                    <div className="">Active</div>
                                </div>
                                <div className="modal_footer_section modal_footer_prohibited" onClick={() => setUserList(tab.prohibited)}>
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