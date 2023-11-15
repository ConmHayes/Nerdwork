import React from 'react';
import { Form } from 'react-bootstrap';

const FormMultiSelect = ({ label, name, selected, options, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" multiple name={name} value={selected} onChange={onChange}>
        {options.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default FormMultiSelect;
