import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function Read() {
    const crypto = require("crypto");
    const id = crypto.randomBytes(16).toString("hex");
    const [APIData, setAPIData] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const postData = async() => {
        axios.post(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/dev/product`, {
            "id" : id,
            "firstName" : firstName,
            "lastName" : lastName,
            "checkbox" : checkbox 
        }).then(
            window.location.reload()
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
    }, []);

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
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id)
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox)
    }


    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setCheckbox(!checkbox)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Checkbox Value</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.firstName ? data.firstName : 0}</Table.Cell>
                                <Table.Cell>{data.lastName ? data.lastName : 0}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
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
