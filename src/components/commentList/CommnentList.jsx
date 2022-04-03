import React from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import { OutlineButton } from '../button/Button'
import './CommentList.scss'

const CommentList = (props) => {
    return (
        <div className="comment_list">
            <div className="comment_list_container">
                {/* just show when logged in */}
                <div className="comment_input">
                    <textarea type="text" placeholder='write a comment' />
                </div>

                {/* làm cái useState list hiện 5 comment thôi, bấm load more thì callapi request r add thêm 5 cái nữa */}
                {
                    Array.from({ length: 2 }).map((item, index) => (
                        <div className="root_comment" key={index}>
                            <Comment />
                            {
                                Array.from({ length: 2 }).map((item, index) => (
                                    <div className="reply_comment" key={index}>
                                        <Comment />
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>

            <div className="comment_load_more">
                <OutlineButton>Load more</OutlineButton>
            </div>
        </div>
    )
}

const Comment = (props) => {
    return (
        <div className="comment">
            <div className="comment_item_icon">
                <FaEllipsisH />
            </div>
            <div className="comment_item_name">
                <h3>John Doe <span>Mar 04 at 4:03 pm</span></h3>
            </div>
            <div className="comment_item_content">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam sit voluptatibus deleniti inventore? Aliquam, nulla? Fugit vel, delectus aut aliquam voluptatibus voluptatum alias cum. Culpa optio assumenda voluptatum molestiae beatae.
            </div>
        </div>
    )
}

export default CommentList

