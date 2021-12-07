import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Descriptions, Badge } from 'antd';
import { Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { Result } from 'antd';
import { useRef } from 'react';
import qrcode from './Safe-Escape_Airlines.png';
import Qrcode from './qrcode_localhost.png';
import "./index.css";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useLocation } from 'react-router-dom';

var QRCode = require('qrcode.react');
const randomstring = require("randomstring");

export default function SeeSum() {

    function print() {
        window.print();
    }

    let componentRef = useRef();
    const [barCodeNumber, setBarcode] = useState("");

    const history = useHistory();
    const location = useLocation();

    const f = location.state.first;
    const s = location.state.second;
    const c = location.state.cabins2;
    const ds = location.state.depSeats2;
    const rs = location.state.retSeats2;

    console.log(location.state, "STTAEEE");

    const routeChange = () => {
        let path = `/ReservedFlights`;
        history.push(path);
    }

    const ref = React.createRef();

    const [flight_1, setFlight_1] = useState({});
    const [flight_2, setFlight_2] = useState({});
    const [Fname, setFname] = useState("");
    const [Mname, setMname] = useState("");
    const [Lname, setLname] = useState("");
    const [Age, setAge] = useState();
    const [LivesIn, setLoc] = useState("");
    const [passportNumber, setPassNumb] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState();

    const baseUrl = `http://localhost:8000/users/UserDetails/61a4708e8c20bdc40a534333`;

    useEffect(() => {
        axios.get(baseUrl).then((response) => {
            setFlight_1(response.data.ReservedFlights[0]);
            setFlight_2(response.data.ReservedFlights[1]);
            setFname(response.data.FirstName);
            setLname(response.data.LastName);
            setMname(response.data.MiddleName);
            setAge(response.data.Age);
            setLoc(response.data.LivesIn);
            setEmail(response.data.Email);
            setPhone(response.data.PhoneNumber);
            setPassNumb(response.data.PassportNumber);
            setBarcode(randomstring.generate(7));
        })
    }, []);

    return (
        <div style = {{backgroundColor: 'white'}} >
            <div>
                <Result
                    icon={<SmileOutlined />}
                    title="Congratulations, Here Is Your Ticket Along Your Confirmation Number."
                />
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Descriptions title={`Your Confirmation Number: ${barCodeNumber}`} bordered>
                    <Descriptions.Item label="Outbound Flight Date (Departure)">{f.FlightDepDate}</Descriptions.Item>
                    <Descriptions.Item label="Outbound Flight Date (Arrival)">{f.FlightArrDate}</Descriptions.Item>
                    <Descriptions.Item label="Return Flight Date (Departure)">{s.FlightDepDate}</Descriptions.Item>
                    <Descriptions.Item label="Return Flight Date (Arrival)">{s.FlightArrDate}</Descriptions.Item>
                    <Descriptions.Item label="Outbound Flight Time (Departure)">{f.FlightDepTime}</Descriptions.Item>
                    <Descriptions.Item label="Outbound Flight Time (Arrival)">{f.FlightArrTime}</Descriptions.Item>
                    <Descriptions.Item label="Return Flight Time (Departure)">{s.FlightDepTime}</Descriptions.Item>
                    <Descriptions.Item label="Return Flight Time (Arrival)">{s.FlightArrTime}</Descriptions.Item>
                    <Descriptions.Item label="Outbound Price">{f.Price}</Descriptions.Item>
                    <Descriptions.Item label="Return Price">{s.Price}</Descriptions.Item>
                    <Descriptions.Item label="Total Price">{parseInt( f.Price + s.Price)}</Descriptions.Item>
                    <Descriptions.Item label="Outbound Chosen Cabin">{c}</Descriptions.Item>
                    <Descriptions.Item label="Return Chosen Cabin">{c}</Descriptions.Item>
                    <Descriptions.Item label="Outbound Chosen Seat/s">{ds.toString()}</Descriptions.Item>
                    <Descriptions.Item label="Return Chosen Seat/s">{rs.toString()}</Descriptions.Item>
                </Descriptions>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Button onClick={print}>Print Ticket As PDF</Button>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Button onClick={routeChange}>View All Reserved Flights</Button>
            </div>
            <div>
                <img src={qrcode} className="photo" alt="Logo" />;
            </div>
        </div >
    );
}

