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

var QRCode = require('qrcode.react');
const randomstring = require("randomstring");

export default function SeeSum() {

    function print() {
        window.print();
    }

    let componentRef = useRef();
    const [barCodeNumber, setBarcode] = useState("");

    const history = useHistory();

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


    let { id } = useParams();
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

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <div>
            <div className=" d-flex mt-2 ml-5">
                <div>
                    <Avatar size={84} icon={<UserOutlined />} />
                    <div className = "ml-3">
                        <Button className = "mt-2 ml-5" type="primary" onClick={showModal}>
                            Show My Details
                        </Button>
                        <Modal title="User Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <p>Age: {Age}</p>
                            <p>Email: {email}</p>
                            <p>Lives In: {LivesIn}</p>
                            <p>Passport Number: {passportNumber}</p>
                            <p>Phone Number: {phone}</p>
                        </Modal>
                    </div>
                    <h3 className=" mt-2">Welcome: {Fname} {Mname} {Lname}</h3>
                </div>
            </div>
            <div>
                <Result
                    icon={<SmileOutlined />}
                    title="Congratulations, Here Is Your Ticket Along Your Confirmation Number."
                />
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Descriptions title={`Your Confirmation Number: ${barCodeNumber}`} bordered>
                    <Descriptions.Item label="Outbound Flight Date (Departure)">{flight_1.FlightDepDate}</Descriptions.Item>
                    <Descriptions.Item label="Outbound Flight Date (Arrival)">{flight_1.FlightArrDate}</Descriptions.Item>
                    <Descriptions.Item label="Return Flight Date (Departure)">{flight_1.FlightDepTime}</Descriptions.Item>
                    <Descriptions.Item label="Return Flight Date (Arrival)">{flight_1.FlightArrTime}</Descriptions.Item>
                    <Descriptions.Item label="Outbound Flight Time (Departure)">{flight_2.FlightDepDate}</Descriptions.Item>
                    <Descriptions.Item label="Outbound Flight Time (Arrival)">{flight_2.FlightArrDate}</Descriptions.Item>
                    <Descriptions.Item label="Return Flight Time (Departure)">{flight_2.FlightDepTime}</Descriptions.Item>
                    <Descriptions.Item label="Return Flight Time (Arrival)">{flight_2.FlightArrTime}</Descriptions.Item>
                    <Descriptions.Item label="Outbound Price">{flight_1.Price}</Descriptions.Item>
                    <Descriptions.Item label="Return Price">{flight_2.Price}</Descriptions.Item>
                    <Descriptions.Item label="Total Price">{flight_1.Price + flight_2.Price}</Descriptions.Item>
                    <Descriptions.Item label="Outbound Chosen Cabin">{flight_1.CabinChosen}</Descriptions.Item>
                    <Descriptions.Item label="Return Chosen Cabin">{flight_2.CabinChosen}</Descriptions.Item>
                    <Descriptions.Item label="Outbound Chosen Seat/s">{flight_1.SeatsChosen}</Descriptions.Item>
                    <Descriptions.Item label="Return Chosen Seat/s">{flight_2.SeatsChosen}</Descriptions.Item>
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

