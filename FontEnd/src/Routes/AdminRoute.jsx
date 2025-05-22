import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { queryClient } from "./lib/queryClient.js";
// import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
import Dashboard from "../Admin/pages/dashboard.jsx";
import PersonalitiesList from "../Admin/pages/personalities/index.jsx";
import AddPersonality from "../Admin/pages/personalities/add.jsx";
import EditPersonality from "../Admin/pages/personalities/edit.jsx";
import ViewPersonality from "../Admin/pages/personalities/view.jsx";
import NotFound from "../Admin/pages/not-found.jsx";
import Layout from "../Admin/components/layout.jsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/personalities" element={<PersonalitiesList/>} />
      <Route path="/addpersonalities" element={<AddPersonality/>} />
      <Route path="/personalities/edit/:id" element={<EditPersonality/>} />
      <Route path="/personalities/view/:id" element={<ViewPersonality/>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AdminRoute() {
  return (
    // <QueryClientProvider client={queryClient}>
    //   <ToastContainer position="top-end" className="p-3">
    //     {/* Bootstrap toast notifications will appear here */}
    //   </ToastContainer>
    <Layout>
      <Router />
    </Layout>
    // </QueryClientProvider>
  );
}

export default AdminRoute;
