import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// React Bootstrap
import { Card, Row, Col, Button, Container } from "react-bootstrap";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

// Custom Components
import CardListing from "../Pages/CardListening";
import TaskModal from "../Components/Modals/TaskModal";
import Login from "../Components/Modals/Login";
import SecondNavbar from "./SecondNavbar";

export default function Learning() {
  const [showTask, setShowTask] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [items, setItems] = useState([]);

  const { user } = useSelector((state) => state.user);

  const fetchCategoryTasks = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/tasker/category/6943e46c1cef725c734980ac?userId=${user._id}`
      );

      if (!res.ok) throw new Error("Failed to Fetch Tasks");

      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCategoryTasks();
  }, []);

  return (
    <>
      {user ? (
        <>
          {/* Category Header
          <Card className="mt-2 mx-3 shadow">
            <Card.Body>
              <Row className="align-items-center">
                <Col xs="auto">
                  <Button variant="link" className="p-0 me-2">
                    <FontAwesomeIcon
                      icon={faBarsStaggered}
                      size="lg"
                      className="text-primary"
                    />
                  </Button>
                </Col>
                <Col>
                  <h5 className="mb-0 fw-semibold fs-4 text-primary">
                    Category Tasks
                  </h5>
                </Col>
              </Row>
            </Card.Body>
          </Card> */}
          {user && <SecondNavbar category="Learning" />}

          {/* CardListing handles empty state */}
          <CardListing item={items} category={"Learning"} />

        </>
      ) : (
        <Container
          fluid
          className="mt-5 d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "75vh" }}
        >
          <Card
            className="shadow-lg p-5 text-center rounded-4"
            style={{ maxWidth: "600px" }}
          >
            <Card.Body>
              <div className="mb-4">
                <i className="fa-solid fa-hand-wave fs-1 text-primary"></i>
              </div>
              <h1 className="fw-bold mb-3">Welcome to Task Manager</h1>
              <p className="text-secondary fs-5">
                Manage your daily tasks easily and stay productive. Please log in to access
                your dashboard and start organizing your work.
              </p>
              <Button
                variant="primary"
                size="lg"
                className="px-4 mt-3"
                onClick={() => setShowLogin(true)}
              >
                <FontAwesomeIcon icon={faRightToBracket} className="me-2" />
                Login to Continue
              </Button>
            </Card.Body>
          </Card>
        </Container>
      )}

      {/* Modals */}
      <TaskModal show={showTask} handleClose={() => setShowTask(false)} />
      <Login show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
}
