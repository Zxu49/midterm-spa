import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Divider, Form, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function Read(props) {
    const crypto = require("crypto");


    const id = crypto.randomBytes(16).toString("hex");
    const [APIData, setAPIData] = useState([]);
    const [title, setTitle] = useState('');
    const [job, setJob] = useState('');
    const [done, setCheckbox] = useState(false);
    const current = new Date();
    const date = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;
    const queryParams = new URLSearchParams(window.location.hash.substr(1));
    const idToken = queryParams.get('id_token');
    const accessToken = queryParams.get('access_token');
    const AuthStr = 'Bearer '.concat(idToken); 

    let config = {
        headers: {
            "Authorization" : AuthStr
        }
    }

    useEffect(() => {
        axios.get(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/prod/products`, {} , config)
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
        var newPost = { id, title, job, date}
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
        let { id, title, job, done } = data;
        localStorage.setItem('ID', id)
        localStorage.setItem('Title', title);
        localStorage.setItem('Job', job);
        localStorage.setItem('Checkbox Value', done)
        localStorage.setItem('IdToken', idToken)
    }


    return (
        <Divider>
            <Form className="create-form">
                <Form.Field>
                    <label>Title</label>
                    <input placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Job</label>
                    <input placeholder='Job' onChange={(e) => setJob(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='Done' onChange={(e) => setCheckbox(!done)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Job</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Done</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row key={data.id}>
                                <Table.Cell>{data.title ? data.title : 'Deafult title'}</Table.Cell>
                                <Table.Cell>{data.job ? data.job : 'Something'}</Table.Cell>
                                <Table.Cell>{data.date}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'Done' : 'No Done'}</Table.Cell>
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
