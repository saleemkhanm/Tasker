  import { Navbar, Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faUser,
  faGraduationCap,
  faHeart,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";

export default function SecondNavbar({ category }) {
  const getCategoryData = () => {
    switch (category.toLowerCase()) {
      case "work":
        return { title: "Work", icon: faBriefcase, color: "secondary" };
      case "personal":
        return { title: "Personal", icon: faUser, color: "primary" };
      case "learning":
        return { title: "Learning", icon: faGraduationCap, color: "info" };
      case "favourite":
        return { title: "Favourite", icon: faHeart, color: "danger" };
      default:
        return { title: "All Tasks", icon: faHome, color: "success" };
    }
  };

  const { title, icon, color } = getCategoryData();

  return (
    <Navbar bg="light" className="shadow-sm mt-2">
      <Container>
        <Row className="align-items-center w-100">
          <Col xs="auto">
            <Button variant="link" className="p-0 me-2">
              <FontAwesomeIcon icon={faBarsStaggered} size="lg" className={`text-${color}`} />
            </Button>
          </Col>
          <Col>
            <h5 className={`mb-0 fw-semibold fs-4 text-${color}`}>
              <FontAwesomeIcon icon={icon} className="me-2" />
              {title}
            </h5>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}
