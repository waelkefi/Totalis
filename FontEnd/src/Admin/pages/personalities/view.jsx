import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { CategoryBadge } from "../../components/personality-card.jsx";
import { getPersonalityByIdRed } from "../../../Redux/Actions/personality.action.js";
import { useDispatch, useSelector } from "react-redux";

export default function ViewPersonality() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const navigate = useNavigate();


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const personality = useSelector((state) => state.personality.selected || {});
  // Récupération de la personnalité
  useEffect(() => {
    const fetchPersonality = async () => {
      try {
        await dispatch(getPersonalityByIdRed(id))
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPersonality();
    } else {
      setLoading(false);
      setError(true);
    }
  }, [id]);

  const LoadingSkeleton = () => (
    <div className="text-center p-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="mb-4">
          <Card.Body>
            <LoadingSkeleton />
          </Card.Body>
        </Card>
        <Row>
          <Col sm={6} className="mb-4">
            <Card>
              <Card.Body>
                <LoadingSkeleton />
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card>
              <Card.Body>
                <LoadingSkeleton />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  if (error || !personality) {
    return (
      <div className="text-center py-5">
        <div className="mb-4">
          <i className="bi bi-exclamation-circle text-warning fs-1"></i>
        </div>
        <h2 className="fs-4 fw-semibold mb-3">Personality not found</h2>
        <p className="text-secondary mb-4">The personality type you're looking for doesn't exist.</p>
        <button
          className="dark-btn" onClick={() => navigate("/personalities")}>
          Back to Personalities
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fs-2 fw-bold">{personality.type}: {personality.role}</h1>
            <p className="text-secondary mb-0">View personality type details</p>
          </div>
          <div className="d-flex">
            <button

              className="dark-btn me-2"
              onClick={() => navigate(`/personalities/edit/${id}`)}
            >
              <i className="bi bi-pencil me-2"></i> Edit
            </button>
            <button
              className="light-btn"

              onClick={() => navigate("/personalities")}
            >
              <i className="bi bi-arrow-left me-2"></i> Back to List
            </button>
          </div>
        </div>
      </div>

      {/* Personality Details */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-light">
          <div className="d-flex align-items-center">
            <CategoryBadge category={personality.categorie} />
            <h3 className="ms-3 fs-5 fw-semibold mb-0">
              {personality.type} - {personality.role}
            </h3>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="border-top border-light">
            <dl className="mb-0">
              <Row className="border-bottom p-3 m-0">
                <Col md={3} className="fw-medium text-secondary">Type</Col>
                <Col md={9}>{personality.type}</Col>
              </Row>
              <Row className="border-bottom p-3 m-0 bg-light">
                <Col md={3} className="fw-medium text-secondary">Role</Col>
                <Col md={9}>{personality.role}</Col>
              </Row>
              <Row className="border-bottom p-3 m-0">
                <Col md={3} className="fw-medium text-secondary">Category</Col>
                <Col md={9}>{personality.categorie}</Col>
              </Row>
              <Row className="p-3 m-0 bg-light">
                <Col md={3} className="fw-medium text-secondary">Description</Col>
                <Col md={9}>{personality.description}</Col>
              </Row>
            </dl>
          </div>
        </Card.Body>
      </Card>

      {/* SWOT Analysis */}
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="fs-5 fw-semibold mb-4">SWOT Analysis</h3>
          <Row className="g-4">
            {/* Strengths */}
            <Col md={6}>
              <div className="swot-panel swot-panel-strengths">
                <h5 className="fw-medium text-success mb-3">Forces (Strengths)</h5>
                <ul className="ps-4">
                  {personality.swot?.forces?.length > 0 ? (
                    personality.swot.forces.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))
                  ) : (
                    <li className="text-muted">No strengths listed</li>
                  )}
                </ul>
              </div>
            </Col>

            {/* Weaknesses */}
            <Col md={6}>
              <div className="swot-panel swot-panel-weaknesses">
                <h5 className="fw-medium text-danger mb-3">Faiblesses (Weaknesses)</h5>
                <ul className="ps-4">
                  {personality.swot?.faiblesses?.length > 0 ? (
                    personality.swot.faiblesses.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))
                  ) : (
                    <li className="text-muted">No weaknesses listed</li>
                  )}
                </ul>
              </div>
            </Col>

            {/* Opportunities */}
            <Col md={6}>
              <div className="swot-panel swot-panel-opportunities">
                <h5 className="fw-medium text-primary mb-3">Opportunites (Opportunities)</h5>
                <ul className="ps-4">
                  {personality.swot?.opportunites?.length > 0 ? (
                    personality.swot.opportunites.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))
                  ) : (
                    <li className="text-muted">No opportunities listed</li>
                  )}
                </ul>
              </div>
            </Col>

            {/* Threats */}
            <Col md={6}>
              <div className="swot-panel swot-panel-threats">
                <h5 className="fw-medium text-warning mb-3">Menaces (Threats)</h5>
                <ul className="ps-4">
                  {personality.swot?.menaces?.length > 0 ? (
                    personality.swot.menaces.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))
                  ) : (
                    <li className="text-muted">No threats listed</li>
                  )}
                </ul>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
