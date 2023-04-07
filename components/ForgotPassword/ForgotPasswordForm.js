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
    <div>
      <Form onSubmit={handleSubmit} className="">
        <Form.Group controlId="formBasicEmail" className="grid place-content-start md:place-content-center">
          <Form.Label className='text-center pt-10'

          >Email address</Form.Label>
          <Form.Control
            type="email"
            className="w-96 text-center "
            style={{ backgroundColor: "#FFE1F8" }}

            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </Form.Group>
        <br></br>
        <div className="pt-10">

          {error && <p className="text-danger mb-3">{error}</p>}
          <Button
            variant="light"
            type="submit"
            className="btn-block custom-button mt-2  "
            style={{ backgroundColor: "#FFE1F8", fontSize: '18px' }} >
            Send Reset Email
          </Button>
        </div>

        <Button
          variant="light"
          className="btn-block custom-button mt-2 absolute bottom-3 right-4"
          onClick={onCancel}
          style={{ backgroundColor: '#FFE1F8', fontSize: '18px' }}>
          Cancel
        </Button>
      </Form>

    </div>

  );
}
