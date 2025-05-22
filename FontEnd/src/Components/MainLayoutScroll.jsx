import React from 'react'
import Sidebar from './Navigation/SideBar';
function MainLayoutScroll({children}) {
    return (
        <div className="layout">
            <Sidebar />
            <div className="content-scroll" >
                {children}
            </div>
        </div>
    )
}

export default MainLayoutScroll

