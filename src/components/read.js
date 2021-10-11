import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Read(props) {

    const [APIData, setAPIData] = useState([]);
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    
    const queryParams = new URLSearchParams(window.location.hash.substr(1));

    const id = uuidv4();
    const date = new Date().toISOString();

    const idToken = queryParams.get('id_token');
    const AuthStr = 'Bearer '.concat(idToken); 

    let config = {
        headers: {
            "Authorization" : AuthStr
        }
    }

    useEffect(() => {
        axios.get(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/dev/products`)
        .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                } else {
                    console.log(response.data)
                }
                setAPIData(response.data);
            })
    }, [APIData]); 

    const postData = () => {
        var newPost = { id, title, detail, date }
        axios.post(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/dev/product`, newPost, config)
        .then((response) => {
            console.log(response.data)
            setAPIData(APIData)
        })
    }

    const onDelete = (id) => {
        axios.delete(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/dev/product?id=${id}`, {}, config)
        .then(() => {
            setAPIData(APIData.filter(d => d.id !== id));
        })
    }

    const setData = (data) => {
        let { id, title, detail } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('title', title);
        localStorage.setItem('detail', detail);
    }


    return (
        <Divider>
            <Form className="create-form">
                <Form.Field>
                    <label>Title</label>
                    <input placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Detail</label>
                    <textarea placeholder='Detail' onChange={(e) => setDetail(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Job</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row key={data.id}>
                                <Table.Cell>{data.title ? data.title : 'Deafult title'}</Table.Cell>
                                <Table.Cell>{data.detail ? data.detail : 'Something'}</Table.Cell>
                                <Table.Cell>{data.date}</Table.Cell>
                                <Table.Cell> 
                                    <Link to='/update'>
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </Divider>
    )
}
