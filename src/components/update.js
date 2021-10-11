import React, { useState, useEffect } from 'react';

import { Button, Form } from 'semantic-ui-react'
import { useHistory } from 'react-router';

import axios from 'axios';

export default function Update() {
    let history = useHistory();

    const [id, setID] = useState(null);
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('id'))
        setTitle(localStorage.getItem('title'));
        setDetail(localStorage.getItem('detail'));
    }, []);

    const updateAPIData = () => {
        axios.patch(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/dev/product?id=${id}`, {
            updateKey : "title",
            updateValue : title
        })
        axios.patch(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/dev/product?id=${id}`, {
            updateKey : "detail",
            updateValue : detail
        })
        history.push('/read')
    }

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Title</label>
                    <input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Detail</label>
                    <input placeholder='Detail' value={detail} onChange={(e) => setDetail(e.target.value)}/>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
