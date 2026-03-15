import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { login } from "../Store/UserSlice";

export default function LoginModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: { Value: "", Error: "Required", Valid: false },
    password: { Value: "", Error: "Required", Valid: false },
  });

  function handleEmailChange(e) {
    const value = e.target.value.trim();
    const emailRegex = /^[^@s]+@[^@s]+.[^@s]+$/;
    const isValid = emailRegex.test(value);
    setFormData((prev) => ({
      ...prev,
      email: {
        Value: e.target.value,
        Error: isValid ? "" : "Invalid email address",
        Valid: true,
      },
    }));
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    const len = value.length;
    const isValid = len > 6 && len < 30;
    setFormData((prev) => {
      return {
        ...prev,
        password: {
          Value: e.target.value,
          Error: isValid ? "" : "Enter valid Password",
          Valid: true,
        },
      };
    });
  }

  const handleLogin = async () => {
    const email = formData.email.Value;
    const password = formData.password.Value;
    if (!email || !password) {
      return alert(`Please fill the required fields`);
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "Post",
        // 1 headers backend ko batate hain ke request kis format me bheji ja rahi hai.
        // 2 Content-Type: "application/json" se backend samajh jata hai ke body JSON hai aur usko JSON ke tor par parse karna hai.
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        dispatch(login(data.user));
        localStorage.setItem("token", data.token);
        alert(`Login  Successfully from Frontend !`);
        handleClose();
      } else {
        console.error(data.message || "Something went wrong");
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Server error:", error);
      alert("Server error, please try again later");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ background: "blue", color: "white" }}
        >
          <Modal.Title>
            User Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-center">
              <Col md={9}>
                <Form>
                  <Form.Group className="mb-4 mt-3" controlId="formEmail">
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={"fa fa-id-card"} />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email.Value}
                        onChange={handleEmailChange}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fa fa-lock"></i>
                        <FontAwesomeIcon icon={"fa fa-lock"} />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Enter Your Password"
                        value={formData.password.Value}
                        onChange={handlePasswordChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
