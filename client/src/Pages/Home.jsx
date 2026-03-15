
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import TaskModal from "../Components/Modals/TaskModal";
import Login from "../Components/Modals/Login";
import CardListing from "../Pages/CardListening";
import SecondNavbar from "./SecondNavbar";

export default function Home() {
  const [showTask, setShowTask] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [item, setItem] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowTask(true);
  };

  const fetchTasks = async () => {
    if (!user?._id) return;
    try {
      const res = await fetch(`http://localhost:3000/api/v1/tasker/getUser/${user._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setItem(data.data || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return (
    <>
      {user && <SecondNavbar category="All Tasks" />}
      {user ? (
        <CardListing item={item} category="All Tasks" />
      ) : (
        <Container className="mt-5 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
          <Card className="shadow-lg p-5 text-center rounded-4" style={{ maxWidth: "600px" }}>
            <Card.Body>
              <div className="mb-4"><i className="fa-solid fa-hand-wave fs-1 text-primary"></i></div>
              <h1 className="fw-bold mb-3">Welcome to Task Manager</h1>
              <p className="text-secondary fs-5">
                Manage your daily tasks easily and stay productive. Please log in to access your dashboard and start organizing your work.
              </p>
              <Button variant="primary" size="lg" className="px-4 mt-3" onClick={() => setShowLogin(true)}>
                Login to Continue
              </Button>
            </Card.Body>
          </Card>
        </Container>
      )}

      <TaskModal show={showTask} handleClose={() => setShowTask(false)} taskToEdit={taskToEdit} />
      <Login show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
}
