import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPersonalityByIdRed } from "../../../Redux/Actions/personality.action";
import { Form, Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";

export default function EditPersonality() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      role: "",
      categorie: "",
      description: "",
      swot: {
        forces: [""],
        faiblesses: [""],
        opportunites: [""],
        menaces: [""],
      },
    },
  });

  const personality = useSelector((state) => state.personality.selected || {});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getPersonalityByIdRed(id));
      } catch (err) {
        setError("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id, dispatch]);

  useEffect(() => {
    if (personality && personality._id) {
      reset({
        type: personality.type || "",
        role: personality.role || "",
        categorie: personality.categorie || "",
        description: personality.description || "",
        swot: {
          forces: personality.swot?.forces?.length ? personality.swot.forces : [""],
          faiblesses: personality.swot?.faiblesses?.length ? personality.swot.faiblesses : [""],
          opportunites: personality.swot?.opportunites?.length ? personality.swot.opportunites : [""],
          menaces: personality.swot?.menaces?.length ? personality.swot.menaces : [""],
        },
      });
    }
  }, [personality, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    setError(null);

    const cleanedSwot = {};
    Object.entries(data.swot).forEach(([key, arr]) => {
      cleanedSwot[key] = arr.filter((item) => item.trim() !== "") || [""];
    });

    const payload = {
      ...data,
      swot: cleanedSwot,
    };

    try {
      const res = await fetch(`/api/personalities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");
      alert("Personnalité mise à jour !");
      navigate(`/personalities/view/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center p-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Card.Body>
      </Card>
    );
  }

  if (!personality) {
    return (
      <div className="text-center py-5">
        <h2>Personality not found</h2>
        <Button variant="primary" onClick={() => navigate("/personalities")}>
          Back to Personalities
        </Button>
      </div>
    );
  }

  const SwotFieldArray = ({ label, name, placeholder }) => {
    const { fields, append, remove } = useFieldArray({
      control,
      name,
    });

    return (
      <Form.Group className="mb-4">
        <Form.Label>{label}</Form.Label>
        {fields.map((field, index) => (
          <div key={field.id} className="d-flex align-items-center mb-2">
            <Form.Control
              {...register(`${name}.${index}`)}
              placeholder={placeholder}
              className="me-2"
            />
            <Button variant="danger" size="sm" onClick={() => remove(index)}>
              &times;
            </Button>
          </div>
        ))}
        <Button variant="secondary" size="sm" onClick={() => append("")}>
          + Ajouter
        </Button>
      </Form.Group>
    );
  };

  return (
    <div>
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="fs-2 fw-bold">Edit Personality: {personality.type}</h1>
          <p className="text-secondary">Modify personality type information</p>
        </div>
        <Button variant="outline-primary" onClick={() => navigate(`/personalities/view/${id}`)}>
          <i className="bi bi-arrow-left me-2"></i> Back to Details
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-4">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Control type="text" {...register("type")} readOnly disabled />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Architect"
                    {...register("role", { required: "Role is required" })}
                    isInvalid={!!errors.role}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.role?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    {...register("categorie", { required: "Category is required" })}
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

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    {...register("description", { required: "Description is required" })}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* SWOT fields */}
              <Col xs={12}>
                <h3 className="fs-5 fw-semibold mb-3">SWOT Analysis</h3>

                <SwotFieldArray name="swot.forces" label="Forces (Strengths)" placeholder="Enter a strength" />
                <SwotFieldArray name="swot.faiblesses" label="Faiblesses (Weaknesses)" placeholder="Enter a weakness" />
                <SwotFieldArray name="swot.opportunites" label="Opportunités (Opportunities)" placeholder="Enter an opportunity" />
                <SwotFieldArray name="swot.menaces" label="Menaces (Threats)" placeholder="Enter a threat" />
              </Col>

              <Col xs={12} className="d-flex justify-content-end gap-2 mt-4">
                <Button variant="outline-secondary" onClick={() => navigate(`/personalities/view/${id}`)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={saving}>
                  {saving ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Saving...
                    </>
                  ) : "Save Changes"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
