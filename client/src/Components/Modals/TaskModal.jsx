
import { useEffect, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const initialState = {
  title: { Value: "", Valid: false },
  dueDate: { Value: "", Valid: false },
  dueTime: { Value: "", Valid: false },
  description: { Value: "", Valid: false },
  progress: { Value: "", Valid: false },
  statusId: { Value: "", Valid: false },
  categoryId: { Value: "", Valid: false },
};

export default function TaskModal({ show, handleClose, taskToEdit }) {
  const [data, setData] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (show) {
      fetchCategories();
      fetchStatus();
    }
  }, [show]);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3000/api/v1/category");
    const result = await res.json();
    if (res.ok) setCategories(result.data || result);
  };

  const fetchStatus = async () => {
    const res = await fetch("http://localhost:3000/api/v1/status");
    const result = await res.json();
    if (res.ok) setStatus(result.data || result);
  };

  useEffect(() => {
    if (taskToEdit) {
      setData({
        title: { Value: taskToEdit.title || "", Valid: true },
        dueDate: { Value: taskToEdit.dueDate ? taskToEdit.dueDate.split("T")[0] : "", Valid: true },
        dueTime: { Value: taskToEdit.dueTime || "", Valid: true },
        description: { Value: taskToEdit.description || "", Valid: true },
        progress: { Value: `${taskToEdit.progress}%`, Valid: true },
        statusId: { Value: taskToEdit.statusId?._id || taskToEdit.statusId || "", Valid: true },
        categoryId: { Value: taskToEdit.categoryId?._id || taskToEdit.categoryId || "", Valid: true },
      });
    } else {
      setData(initialState);
    }
  }, [taskToEdit, show]);

  const handleChange = (field, validator) => (e) => {
    const value = e.target.value;
    setData((prev) => ({ ...prev, [field]: { Value: value, Valid: validator(value) } }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const isValidForm = Object.values(data).every((f) => f.Valid);
    if (!isValidForm) return alert("Please fill all fields correctly");

    const payload = {
      title: data.title.Value,
      description: data.description.Value,
      dueDate: data.dueDate.Value,
      dueTime: data.dueTime.Value,
      progress: parseInt(data.progress.Value.replace("%", ""), 10),
      statusId: data.statusId.Value,
      categoryId: data.categoryId.Value,
      userId: user?._id,
    };

    const url = taskToEdit ? `http://localhost:3000/api/v1/tasker/${taskToEdit._id}` : "http://localhost:3000/api/v1/tasker";
    const method = taskToEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      // Logic to Update LocalStorage Favourites if needed
      if (taskToEdit && user) {
        const taskKey = `saved_tasks_${user._id}`;
        let savedTasks = JSON.parse(localStorage.getItem(taskKey)) || [];
        const index = savedTasks.findIndex(t => t._id === taskToEdit._id);
        if (index !== -1) {
          savedTasks[index] = { ...savedTasks[index], ...payload };
          localStorage.setItem(taskKey, JSON.stringify(savedTasks));
        }
      }

      alert(taskToEdit ? "Task Updated Successfully!" : "Task Created Successfully!");
      handleClose();
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{taskToEdit ? "Edit Task" : "New Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control value={data.title.Value} onChange={handleChange("title", (v) => v.length >= 3)} />
          </Form.Group>
          <Row className="mb-3">
            <Col><Form.Label>Date</Form.Label><Form.Control type="date" value={data.dueDate.Value} onChange={handleChange("dueDate", (v) => !!v)} /></Col>
            <Col><Form.Label>Time</Form.Label><Form.Control type="time" value={data.dueTime.Value} onChange={handleChange("dueTime", (v) => !!v)} /></Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" value={data.description.Value} onChange={handleChange("description", (v) => v.length >= 5)} />
          </Form.Group>
          <Row className="mb-3">
            <Col>
              <Form.Label>Progress</Form.Label>
              <Form.Select value={data.progress.Value} onChange={handleChange("progress", (v) => !!v)}>
                <option value="">Select</option>
                <option value="0%">0%</option><option value="25%">25%</option>
                <option value="50%">50%</option><option value="75%">75%</option>
                <option value="100%">100%</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Status</Form.Label>
              <Form.Select value={data.statusId.Value} onChange={handleChange("statusId", (v) => !!v)}>
                <option value="">Select</option>
                {status.map((s) => (<option key={s._id} value={s._id}>{s.name}</option>))}
              </Form.Select>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select value={data.categoryId.Value} onChange={handleChange("categoryId", (v) => !!v)}>
              <option value="">Select</option>
              {categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
            </Form.Select>
          </Form.Group>
          <div className="text-end">
            <Button type="submit">{taskToEdit ? "Update Task" : "Save Task"}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}