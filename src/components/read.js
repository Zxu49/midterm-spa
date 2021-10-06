import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function Read() {
    const crypto = require("crypto");

    const id = crypto.randomBytes(16).toString("hex");
    const [APIData, setAPIData] = useState([]);
    const [title, setTitle] = useState('');
    const [job, setJob] = useState('');
    const [done, setCheckbox] = useState(false);

    const postData = () => {
        axios.post(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/dev/product`, {
            header : {
            },
            id,
            title,
            job,
        }).then(
            setAPIData(APIData)
        )
    }

    useEffect(() => {
        axios.get(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/dev/products`,
        {
            header : {
                "Authorization" : localStorage.getItem('idToken')
            }
        })
        .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                } else {
                    console.log(response.data)
                }
                setAPIData(response.data);
            })
    }, [APIData]);

    const onDelete = (id) => {
        axios.delete(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/dev/product?id=${id}`, 
        {   
            header : {
                "Authorization" : localStorage.getItem('idToken')
            },
            params : { "id" : id }
        }).then(() => {
            setAPIData(APIData.filter(d => d.id !== id));
        })
    }

    const setData = (data) => {
        let { id, title, job, done } = data;
        localStorage.setItem('ID', id)
        localStorage.setItem('Title', title);
        localStorage.setItem('Job', job);
        localStorage.setItem('Checkbox Value', done)
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
                <Form.Field>
                    <Checkbox label='I must finsh it somehow' onChange={(e) => setCheckbox(!done)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Job</Table.HeaderCell>
                        <Table.HeaderCell>Done</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.title ? data.title : 0}</Table.Cell>
                                <Table.Cell>{data.job ? data.job : 0}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'Done' : 'No Done'}</Table.Cell>
                                <Link to='/update'>
                                    <Table.Cell> 
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
      
        </div>
    )
}
