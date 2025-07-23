import React from 'react'
import './Modal.css';

function Modal({ message, onConfirm, onCancel }) {
    return (
        <div className='modalOverlay'>
            <div className="modalContent">
                <p>{message}</p>
                <div className="modalButtons">
                    <button className='cancel' onClick={onCancel}>Cancelar</button>
                    <button className='danger' onClick={onConfirm}>Eliminar</button>
                </div>
            </div>
        </div>
    );
}

export default Modal