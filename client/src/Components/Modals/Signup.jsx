
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    name: { value: "", error: "", valid: false },
    email: { value: "", error: "", valid: false },
    phone: { value: "", error: "", valid: false },
    password: { value: "", error: "", valid: false },
    img: { value: null, error: "", valid: false },
  });

  const handleNameChange = (e) => {
    const value = e.target.value.trim();
    const isValid = value.length >= 3 && value.length <= 30;
    setFormData((prev) => ({
      ...prev,
      name: { value, error: isValid ? "" : "Name must be 3-30 characters", valid: isValid },
    }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(value);
    setFormData((prev) => ({
      ...prev,
      email: { value, error: isValid ? "" : "Invalid email", valid: isValid },
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value.trim();
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const isValid = regex.test(value);
    setFormData((prev) => ({
      ...prev,
      password: { value, error: isValid ? "" : "Weak password", valid: isValid },
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.trim();
    const regex = /^03[0-9]{9}$/;
    const isValid = regex.test(value);
    setFormData((prev) => ({
      ...prev,
      phone: { value, error: isValid ? "" : "Invalid phone", valid: isValid },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      img: { value: file || null, error: "", valid: !!file },
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Client-side Validation Check
  const allValid =
    formData.name.valid &&
    formData.email.valid &&
    formData.phone.valid &&
    formData.password.valid &&
    formData.img.valid;

  if (!allValid) {
    alert("Please fix all errors before submitting.");
    return;
  }

  // 2. Prepare FormData
  const formDataObj = new FormData();
  formDataObj.append("name", formData.name.value);
  formDataObj.append("email", formData.email.value);
  formDataObj.append("password", formData.password.value);
  formDataObj.append("contact", formData.phone.value); 

  if (formData.img.value) {
    formDataObj.append("img", formData.img.value);
  } else {
    console.log("No image file selected, submitting without image.");
  }


  // 3. API Call
  try {
    const res = await fetch("http://localhost:3000/api/v1/users/signup", {
      method: "POST",
      body: formDataObj, //  Do NOT set Content-Type header when sending FormData
    });

    if (res.ok) {
      alert("User created Successfully");
      handleClose();
    } else {
      // Check if the response body is JSON first
      const contentType = res.headers.get("content-type");
      let message = "Something wrong"; 

      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        message = errorData.message || JSON.stringify(errorData); // Display the server error message
      } else {
        message = await res.text();
      }

      alert(`Signup Failed: ${message}`);
      console.error("Signup error response:", message);
    }
  } catch (error) {
    alert("An unknown error occurred. Check network connection.");
    console.error("Signup error:", error);
  }
};

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Title className="w-100 p-3 bg-primary text-white">Signup</Modal.Title>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* NAME */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name.value}
              onChange={handleNameChange}
            />
            <Form.Text className="text-danger">{formData.name.error}</Form.Text>
          </Form.Group>

          {/* EMAIL */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email.value}
              onChange={handleEmailChange}
            />
            <Form.Text className="text-danger">{formData.email.error}</Form.Text>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.password.value}
                  onChange={handlePasswordChange}
                />
                <Form.Text className="text-danger">{formData.password.error}</Form.Text>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.phone.value}
                  onChange={handlePhoneChange}
                />
                <Form.Text className="text-danger">{formData.phone.error}</Form.Text>
              </Form.Group>
            </Col>
          </Row>

          {/* IMAGE */}
          <Form.Group className="mb-3">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
             type="file" 
            onChange={handleImageChange} 
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Signup;

