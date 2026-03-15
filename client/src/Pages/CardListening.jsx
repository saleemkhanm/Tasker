
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import CardItem from "../Pages/Card.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import TaskModal from "../Components/Modals/TaskModal.jsx";

export default function CardListing({ item, category }) {
  const [showTask, setShowTask] = useState(false);

  return (
    <>
      <Container className="mt-4 ">
        {item && item.length > 0 ? (
          <Row className="g-4 justify-content-center">
            {item.map((task) => (
              <Col key={task._id} xs={12} sm={6} lg={4}>
                <CardItem task={task} />
              </Col>
            ))}
          </Row>
        ) : (
          <Container className="text-center mt-5 w-50">
            <Card className="p-5 shadow">
              <h2>No Tasks in {category}</h2>
              <Button onClick={() => setShowTask(true)}>
                <FontAwesomeIcon icon={faPlus} /> Create Task
              </Button>
            </Card>
          </Container>
        )}
      </Container>

      <TaskModal show={showTask} handleClose={() => setShowTask(false)} />
    </>
  );
}
