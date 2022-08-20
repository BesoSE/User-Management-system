import { Container,Col,Row } from "react-bootstrap"



const Footer = () => {


    return (
        <footer style={{background:"rgb(13, 18, 27)",  width: "100%", position:'fixed' , bottom:'0', height: '7vh'}}>
            <Container fluid={true}>
                <Row className="border-top p-3">
                    <Col className="text-center p-0 text-light" md={12} sm={12}>
                        User Management  &copy; 2022
                    </Col>
                  
                </Row>
            </Container>
        </footer>
 
    )
}

export default Footer