import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FormInput, FormMultiSelect, FormRating, FormSelect, Bookshelf } from '../../components';``

const FormsPage = ({ onAddBook }) => {
  const [items, setItems] = useState([]);
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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { ...formData, genres: selectedGenres, id: Date.now() };
    onAddBook(newBook); // Add the new book to the books list
    navigate("/books");
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleGenreChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedGenres(values);
    setFormData((prevData) => ({
      ...prevData,
      genres: values
    }));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Add New Item</h2>
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
