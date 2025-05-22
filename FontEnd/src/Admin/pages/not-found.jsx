import React from "react";

import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Container>
        <Card className="shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
          <Card.Body className="p-4">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-exclamation-circle fs-3 text-danger me-2"></i>
              <h1 className="mb-0 fs-3 fw-bold">404 Page Not Found</h1>
            </div>
            
            <p className="text-secondary">
              The page you requested could not be found. It might have been removed,
              renamed, or did not exist in the first place.
            </p>
            
            <div className="mt-4">
              <Link href="/">
                <Button variant="primary">
                  <i className="bi bi-house-door me-2"></i>
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
