import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './Modal.module.css';

function CustomModal({ isOpen, closeModal, handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={`${styles.modal} ${isOpen ? styles.active : ''}`}
    >
    
    <div className={styles['modal-content']}>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
       <div className={styles['button-container']}>
      <button onClick={() => handleLogin(username, password)}>Login</button>
      <button className="cancel" onClick={closeModal}>Cancel</button>
      </div>
      </div>

    </Modal>
  );
}

export default CustomModal;
