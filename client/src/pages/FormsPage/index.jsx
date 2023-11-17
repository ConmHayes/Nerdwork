import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FormInput, FormMultiSelect, FormRating, FormSelect, NavigationBar } from '../../components';

const FormsPage = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    title: '',
    img: '',
    author: '',
    genres: [],
    owner: '',
    rating: 0,
    category: ''
  });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiBaseURL = 'https://nerdwork-server.onrender.com/item';
    const categoryPath = formData.category.toLowerCase().replace(' ', '%20');

    try {
      const response = await fetch(`${apiBaseURL}/${categoryPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any other headers your API expects, like authorization tokens
        },
        body: JSON.stringify({
          title: formData.title,
          img: formData.img,
          author: formData.author,
          genres: selectedGenres,
          owner: formData.owner,
          rating: formData.rating,
          // Include any other fields your API expects
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      onAddItem(result); // Add the new item to the list of items
      navigate(`/${categoryPath}`); // Navigate to the appropriate category page

      // Reset form data
      setFormData({
        title: '',
        img: '',
        author: '',
        genres: [],
        owner: '',
        rating: 0,
        category: ''
      });
      setSelectedGenres([]);
      setError(''); // Clear any errors
    } catch (error) {
      setError('There was a problem adding your item. Please try again.');
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleGenreChange = (e) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedGenres(values);
    setFormData(prevData => ({ ...prevData, genres: values }));
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
            <FormMultiSelect label="Genres" name="genres" selected={selectedGenres} options={['Fiction', 'Fantasy', 'Adventure']} onChange={handleGenreChange} />
            <FormInput label="Owner" type="text" placeholder="Enter owner's username" name="owner" value={formData.owner} onChange={handleChange} />
            <FormRating label="Rating" name="rating" value={formData.rating} onChange={handleChange} min={0} max={5} step={0.1} />
            <FormSelect label="Category" name="category" value={formData.category} options={[{ value: 'Book', label: 'Book' }, { value: 'Game', label: 'Game' }, { value: 'Comic Book', label: 'Comic Book' }]} onChange={handleChange} />
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormsPage;
