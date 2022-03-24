import React from 'react'
import { Outlet } from 'react-router-dom'

import './Category.scss'

const Category = () => {
    return (
        <>
            <div>Category</div>
            <Outlet />
        </>
    )
}

export default Category