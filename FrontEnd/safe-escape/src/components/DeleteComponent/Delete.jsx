import React, { useEffect, useState } from 'react';

function Delete() {
    const [flights, setFlights] = useState([])
    useEffect(() => {
        getFlights()
    }, [flights])

    const cancelBooking = (id) => {
        return async (dispatch) => {
            try {
                const res = await axios.delete(
                    `http://localhost:8000/flights/${id}`
                );
                console.log(res.data.success);
                dispatch({
                    type: CANCEL_BOOKING,
                    payload: res.data.success,
                });
                // return res.data;
            } catch (error) {
                dispatch({
                    type: FLIGHT_ERROR,
                    payload: "Could not cancel booking",
                });
                console.log(error);
            }
        };
    };


    function getFlights() {
        fetch("http://localhost:8000/flights/getAllFlights").then((result) => {

            result.json().then((resp) => {
                console.log('respppp', resp)
                setFlights(resp)
            })
        })

    }
    console.warn(flights)
    function deleteFlights(id) {
        if (window.confirm('Are you sure you want to delete this Flight?')) {
            fetch(`http://localhost:8000/flights/${id}`, {

                method: 'DELETE'
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                })
            })
        }
    }

    return (
        <div className="Delete" >
            <h1>Delete Flight</h1>
            <table border="1">
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>Flight Number</td>
                        <td>From</td>
                        <td>To</td>
                        <td>Flight Date</td>
                        <td>Terminal</td>

                        <td>Update/Delete Flight</td>
                    </tr>

                    {
                        flights.map((Flights, i) =>
                            <tr key={i}>
                                <td>{Flights._id}</td>
                                <td>{Flights.FlightNumber}</td>
                                <td>{Flights.From}</td>
                                <td>{Flights.To}</td>
                                <td>{Flights.FlightDate}</td>
                                <td>{Flights.Terminal}</td>
                                <td><button onClick={() => { deleteFlights(Flights._id) }}>Delete</button></td>

                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
export default Delete
