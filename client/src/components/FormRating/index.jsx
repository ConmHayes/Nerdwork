import React from 'react';
import { Form } from 'react-bootstrap';

const FormRating = ({ label, name, value, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="number"
        name={name}
        min={0}
        max={5}
        step={0.5}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default FormRating;
