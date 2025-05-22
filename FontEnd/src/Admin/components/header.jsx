import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="bg-white border-bottom d-flex align-items-center justify-content-between py-3 px-3 px-md-4">
      <div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="btn d-lg-none text-secondary"
        >
          <i className="bi bi-list fs-4"></i>
        </button>
      </div>

      <div className="d-flex">
        <Dropdown className="me-3">
          <Dropdown.Toggle as="div" id="notification-dropdown">
            <button className="btn btn-light position-relative">
              <i className="bi bi-bell text-secondary"></i>
            </button>
          </Dropdown.Toggle>

          <Dropdown.Menu align="end" style={{ width: "300px" }}>
            <h6 className="dropdown-header">Notifications</h6>
            <Dropdown.Divider />
            <Dropdown.Item className="px-3 py-2">
              <div>
                <p className="mb-0 fw-medium">New personality type added</p>
                <small className="text-muted">5 minutes ago</small>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="px-3 py-2">
              <div>
                <p className="mb-0 fw-medium">Database backup completed</p>
                <small className="text-muted">1 hour ago</small>
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle as="div" id="profile-dropdown">
            <button className="btn btn-light rounded-circle overflow-hidden p-0">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile" 
                className="rounded-circle"
                width="32"
                height="32"
              />
            </button>
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item>Your Profile</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}
