import propType from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FaEllipsisH, FaTimes } from 'react-icons/fa'
import { Comments } from '../../firebase/firestore'
import { OutlineButton } from '../button/Button'
import Modal from '../modal/Modal'
import './CommentList.scss'

const CommentList = (props) => {

    const [isModal, setIsModal] = useState(false)
    const [commentArray, setCommentArray] = useState([])
    const [content, setContent] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    let user = localStorage.getItem("authUser")

    const getCommentList = async () => {
        const array = await Comments.getAllComments(props.id)
        setCommentArray(array)
    }

    const handleClick = async () => {
        user = localStorage.getItem("authUser")

        if (user === null) {
            setIsModal(true)
        } else {
            if (!content) {

            }
            else {
                setIsLoading(true)
                const tmp = JSON.parse(user)
                console.log(tmp)
                await Comments.postComment(tmp.user.email, content, props.id)
                setContent('')
                getCommentList()
                setIsLoading(false)
            }
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
                    <textarea disabled={isLoading} id="textInput" type="text" placeholder='write a comment' value={content} onChange={(e) => setContent(e.target.value)} />
                    <div className='button_input'>
                        <OutlineButton onClick={handleClick}>
                            {isLoading ? <div className="loader comment_loader"></div> : "POST"}
                        </OutlineButton>
                    </div>
                </div>

                {

                    commentArray ?
                        commentArray.map((item, index) => {
                            return (
                                <div className="root_comment" key={index}>
                                    <Comment userName={item.name} content={item.content} id={item.id} commentChange={getCommentList} />

                                    {
                                        item.replies.map((item2, index) => {
                                            return (
                                                <div className="reply_comment" key={index} >
                                                    <Comment userName={item2.name} content={item2.content} id={item2.id} isChild={true} rootID={item.id} commentChange={getCommentList} />
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
            {isModal && <Modal closeModal={setIsModal} />}
        </div>
    )
}

const Comment = (props) => {
    const [isReply, setIsReply] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const [content, setContent] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    let user = localStorage.getItem("authUser")


    const handleClick = async () => {
        user = localStorage.getItem("authUser")
        if (user === null) {
            setIsModal(true)
        } else {
            if (!content) {

            }
            else {
                setIsLoading(true)
                const tmp = JSON.parse(user)
                console.log(tmp)
                await Comments.postReply(tmp.user.email, content, props.id)
                props.commentChange()
                setIsReply(false)
                setIsLoading(false)
            }
        }
    }
    const Delete = async () => {
        user = localStorage.getItem("role")
        if (user === null) {
            setIsModal(true)
        } else {
            if (!user) {

            }
            else {

                console.log(props.id)
                await Comments.Delete(props.id, props.rootID)
                props.commentChange()
            }

        }
    }
    return (
        <>
            <div className="comment" id={props.id}>
                <div className="comment_item_icon">
                    <FaEllipsisH />

                    <ul className="comment_item_option_list">
                        {!props.isChild && <li className="comment_item_option_item" onClick={() => setIsReply(true)}>Reply</li>}
                        <li className="comment_item_option_item" onClick={() => Delete()}>Delete</li>
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
                        <textarea type="text" disabled={isLoading} cols={100} placeholder='write a comment' value={content} onChange={(e) => setContent(e.target.value)} />

                        <div className="comment_input_close">
                            <FaTimes onClick={() => setIsReply(false)} />
                        </div>
                    </div>
                    <div className='button_input comment_reply_btn'>
                        <OutlineButton onClick={handleClick}>
                            {isLoading ? <div className="loader comment_loader"></div> : "POST"}
                        </OutlineButton>
                    </div>
                </div>}
            {isModal && <Modal closeModal={setIsModal} />}
        </>
    )
}
Comment.propType = {
    userName: propType.string,
    content: propType.string,
    id: propType.string,
    isChild: propType.bool,
    commentChange: propType.func,
    rootID: propType.string,
}

export default CommentList

