import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Update() {
    let history = useHistory();

    const [id, setID] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setFirstName(localStorage.getItem('Job'));
        setLastName(localStorage.getItem('Title'));
        setCheckbox(localStorage.getItem('Checkbox Value'));
        setToken(localStorage.getItem('idToken'))
    }, []);

    const updateAPIData = () => {
        var modifiedData = {
            updateKey : "firstName",
            updateValue : firstName,
        }
        axios.patch(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/dev/product?id=${id}`, {
            header : {
                "Authorization" : token
            },
            modifiedData
        })
        history.push('/read')
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' checked={checkbox} onChange={() => setCheckbox(!checkbox)}/>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
