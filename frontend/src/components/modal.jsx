import React, { useEffect } from 'react'
import '../styles/Modal.css' // Estilos CSS para el modal

export default function Modal({ isOpen, onClose, message, type, children }) {

  if (!isOpen) {
    return null
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [message, onClose])

  const styles = {
    container: {
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    success: {
      backgroundColor: '#53af47',
    },
    error: {
      backgroundColor: '#c23030',
    },
  }

  const messageStyle = type === 'success' ? styles.success : styles.error

  return (
    <>
      { message ? (
        <div className='modal-message-overlay' onClick={onClose}>
          <div style={{...styles.container, ...messageStyle}} onClick={(e) => e.stopPropagation()}>
            <button className='modal-message-close' onClick={onClose}>
              &times;
            </button>
            {message}
          </div>
        </div>
      ) : ( 
        <div className='modal-overlay' onClick={onClose}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button className='modal-close' onClick={onClose}>
              &times;
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  )
}