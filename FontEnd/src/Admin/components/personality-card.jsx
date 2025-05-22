import React from "react";
import { Card } from "react-bootstrap";

export default function PersonalityCard({
  icon,
  title,
  value,
  category,
  className
}) {
  return (
    <Card className={`h-100 shadow-sm ${className || ''}`}>
      <Card.Body className="p-4">
        <div className="d-flex align-items-center">
          <div className={`p-3 text-white rounded-3 ${
            category ? `${category.toLowerCase()}-icon` : "bg-primary"
          }`}>
            <i className={`bi ${icon} fs-4`}></i>
          </div>
          <div className="ms-4">
            <div className="text-secondary small">{title}</div>
            <div className="fs-3 fw-semibold mt-1">{value}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export function ActivityCard() {
  const activities = [
    { 
      id: 1, 
      type: 'update', 
      text: 'INTJ profile updated', 
      time: '15 minutes ago',
      color: 'success' 
    },
    { 
      id: 2, 
      type: 'add', 
      text: 'New ENFP profile added', 
      time: '2 hours ago',
      color: 'primary' 
    },
    { 
      id: 3, 
      type: 'delete', 
      text: 'ESFJ profile deleted', 
      time: '1 day ago',
      color: 'danger' 
    }
  ];

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="p-4">
        <h5 className="card-title">Recent Activity</h5>
        <div className="mt-3">
          {activities.map(activity => (
            <div key={activity.id} className="d-flex align-items-center mb-3">
              <div className={`bg-${activity.color} rounded-circle`} style={{width: '8px', height: '8px'}}></div>
              <div className="ms-3">
                <p className="mb-0 fw-medium small">{activity.text}</p>
                <small className="text-muted">{activity.time}</small>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

export function CategoryBadge({ category }) {
  return (
    <span className={`category-badge ${category.toLowerCase()}-badge`}>
      {category}
    </span>
  );
}
