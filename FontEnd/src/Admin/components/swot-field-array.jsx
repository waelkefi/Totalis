import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useFieldArray } from "react-hook-form";

export default function SwotFieldArray({
  name,
  control,
  label,
  placeholder = "Enter item"
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="mb-4 d-flex flex-column align-items-start">
      <Form.Label className="fw-medium mb-2">
        {label}
      </Form.Label>
      
      {fields.map((field, index) => (
        <InputGroup key={field.id} className="mb-2">
          <Form.Control
            {...control.register(`${name}.${index}`)}
            placeholder={placeholder}
            className="border"
          />
          <Button
            variant="outline-danger"
            onClick={() => remove(index)}
          >
            <i className="bi bi-trash"></i>
          </Button>
        </InputGroup>
      ))}
      
      <Button
        size="sm"
        className="mt-2 btn btn-secondary btn-sm"
        onClick={() => append("")}
      >
        <i className="bi bi-plus-circle me-2"></i>
        Add Item
      </Button>
    </div>
  );
}
