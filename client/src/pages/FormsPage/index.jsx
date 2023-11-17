import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FormInput, FormMultiSelect, FormRating, FormSelect, NavigationBar } from '../../components';

const FormsPage = ({ onAddBook }) => {
  const [formData, setFormData] = useState({
    title: "",
    img: "",
    author: "",
    genre: "[]",
    issue_num: "",
    user_id: "",
    rating: 0,
    category: ""
  });
  const [selectedgenre, setSelectedgenre] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic fetch call for testing
    try {
      const response = await fetch('https://nerdwork-server.onrender.com/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: "Test Title",
          img: "test",
          author: "Test Author",
          genre: "[Test Genre]",
          issue_num: 1,
          user_id: 1,
          rating: 5,
          category: "book"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      // onAddBook(result);
      // navigate("/profile");
    } catch (error) {
      setError(`There was a problem adding your item: ${error.message}`);
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (e) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedgenre(values);
    setFormData(prev => ({ ...prev, genre: values }));
  };

  return (
    <Container>
      <NavigationBar />
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Add New Item</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormInput label="Title" type="text" placeholder="Enter title" name="title" value={formData.title} onChange={handleChange} />
            <FormInput label="Image URL" type="text" placeholder="Enter image URL" name="img" value={formData.img} onChange={handleChange} />
            <FormInput label="Author" type="text" placeholder="Enter author's name" name="author" value={formData.author} onChange={handleChange} />
            <FormMultiSelect label="genre" name="genre" selected={selectedgenre} options={['Fiction', 'Fantasy', 'Adventure']} onChange={handleGenreChange} />
            <FormInput label="Owner" type="text" placeholder="Enter owner's username" name="owner" value={formData.user_id} onChange={handleChange} />
            <FormRating label="Rating" name="rating" value={formData.rating} onChange={handleChange} min={0} max={5} step={0.1} />
            <FormSelect label="Category" name="category" value={formData.category} options={[{ value: 'Book', label: 'Book' }, { value: 'Comic Book', label: 'Comic Book' }, { value: 'Game', label: 'Game' }]} onChange={handleChange} />
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormsPage;
