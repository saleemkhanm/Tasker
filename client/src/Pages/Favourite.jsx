
import { useEffect, useState } from "react";
import CardItem from "./Card";
import { Container, Row, Col } from "react-bootstrap";

export default function Favourite() {
  const [tasks, setTasks] = useState([]);

  const loadFavourites = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    const favTasks = JSON.parse(localStorage.getItem(`saved_tasks_${user._id}`)) || [];
    setTasks(favTasks);
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  const handleFavouriteChange = (task, isFav) => {
    if (!isFav) {
      // Remove from UI immediately when unfavourited
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="fw-bold text-primary">My Favourite Tasks</h2>
      <hr />
      {tasks.length === 0 ? (
        <div className="text-center mt-5">
          <p className="text-muted fs-5">You have no favourites yet.</p>
        </div>
      ) : (
        <Row className="g-4">
          {tasks.map((task) => (
            <Col key={task._id} xs={12} sm={6} lg={4}>
              <CardItem task={task} onFavouriteChange={handleFavouriteChange} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}