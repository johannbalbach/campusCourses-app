import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

const FormField = ({ controlId, label, value, onChange, type, placeholder, isValid, pattern, feedbackText, max, colSize = 0 }) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId={controlId}>
      {colSize > 0 ? (
        <>
          <Form.Label column sm={12 - colSize}>{label}</Form.Label>
          <Col sm={colSize}>
            <InnerForm value={value} onChange={onChange} type={type} placeholder={placeholder} isValid={isValid} pattern={pattern} feedbackText={feedbackText} max={max}/>
          </Col>
        </>
      ) : (
        <>
          <Form.Label>{label}</Form.Label>
          <Col>
            <InnerForm value={value} onChange={onChange} type={type} placeholder={placeholder} isValid={isValid} pattern={pattern} feedbackText={feedbackText} max={max}/>
          </Col>
        </>
      )}
    </Form.Group>
  );
};

const InnerForm = ({ value, onChange, type, placeholder, isValid, pattern, feedbackText, max }) => {
  return (
    <>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        isInvalid={!isValid}
        pattern={pattern}
        max={max}
      />
      <Form.Control.Feedback type="invalid">{feedbackText}</Form.Control.Feedback>
    </>
  );
};

export default FormField;