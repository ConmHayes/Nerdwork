import React from 'react';
import { Form } from 'react-bootstrap';

const FormSelect = ({ label, name, value, options, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" name={name} value={value} onChange={onChange}>
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default FormSelect;
