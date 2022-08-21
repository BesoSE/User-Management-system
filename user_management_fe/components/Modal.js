import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalComp = ({showModal, handleShow, handleClose, deleteUser, user_id}) => {

    return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={(e) => {deleteUser(user_id);}}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
    );
}
export default ModalComp
