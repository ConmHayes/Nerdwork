import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Log formData whenever it changes
    console.log("Form data updated:", formData);
  }, [formData]); // Dependency array includes formData

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data to be sent
    const dataToSend = {
      ...formData,
      genre: selectedgenre, 
      issue_num: parseInt(formData.issue_num, 10), 
      user_id: parseInt(formData.user_id, 10), 
      rating: parseFloat(formData.rating) 
    };
  
    try {
      const response = await fetch('https://nerdwork-server.onrender.com/item/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        const errorBody = await response.json(); // Assuming the server sends a JSON response
        throw new Error(`HTTP error! status: ${response.status}, Message: ${errorBody.message}`);
      }
      
  
      const result = await response.json();
      console.log(result);
      onAddBook(result);
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
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
          <h2>Add New Item</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormInput label="Title" type="text" placeholder="Enter title" name="title" value={formData.title} onChange={handleChange} />
            <FormInput label="Image URL" type="text" placeholder="Enter image URL" name="img" value={formData.img} onChange={handleChange} />
            <FormInput label="Author" type="text" placeholder="Enter author's name" name="author" value={formData.author} onChange={handleChange} />
            <FormMultiSelect label="Genres" name="genre" selected={selectedgenre} options={['Cyberpunk', 'Superhero', 'Romance', 'Adventure', 'Thriller', 'Survival', 'Sport', 'Mecha', 'Musical','Other']} onChange={handleGenreChange} />
            <FormInput label="Issue Number" type="text" placeholder="Enter issue number" name="issue_num" value={formData.issue_num} onChange={handleChange} />
            <FormInput label="Username" type="text" placeholder="Enter username" name="user_id" value={formData.user_id} onChange={handleChange} />
            <FormRating label="Rating" name="rating" value={formData.rating} onChange={handleChange} min={0} max={5} step={0.1} />
            <FormSelect label="Category" name="category" value={formData.category} options={[{ value: 'book', label: 'Book' }, { value: 'comic book', label: 'Comic Book' }, { value: 'game', label: 'Game' }]} onChange={handleChange} />
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormsPage;
