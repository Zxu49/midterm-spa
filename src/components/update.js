import React, { useState, useEffect } from 'react';

import { Label, Input, Button, Container, Form, Header, Icon, Divider, Segment, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import axios from 'axios';

export default function Update() {
    const [id, setID] = useState(null);
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [idToken, setToken] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('id'))
        setTitle(localStorage.getItem('title'));
        setDetail(localStorage.getItem('detail'));
        setToken(localStorage.getItem('id_token'));
    }, []);

    let config = {
        headers: {
            "Authorization" : 'Bearer '.concat(idToken) 
        }
    }

    const updateAPIData = () => {
        axios.patch(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/prod/product?id=${id}`, {
            updateKey : "title",
            updateValue : title
        }, config)
        .catch((err) => {
            console.log(err)
        })
        axios.patch(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/prod/product?id=${id}`, {
            updateKey : "detail",
            updateValue : detail
        }, config) 
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <Container>
            <Divider hidden clearing />
            <Header as="h1" floated="left">
            <Icon name="react" /> Update Page
            </Header>
            <Divider hidden clearing />
            <Segment className="sideBar" textAlign="left">
            <Form className="create-form">
                <Form.Field>
                    <Label>Title</Label>
                    <Input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Label>Detail</Label>
                    <TextArea placeholder='Detail' value={detail} onChange={(e) => setDetail(e.target.value)}/>
                </Form.Field>
                <Link to='/read'>
                    <Button color="blue" type='submit' onClick={updateAPIData}>Update</Button>
                </Link>
            </Form>
            </Segment>
        </Container>
    )
}
