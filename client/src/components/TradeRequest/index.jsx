import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const TradeRequest = ({ onTradeRequest }) => {
  // State to keep track of the form values
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // This function would handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form fields
    if (!selectedBook || !selectedDate) {
      // Show an alert if validation fails
      setShowAlert(true);
    } else {
      // Hide the alert and proceed with the trade request
      setShowAlert(false);
      // Here you would handle the trade request logic, possibly calling onTradeRequest
      console.log('Trade request submitted with:', selectedBook, selectedDate);
      onTradeRequest && onTradeRequest(selectedBook, selectedDate);
    }
  };

  // Update state when the book selection changes
  const handleBookChange = (e) => {
    setSelectedBook(e.target.value);
  };

  // Update state when the date selection changes
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <Container className="trade-request my-3">
      <Row className="justify-content-center">
        <Col lg={6}>
          <h2>Request a trade</h2>
          {showAlert && (
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
              Please select a book and a date to make a trade request.
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="book-select" className="mb-3">
              <Form.Label>Choose a book to trade:</Form.Label>
              <Form.Control as="select" name="book" value={selectedBook} onChange={handleBookChange} className="mb-3">
                <option value="" disabled>Select here...</option>
                {/* Options should be generated based on the user's bookshelf */}
                <option value="book1">Legends and Lattes</option>
                <option value="book2">Harry Potter and the Order of the Phoenix</option>
                {/* ... other options */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="trade-date" className="mb-3">
              <Form.Label>Suggested Swap Date:</Form.Label>
              <Form.Control type="date" name="trade-date" value={selectedDate} onChange={handleDateChange} />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" className="mt-4">
                Make Request
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TradeRequest;

