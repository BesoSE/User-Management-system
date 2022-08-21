const Modal = ({showModal, setShowModal, deleteUser}) => {
    return (
        <>
            {showModal != null ? (
                <div style={{display:'flex', justifyContent: 'center'}}>
                    <div style={{border:'1px solid black', width:'40%', padding:'3%', marginBottom:'5%'}}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Are you sure you want to delete this user?</h5>

                                </div>

                                <div className="modal-footer">
                                    <button onClick={(e) => setShowModal(null)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                    </button>
                                    <button onClick={(e) => deleteUser(showModal)} type="button" className="btn btn-primary m-2">Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}


export default Modal
