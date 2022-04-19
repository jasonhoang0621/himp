import propType from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FaEllipsisH, FaTimes } from 'react-icons/fa'
import { Comments } from '../../firebase/firestore'
import { OutlineButton } from '../button/Button'
import Notification from '../notifications/Notification'
import './CommentList.scss'

const CommentList = (props) => {

    const [isModal, setIsModal] = useState(false)
    const [commentArray, setCommentArray] = useState([])
    let user = localStorage.getItem("authUser")

    const handleClick = async () => {
        user = localStorage.getItem("authUser")

        if (user === null) {
            setIsModal(true)
        } else {

        }
    }
    useEffect(() => {
        const getCommentList = async () => {
            const array = await Comments.getAllComments(props.id)
            setCommentArray(array)
        }
        getCommentList()
    }, [props.id])

    return (
        <div className="comment_list">
            <div className="comment_list_container">
                <div className="comment_input">
                    <textarea type="text" placeholder='write a comment' />
                    <div className='button_input'>
                        <OutlineButton onClick={() => handleClick()}>POST</OutlineButton>
                    </div>
                </div>

                {
                   
                    commentArray?
                    commentArray.map((item, index) => {
                        return (
                            <div className="root_comment" key={index}>
                                <Comment userName={item.name} content={item.content} id={item.id} />

                                {
                                    item.replies.map((item2, index) => {
                                        return (
                                            <div className="reply_comment" key={index} >
                                                <Comment userName={item2.name} content={item2.content} id={item2.id} isChild={true} />
                                            </div>
                                        )

                                    })
                                }
                            </div>
                        )
                    })
                    :
                    <></>
                }

            </div>

            <div className="comment_load_more">
                <OutlineButton>Load more</OutlineButton>
            </div>
            {isModal && <Notification closeModal={setIsModal} />}
        </div>
    )
}


const Comment = (props) => {
    const [isReply, setIsReply] = useState(false)

    return (
        <>
            <div className="comment" id={props.id}>
                <div className="comment_item_icon">
                    <FaEllipsisH />

                    <ul className="comment_item_option_list">
                        {!props.isChild && <li className="comment_item_option_item" onClick={() => setIsReply(true)}>Reply</li>}
                        <li className="comment_item_option_item">Delete</li>
                    </ul>
                </div>
                <div className="comment_item_name">
                    <h3>{props.userName}</h3>
                </div>
                <div className="comment_item_content">
                    {props.content}
                </div>
            </div>

            {isReply &&
                <div className="comment_input">
                    <div className="comment_input_container">
                        <textarea type="text" cols={100} placeholder='write a comment' />

                        <div className="comment_input_close">
                            <FaTimes onClick={() => setIsReply(false)} />
                        </div>
                    </div>
                    <div className='button_input comment_reply_btn'>
                        <OutlineButton>POST</OutlineButton>
                    </div>
                </div>}
        </>
    )
}
Comment.propType = {
    userName: propType.string,
    content: propType.string,
    id: propType.string,
    isChild: propType.bool
}

export default CommentList

