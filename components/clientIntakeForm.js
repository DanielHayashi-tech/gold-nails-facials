// I need to make note to integrate prisma client

import React from 'react';
import { Form, Button } from 'react-bootstrap';




export default function ClientIntakeForm() {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}> Client Intake Form </h1>
            <Form>
                <Form.Group className="p-4" >
                    <Form.Label>  first name: </Form.Label>
                    <Form.Control type="firstName"/>
                </Form.Group>
                <Form.Group className="p-4" >
                    <Form.Label> last name: </Form.Label>
                    <Form.Control type="lastName"/>
                </Form.Group>

                <Form.Group className="p-4" >
                    <Form.Label> phone number: </Form.Label>
                    <Form.Control type="lastName"/>
                </Form.Group>

                <Form.Group className="p-4" >
                    <Form.Label> email address: </Form.Label>
                    <Form.Control type="lastName"/>
                </Form.Group>

                <Form.Group className="p-4" >
                    <Form.Label> birthday: </Form.Label>
                    <Form.Control type="lastName"/>
                </Form.Group>

                <Form.Group className="p-3">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}