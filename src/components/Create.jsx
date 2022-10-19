import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios';


const endpoint = 'http://travel.webok.it/public/api/travel'

const Create = () => {
    const [isSaving, setIsSaving] = useState(false)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [location, setLocation] = useState()
    const [attendees, setAttendees] = useState()
    const [reference, setreference] = useState()

    const store = () => {
        setIsSaving(true);
        axios.post(endpoint, {
            name: name,
            description: description,
            location: location,
            attendees: attendees,
            reference: reference,
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Travel saved successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setName('')
                setDescription('')
                setLocation('')
                setAttendees('')
                setreference('')
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }

    return (
        <div>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New Travel</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/">View All Travel
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className='form-group'>
                                <label className='form-label'>Name</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type='text'
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Description</label>
                                <input
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type='text'
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Location</label>
                                <input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    type='text'
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Attendees</label>
                                <input
                                    value={attendees}
                                    onChange={(e) => setAttendees(e.target.value)}
                                    type='number'
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Reference</label>
                                <input
                                    value={reference}
                                    onChange={(e) => setreference(e.target.value)}
                                    type='text'
                                    className='form-control'
                                />
                            </div>

                            <button disabled={isSaving} onClick={store} type="button" className="btn btn-outline-success mt-3"> Create Travel </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;