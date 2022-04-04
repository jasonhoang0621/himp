import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EmbedAPI from '../../api/embedAPI'

import './Stream.scss'

const Stream = () => {
    const { category, id } = useParams()
    const [link, setLink] = useState('')

    useEffect(() => {
        const getLink = async () => {
            var linkStream = '';
            if (category === 'movie') {
                const params = { id }
                linkStream = await EmbedAPI.movieStreaming(params)
            } else {
                const params = {
                    id,
                    sea: 1,
                    epi: 1
                }
                linkStream = await EmbedAPI.tvStreaming(params)
            }

            setLink(linkStream)
        }

        getLink()
    })

    return (
        <div className="stream container">
            <div className="stream_frame">
                <iframe id="ve-iframe" src={link} width="100%" allowFullScreen="allowfullscreen" frameBorder={0}></iframe>
            </div>
        </div >
    )
}

export default Stream