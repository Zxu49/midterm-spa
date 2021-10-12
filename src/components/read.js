import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Divider, Header, Icon, Segment, Container, Button, Form, Input, Label, Table, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    
    const queryParams = new URLSearchParams(window.location.hash.substr(1));
    const idToken = queryParams.get('id_token') !== null ? queryParams.get('id_token') : localStorage.getItem('id_token');
    const authstr = 'Bearer '.concat(idToken); 

    let config = {
        headers: {
            "Authorization" : authstr
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
                const sorted = [].concat(response.data.sort((a, b) => new Date(a.date) - new Date(b.date) < 0 ? 1 : -1))
                setAPIData(sorted);
            }).catch((err) => {
                console.log(err)
            })
    }, [APIData]); 

    const postData = () => {
        if (idToken === null) {
            alert('You are not login')
        } else {
            const id = uuidv4();
            const date = new Date().toISOString();
            var newPost = { id, title, detail, date }
            axios.post(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/prod/product`, newPost, config)
            .then(() => {
                setAPIData(APIData)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const onDelete = (id) => {
        if (idToken === null) {
            alert('You are not login')
        } else {
            axios.delete(`https://sbzq27tawc.execute-api.us-east-1.amazonaws.com/prod/product?id=${id}`, config)
            .then(() => {
                setAPIData(APIData.filter(d => d.id !== id));
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const setData = (data) => {
        let { id, title, detail } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('title', title);
        localStorage.setItem('detail', detail);
        localStorage.setItem('id_token', idToken);
    }

    const logOut = () => {
        localStorage.clear()
    }

    const nextPage = () => {
        const newPage = pageNumber + 5 > APIData.length ? pageNumber : pageNumber + 5
        setPageNumber(newPage)
    }

    const prevPage = () => {
        const newPage = pageNumber - 5 < 0 ? pageNumber : pageNumber - 5
        setPageNumber(newPage)    
    }

    return (
        <Container>
            <Divider hidden />
            <Header as="h1" floated="left">
            <Icon name="react" /> CRUD SPA
            </Header>
            <Divider hidden clearing />
                <Segment className="sideBar" textAlign="left">
                    <Form className="create-form">
                        <Form.Field>
                            <Label>Title</Label>
                            <Input placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                            <Label>Detail</Label>
                            <TextArea placeholder='Detail' onChange={(e) => setDetail(e.target.value)}/>
                        </Form.Field>
                        <Button color="green" onClick={postData} type='submit'>Submit</Button>
                        <Link to='/' floated='right'>
                            <Button color="grey" onClick={logOut} type='submit'>Logout</Button>
                        </Link>
                        <Button onClick={prevPage} type='submit'>prev</Button>
                        <Button onClick={nextPage} type='submit'>next</Button>
                    </Form>
                    <Table singleLine>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Detail</Table.HeaderCell>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {APIData.slice(pageNumber,pageNumber+5).map((data) => {
                                let link = null
                                if (idToken) {
                                    link = 
                                    <Link to='/update'>
                                        <Button color="blue" onClick={() => setData(data)}>Update</Button>
                                    </Link>
                                } else {
                                    link = 
                                        <Button color="blue" onClick={() => alert('You are not login')}>Update</Button>
                                }
                                return (
                                    <Table.Row key={data.id}>
                                        <Table.Cell>{data.title ? data.title.length < 5 ? data.title : data.title.substr(0,5) + '...' : 'Deafult title'}</Table.Cell>
                                        <Table.Cell>{data.detail ? data.detail.length < 24 ? data.detail : data.detail.substr(0,24) + '...' : 'Something'}</Table.Cell>
                                        <Table.Cell>{data.date}</Table.Cell>
                                        <Table.Cell> 
                                            {link}
                                            <Modal
                                            trigger={<Button color="orange" >More</Button>}
                                            header= {data.title}
                                            content= {data.detail}
                                            actions={['Close']}
                                            />
                                            <Button color="red" onClick={() => onDelete(data.id)}>Delete</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </Segment>
            <Divider hidden clearing />
        </Container>
    )
}
