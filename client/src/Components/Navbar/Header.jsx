
import Container from "react-bootstrap/Container"; 
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import Signup from "../../Components/Modals/Signup";
import Login from "../../Components/Modals/Login";
import TaskModal from "../Modals/TaskModal";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faUser,
  faGraduationCap,
  faHeart,
  faPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../Components/Store/UserSlice";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showTask, setShowTask] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const activeClass = "fw-bold text-success"; // Bootstrap class for active link

  return (
    <>
      <Navbar expand="lg" bg="light" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            <img src="/evs.png" width="100" alt="Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                to="/"
                className={({ isActive }) => (isActive ? activeClass : "")}
              >
                <FontAwesomeIcon icon={faHome} className="me-1 text-success" />
                All Tasks
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/work"
                className={({ isActive }) => (isActive ? activeClass : "")}
              >
                <FontAwesomeIcon icon={faBriefcase} className="me-1 text-secondary" />
                Work
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/personal"
                className={({ isActive }) => (isActive ? activeClass : "")}
              >
                <FontAwesomeIcon icon={faUser} className="me-1 text-primary" />
                Personal
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/learning"
                className={({ isActive }) => (isActive ? activeClass : "")}
              >
                <FontAwesomeIcon icon={faGraduationCap} className="me-1 text-info" />
                Learning
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/favourite"
                className={({ isActive }) => (isActive ? activeClass : "")}
              >
                <FontAwesomeIcon icon={faHeart} className="me-1 text-danger" />
                Favourite
              </Nav.Link>
            </Nav>

            <div className="d-flex align-items-center gap-3">
              {user ? (
                <>
                  <Image
                    src={`http://localhost:3000/uploads/${user.img}`}
                    roundedCircle
                    width="40"
                    height="40"
                    alt="User"
                  />

                  <NavDropdown title={user.name || "Guest"} id="basic-nav-dropdown">
                    <NavDropdown.Item as={NavLink} to={`/users/${user._id}`}>
                      View Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => dispatch(logout())}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Button variant="primary" onClick={() => setShowTask(true)}>
                    <FontAwesomeIcon icon={faPlus} className="me-1" />
                    Add Task
                  </Button>
                </>
              ) : (
                <>
                  <button
                    className="text-primary fw-bold px-3 py-2 rounded border border-primary bg-white"
                    onClick={() => setShowLogin(true)}
                  >
                    LOGIN
                  </button>

                  <button
                    className="btn btn-primary text-white fw-bold px-3 py-2 rounded"
                    onClick={() => setShowSignup(true)}
                  >
                    SIGNUP
                  </button>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modals */}
      <TaskModal show={showTask} handleClose={() => setShowTask(false)} />
      <Login show={showLogin} handleClose={() => setShowLogin(false)} />
      <Signup show={showSignup} handleClose={() => setShowSignup(false)} />
    </>
  );
};

export default Header;
                                                                                                                                                                                                                                                                                                        