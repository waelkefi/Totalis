// import React, { useState } from "react";
// import Sidebar from "./sidebar";
// import Header from "./header";

// export default function Layout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="app-container d-flex">
//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Content area */}
//       <div className="d-flex flex-column flex-grow-1 overflow-hidden">
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         {/* Main content */}
//         <main className="flex-grow-1 overflow-auto p-3 p-md-4 p-lg-5 bg-light">
//           <div className="container-fluid">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


import React from 'react'
import Sidebar from "./sidebar";
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

