import { Container, Row, Col } from 'react-bootstrap'
import { MdContentCopy, MdKeyboardArrowRight, MdLocationOn, MdPhone, MdPhoneIphone } from "react-icons/md";
 

const Footer = () => {
    return (
        <>
            <footer className=' p-3 text-light align-content-center   ' style={{background:"#367ec1 "}}>
                <Container>
                    <Row className='align-items-center '>
                        <Col >
                            <h2 style={{ fontWeight: "bolder", marginBottom: "30px" }}>
                                CONTACT INFO
                            </h2>

                            <h4><MdContentCopy /> Lahore Branch</h4>
                            <h5><MdLocationOn /> 349 Ferozepur Road, Gulberg III, Lahore</h5>
                            <h5><MdPhone /> Phone : (042) 3544 1404, (042) 3544 1405</h5>
                            <h5><MdPhoneIphone /> Cell : 0300 1 387 387</h5>
                            <br />

                            <h4><MdContentCopy /> Online Classes</h4>
                            <h5><MdLocationOn /> 349 Ferozepur Road, Gulberg III, Lahore</h5>
                            <h5><MdPhone /> Phone : (042) 3544 1404, (042) 3544 14</h5>
                            <h5><MdPhoneIphone /> Cell : 0300 1 387 387</h5>
                        </Col>
                        <Col >
                            <h2 style={{ fontWeight: "bolder", marginBottom: "30px" }}>COURSES & CERTIFICATION </h2>

                            <h5 className="course-item"><MdKeyboardArrowRight /> C# & ASP .NET Core/ASP .NET MVC Course</h5>
                            <h5 className="course-item"><MdKeyboardArrowRight /> Front End Web Development Course</h5>
                            <h5 className="course-item"><MdKeyboardArrowRight /> Certified Graphics & Web Designer</h5>
                            <h5 className="course-item"><MdKeyboardArrowRight /> Certified SQL Server Specialist</h5>
                            <h5 className="course-item"><MdKeyboardArrowRight /> Essentials of Big Data & Hadoop Ecosystem</h5>
                            <h5 className="course-item"><MdKeyboardArrowRight /> Java & Spring Framework Development Course</h5>
                            <h5 className="course-item"><MdKeyboardArrowRight /> Xamarin Mobile App Development Course</h5>

                        </Col>

                        <Col >
                            <div style={{ width: "120px", height: "120px", paddingTop: "40px" }}>
                                <img
                                    src="/evss.png"
                                    alt="EVS Logo"
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                            </div>

                            <p style={{ fontSize: "1.2rem", textAlign: "justify" }}>

                                EVS Professional Training Institute is a leading IT training institute in Pakistan.
                                Founded in 2005 in Lahore, EVS expanded to Rawalpindi/Islamabad in 2008 and Faisalabad
                                in 2013. Over the past 20 years, EVS has trained more than 70,000 students in
                                information technology through 1,500+ batches of professional IT courses.
                                Many EVS graduates have secured jobs in top public and private sector organizations
                                across Pakistan. In recognition of its excellence, EVS won the prestigious
                                "Brand of the Year Award" in 2010 in the "IT Training" category.
                            </p>

                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}

export default Footer