import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Form, Card, Button, Row, Col, Spinner } from "react-bootstrap";
import SwotFieldArray from "../../components/swot-field-array.jsx";
import { useToast } from "../../hooks/use-toast.js";
import TopBar from "../../../Components/Navigation/TopBar.jsx";

export default function AddPersonality() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      type: "",
      role: "",
      description: "",
      categorie: "",
      swot: {
        forces: [""],
        faiblesses: [""],
        opportunites: [""],
        menaces: [""],
      },
    }
  });

  // Validation simplifiée maison
  function validate(data) {
    const newErrors = {};
    if (!data.type) newErrors.type = "Type is required";
    if (!data.role) newErrors.role = "Role is required";
    if (!data.categorie) newErrors.categorie = "Category is required";
    if (!data.description) newErrors.description = "Description is required";
    return newErrors;
  }

  async function onSubmit(data) {
    clearErrors();
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      // Map errors to react-hook-form
      for (const key in validationErrors) {
        setError(key, { type: "manual", message: validationErrors[key] });
      }
      return;
    }

    // Nettoyer les SWOT de champs vides
    const swot = {
      forces: data.swot.forces.filter(item => item && item.trim() !== ""),
      faiblesses: data.swot.faiblesses.filter(item => item && item.trim() !== ""),
      opportunites: data.swot.opportunites.filter(item => item && item.trim() !== ""),
      menaces: data.swot.menaces.filter(item => item && item.trim() !== ""),
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/personalities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, swot }),
      });

      if (!response.ok) throw new Error("Failed to create personality type");

      toast({
        title: "Success",
        description: "Personality type has been created successfully.",
      });

      navigate("/personalities");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create personality type. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <TopBar title={"Add New Personality"} />
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="text-secondary">Create a new MBTI personality type entry</p>
          </div>
          <button
            className="light-btn"
            onClick={() => navigate("/personalities")}
          >
            <i className="bi bi-arrow-left me-2"></i> Back to List
          </button>
        </div>
      </div>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-4">

              {/* Type */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    {...register("type")}
                    isInvalid={!!errors.type}
                  >
                    <option value="">Select a Type</option>
                    <option value="INTJ">INTJ</option>
                    <option value="INTP">INTP</option>
                    <option value="ENTJ">ENTJ</option>
                    <option value="ENTP">ENTP</option>
                    <option value="INFJ">INFJ</option>
                    <option value="INFP">INFP</option>
                    <option value="ENFJ">ENFJ</option>
                    <option value="ENFP">ENFP</option>
                    <option value="ISTJ">ISTJ</option>
                    <option value="ISFJ">ISFJ</option>
                    <option value="ESTJ">ESTJ</option>
                    <option value="ESFJ">ESFJ</option>
                    <option value="ISTP">ISTP</option>
                    <option value="ISFP">ISFP</option>
                    <option value="ESTP">ESTP</option>
                    <option value="ESFP">ESFP</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.type?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Role */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Architect"
                    {...register("role")}
                    isInvalid={!!errors.role}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.role?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Category */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    {...register("categorie")}
                    isInvalid={!!errors.categorie}
                  >
                    <option value="">Select a Category</option>
                    <option value="Analysts">Analysts</option>
                    <option value="Diplomats">Diplomats</option>
                    <option value="Sentinels">Sentinels</option>
                    <option value="Explorers">Explorers</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.categorie?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Description */}
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter a detailed description of this personality type..."
                    {...register("description")}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* SWOT Analysis */}
              <Col xs={12}>
                <h3 className="fs-5 fw-semibold mb-3">SWOT Analysis</h3>

                <SwotFieldArray
                  name="swot.forces"
                  control={control}
                  label="Forces (Strengths)"
                  placeholder="Enter a strength"
                />

                <SwotFieldArray
                  name="swot.faiblesses"
                  control={control}
                  label="Faiblesses (Weaknesses)"
                  placeholder="Enter a weakness"
                />

                <SwotFieldArray
                  name="swot.opportunites"
                  control={control}
                  label="Opportunites (Opportunities)"
                  placeholder="Enter an opportunity"
                />

                <SwotFieldArray
                  name="swot.menaces"
                  control={control}
                  label="Menaces (Threats)"
                  placeholder="Enter a threat"
                />
              </Col>

              <Col xs={12} className="d-flex justify-content-end gap-2 mt-4">
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate("/personalities")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <button
                  type="submit"
                 className="dark-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Saving...
                    </>
                  ) : "Save"}
                </button>
              </Col>

            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
