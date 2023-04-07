import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPasswordForm({ onCancel }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      alert("Password reset email sent. Check your inbox.");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      {error && <p className="text-danger mb-3">{error}</p>}
      <Button
        variant="light"
        type="submit"
        className="btn-block custom-button"
        style={{ backgroundColor: "#FFE1F8", fontSize: '25px' }}
      >
        Send Reset Email
      </Button>
      <Button
        variant="light"
        className="btn-block custom-button mt-2"
        onClick={onCancel}
        style={{ backgroundColor: '#FFE1F8', fontSize: '18px' }}
      >
        Cancel
      </Button>
    </Form>
  );
}
