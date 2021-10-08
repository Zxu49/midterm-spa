import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Create() {
    let history = useHistory();
    const crypto = require("crypto");
    const id = crypto.randomBytes(16).toString("hex");
    const [title, setTitle] = useState('');
    const [job, setJob] = useState('');

    const postData = async() => {
        axios.post(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/prod/product`, {
            id,
            title,
            job,
        })
        history.push('/read')
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Title</label>
                    <input placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Job</label>
                    <input placeholder='Job' onChange={(e) => setJob(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}