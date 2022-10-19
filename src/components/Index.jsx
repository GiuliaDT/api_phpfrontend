import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';


const endpoint = 'http://travel.webok.it/public/api/travels'

const ShowTravels = () => {
    const [travels, setTravels] = useState([])

    useEffect(() => {
        getAllTravels()
    }, [])

    const getAllTravels = async () => {
        const response = await axios.get(endpoint)
        setTravels(response.data.res.data)
        // console.log(response.data.res.data)

    }
    const searchHandleName = async (event) => {
        const key = event.target.value;
        const response = await axios.get(`http://travel.webok.it/public/api/travels?name=${key}`);
        setTravels(response.data.res.data)
    }
    const searchHandleAttendees = async (event) => {
        const key = event.target.value;
        const response = await axios.get(`http://travel.webok.it/public/api/travels?attendees=${key}`);
        if (response) {
            setTravels(response.data.res.data)
        }
    }

    const deleteTravel = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://travel.webok.it/public/api/travel/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'travel deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        getAllTravels();
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }


    return (
        <div>
            <h2 className="text-center mt-5 mb-3">Travel Task Manager</h2>

            <div>
                <Link to="/create" className='btn btn-outline-info mx-1 mt-5 mb-3'>Create</Link>
                <div className="container mx-0 mt-5 mb-3" >
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="input-group-">
                                <input type="" className="form-control rounded" placeholder="Search by Country" onChange={searchHandleName} />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="number" className="form-control rounded" placeholder="Search bt Attendees" onChange={searchHandleAttendees} />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            <table className='table table-bordered'>
                <thead className='bg-dark text-white'>
                    <tr>
                        <th>Name</th>
                        <th width="450px">Description</th>
                        <th>Location</th>
                        <th>Attendees</th>
                        <th>Reference</th>
                        <th width="300px">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(travels).map((item, i) => (
                        <tr key={i}>
                            <td> {travels[item].name} </td>
                            <td> {travels[item].description} </td>
                            <td> {travels[item].location} </td>
                            <td> {travels[item].attendees} </td>
                            <td> {travels[item].reference} </td>
                            <td>
                                <Link to={`/show/${travels[item].id}`} className='btn btn-outline-info mx-1'> Show </Link>
                                <Link to={`/edit/${travels[item].id}`} className='btn btn-outline-success mx-1'>Edit</Link>
                                <button onClick={() => deleteTravel(travels[item].id)} className='btn btn-outline-danger mx-1'>Delete</button>
                            </td>
                        </tr>

                    ))}

                </tbody>
            </table>
        </div>
    )
}
export default ShowTravels