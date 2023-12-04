import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';

import './address.css';

function address() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div>
            <Button className="btn" variant="outline-primary" onClick={handleShow}>outline-primary</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>버튼</Modal.Title>
                </Modal.Header>
                <Modal.Body>데이터</Modal.Body>
                <Modal.Footer>
                    <Button className="btn_close" variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default address;