import {Col, Container, Row} from "react-bootstrap"
import Link from "next/link";

const NavBar = () => {


    return (

        <nav style={{background:"rgb(13, 18, 27)",  width: "100%", position:'fixed' , top:'0', height: '7vh'}}>
            <Container fluid={true}>
                <Row className="border-top p-3">
                    <Col className="text-light" md={12} sm={12}>
                       <Link href={'/'} > User Management System </Link>
                    </Col>

                </Row>
            </Container>
        </nav>
       
                 

    )
}

export default NavBar
