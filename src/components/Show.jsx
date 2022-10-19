import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const endpoint = 'http://travel.webok.it/public/api/travel'

const Show = () => {
    const [id, setId] = useState(useParams().id)
    const [travel, setTravel] = useState({ name: '', description: '' })
    useEffect(() => {
        axios.get(`${endpoint}/${id}`)
            .then(function (response) {
                setTravel(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <div>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show Travel Details</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/"> View All Travels
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Name:</b>
                        <p>{travel.name}</p>
                        <b className="text-muted">Description:</b>
                        <p>{travel.description}</p>
                        <b className="text-muted">Location:</b>
                        <p>{travel.location}</p>
                        <b className="text-muted">Attendees:</b>
                        <p>{travel.attendees}</p>
                        <b className="text-muted">Reference:</b>
                        <p>{travel.reference}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Show;