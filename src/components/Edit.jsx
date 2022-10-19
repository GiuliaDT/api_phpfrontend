import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

const endpoint = 'https://travel.webok.it/public/api/travel/'

const Edit = () => {
    const [isSaving, setIsSaving] = useState(false)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [location, setLocation] = useState()
    const [attendees, setAttendees] = useState()
    const [reference, setreference] = useState()
    const navigate = useNavigate()
    const { id } = useParams()


    useEffect(() => {
        const getTravelId = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            setName(response.data.name)
            setDescription(response.data.description)
            setLocation(response.data.location)
            setAttendees(response.data.attendees)
            setreference(response.data.reference)
        }
        getTravelId()

    }, [])


    const update = async (e) => {
        e.preventDefault()
        await axios.put(`${endpoint}${id}`, {
            name: name,
            description: description,
            location: location,
            attendees: attendees,
            reference: reference,
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Travel updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
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
        navigate('/')
    }


    return (
        <div>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Edit Travel</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/"> View All Travels
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
                            <button disabled={isSaving} onClick={update} type="button" className="btn btn-outline-success mt-3"> Update Travel </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Edit