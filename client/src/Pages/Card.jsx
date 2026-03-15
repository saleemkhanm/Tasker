
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Badge } from "react-bootstrap";
import {
  faTrashCan,
  faPenToSquare,
  faCalendar,
  faClock,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck, faStar } from "@fortawesome/free-regular-svg-icons";
import TaskModal from "../Components/Modals/TaskModal";

export default function CardItem({ task, onFavouriteChange }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const getCategoryColor = () => {
    const category = task?.categoryId?.name?.toLowerCase();
    if (category === "work") return "purple";
    if (category === "personal") return "pink";
    if (category === "learning") return "green";
    return "gray";
  };
  const categoryColor = getCategoryColor();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    const favKey = `favourites_${user._id}`;
    const favourites = JSON.parse(localStorage.getItem(favKey)) || [];
    setIsFavourite(favourites.includes(task._id));
  }, [task._id]);

  const handleFavourite = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please login first");

    const favKey = `favourites_${user._id}`;
    const taskStorageKey = `saved_tasks_${user._id}`;
    
    let favourites = JSON.parse(localStorage.getItem(favKey)) || [];
    let savedTasks = JSON.parse(localStorage.getItem(taskStorageKey)) || [];

    if (isFavourite) {
      favourites = favourites.filter((id) => id !== task._id);
      savedTasks = savedTasks.filter((t) => t._id !== task._id);
      setIsFavourite(false);
      if (onFavouriteChange) onFavouriteChange(task, false);
    } else {
      if (!favourites.includes(task._id)) {
        favourites.push(task._id);
        savedTasks.push(task);
      }
      setIsFavourite(true);
      if (onFavouriteChange) onFavouriteChange(task, true);
    }

    localStorage.setItem(favKey, JSON.stringify(favourites));
    localStorage.setItem(taskStorageKey, JSON.stringify(savedTasks));
  };

  const handleDelete = async (id) => {
    if (!id) return alert("Task Id NOT Found");
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      await fetch(`http://localhost:3000/api/v1/tasker/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      // SYNC LOCAL STORAGE ON DELETE
      if (user) {
        const favKey = `favourites_${user._id}`;
        const taskKey = `saved_tasks_${user._id}`;
        let favourites = JSON.parse(localStorage.getItem(favKey)) || [];
        let savedTasks = JSON.parse(localStorage.getItem(taskKey)) || [];
        localStorage.setItem(favKey, JSON.stringify(favourites.filter(fId => fId !== id)));
        localStorage.setItem(taskKey, JSON.stringify(savedTasks.filter(t => t._id !== id)));
      }

      alert("Task Deleted Successfully!");
      window.location.reload();
    } catch (error) {
      alert("Error deleting task");
    }
  };

  const handleEdit = () => {
    setTaskToEdit(task);
    setShowTask(true);
  };

  const formattedDate = task?.dueDate ? new Date(task.dueDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "No Date";
  const formattedTime = task?.dueTime ? new Date(`1970-01-01T${task.dueTime}`).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) : "No Time";

  return (
    <>
      <Card className="border-0 shadow mb-4">
        <Card.Body>
          <Card.Title className="fs-3 fw-bold text-primary">{task?.title}</Card.Title>
          <div className="d-flex mb-2">
            <FontAwesomeIcon icon={faCalendar} className="me-2" /> {formattedDate}
            <FontAwesomeIcon icon={faClock} className="ms-4 me-2" /> {formattedTime}
          </div>
          <Card.Text>{task?.description}</Card.Text>
          <div className="mb-3">
            <FontAwesomeIcon icon={faCircleNotch} className="me-2" /> {task?.progress}%
            <FontAwesomeIcon icon={faCircleCheck} className="ms-4 me-2" />
            <Badge bg="success">{task?.statusId?.name || "Status"}</Badge>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <FontAwesomeIcon icon={faPenToSquare} className="me-4" style={{ cursor: "pointer", color: categoryColor }} onClick={handleEdit} />
              <FontAwesomeIcon icon={faTrashCan} style={{ cursor: "pointer", color: categoryColor }} onClick={() => handleDelete(task._id)} />
            </div>
            <FontAwesomeIcon
              icon={isFavourite ? solidStar : faStar}
              style={{ cursor: "pointer", color: isFavourite ? "gold" : categoryColor }}
              onClick={handleFavourite}
            />
          </div>
        </Card.Body>
      </Card>
      <TaskModal show={showTask} handleClose={() => setShowTask(false)} taskToEdit={taskToEdit} />
    </>
  );
}