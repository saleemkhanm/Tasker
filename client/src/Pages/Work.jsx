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

export default function Work() {

    const [showLogin, setShowLogin] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const { user } = useSelector((state) => state.user);
    const [items, setItems] = useState([]);

    const fetchCategoryTasks = async () => {

        try {

            const res = await fetch(
                `http://localhost:3000/api/v1/tasker/category/6943e4561cef725c734980aa?userId=${user._id}`

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

                    {user && <SecondNavbar category="Work" />}

                    {/* CardListing handles empty state */}
                    <CardListing item={items} category="Work" />
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
                                Manage your daily tasks easily and stay productive. Please log
                                in to access your dashboard and start organizing your work.
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

            <TaskModal show={showTask} handleClose={() => setShowTask(false)} />
            <Login show={showLogin} handleClose={() => setShowLogin(false)} />
        </>
    );

}
