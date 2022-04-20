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
    const [content,setContent] = useState("")
    let user = localStorage.getItem("authUser")

    const getCommentList = async () => {
        const array = await Comments.getAllComments(props.id)
        setCommentArray(array)
    }

    const handleClick = async (content) => {
        user = localStorage.getItem("authUser")

        if (user === null) {
            setIsModal(true)
        } else {
            if(!content){

            }
            else{
                const tmp = JSON.parse(user)
                console.log(tmp)
                await Comments.postComment(tmp.user.email,content,props.id)
                // document.getElementById("textInput").innerText=""
                getCommentList()
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
                    <textarea id="textInput" type="text" placeholder='write a comment' value ={content} onChange={(e)=>setContent(e.target.value)}/>
                    <div className='button_input'>
                        <OutlineButton onClick={() => handleClick(content)}>POST</OutlineButton>
                    </div>
                </div>

                {
                   
                    commentArray?
                    commentArray.map((item, index) => {
                        return (
                            <div className="root_comment" key={index}>
                                <Comment userName={item.name} content={item.content} id={item.id} commentChange={getCommentList} />

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
    const [isModal, setIsModal] = useState(false)
    const [content,setContent] = useState("")
    let user = localStorage.getItem("authUser")


    const handleClick = async () => {
        user = localStorage.getItem("authUser")
        console.log(content)
        if (user === null) {
            setIsModal(true)
        } else {
            if(!content){

            }
            else{
                const tmp = JSON.parse(user)
                console.log(tmp)
                await Comments.postReply(tmp.user.email,content,props.id)
                document.getElementById("textInput").innerText=""
                props.commentChange()
            }
            
        }
    }
    const Delete = async ()=>{

    }
    return (
        <>
            <div className="comment" id={props.id}>
                <div className="comment_item_icon">
                    <FaEllipsisH />

                    <ul className="comment_item_option_list">
                        {!props.isChild && <li className="comment_item_option_item" onClick={() => setIsReply(true)}>Reply</li>}
                        <li className="comment_item_option_item" onClick={()=>Delete()}>Delete</li>
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
                        <textarea type="text" cols={100} placeholder='write a comment' value={content} onChange={(e)=>setContent(e.target.value)}/>

                        <div className="comment_input_close">
                            <FaTimes onClick={() => setIsReply(false)} />
                        </div>
                    </div>
                    <div className='button_input comment_reply_btn'>
                        <OutlineButton onClick={()=>handleClick()}>POST</OutlineButton>
                    </div>
                </div>}
                {isModal && <Notification closeModal={setIsModal} />}
        </>
    )
}
Comment.propType = {
    userName: propType.string,
    content: propType.string,
    id: propType.string,
    isChild: propType.bool,
    commentChange:propType.func
}

export default CommentList

