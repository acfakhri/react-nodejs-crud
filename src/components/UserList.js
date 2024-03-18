import { useState, useEffect } from 'react'
import React from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const UserList = () => {
    const [users, setUser] = useState([]);

    useEffect(()=> {
        getUsers();
    },[]);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUser(response.data);
    
}

const deleteUser = async (id) => {
    try { 
        await axios.delete(`http://localhost:5000/users/${id}`)
        getUsers();
    } catch (error) {
        console.log(error)
    }
}

return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <Link to={'add'} className='button os-success'>Add New</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>no</th>
                        <th>name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key = {user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>
                            <Link to={`edit/${user.id}`} className="button is-small is-info">Edit</Link>
                            <Link onClick={()=>deleteUser(user.id)} className="button is-small is-danger">Delete</Link>
                        </td>
                    </tr>
                    
                    ))}
                </tbody>
            </table>
            
            
        </div>
    </div>
  )
}

export default UserList