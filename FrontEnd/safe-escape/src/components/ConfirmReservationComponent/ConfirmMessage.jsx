import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom";
import download from './download.jpg';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { Modal, Button } from 'antd';
import { Carousel } from 'antd';
import { List, Avatar } from 'antd';
import { border } from '@mui/system';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import { Steps } from 'antd';
import engy from './engy.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import backgrnd from './bground.jpeg';
import { useLocation } from "react-router-dom";

export default function MediaCard() {

    const location = useLocation();

    const myParams = location.state.flightNumber;
    console.log(myParams," My Params");

    const { Step } = Steps;

    const [DepDate, setDD] = useState();
    const [ArrDate, setAD] = useState();
    const [DepTime, setDT] = useState();
    const [ArrTime, setAT] = useState();
    const [flightNumber, setFN] = useState();
    const [BaggageAllowance, setBA] = useState();
    const [FirstSeats, setFS] = useState();
    const [BusinessSeats, setBBA] = useState();
    const [EconomySeats, setEA] = useState();
    const [Price, setPrice] = useState();
    const [a, setA] = useState();
    const [b, setB] = useState();
    const [bb, setBB] = useState();
    const [bbb, setBBB] = useState();
    const [tripDurate, setTD] = useState();
    const [ayhaga, setayhaga] = useState();
    const [From, setFrom] = useState();
    const [To, setTo] = useState();
    const [Fname, setFname] = useState();

    let { id } = useParams();
    const baseUrl = `http://localhost:8000/flights/FlightDetails/6186c408f38e49ec1e0d3011`;
    const baseUrl2 = `http://localhost:8000/users/61a49102b62a597189c517f0`

    const [updateReservedFlights, setUR] = useState([]);

    let users = { Fname: "Engy", Lname: "Khaled" }

    const history = useHistory();

    useEffect(() => {
        axios.get(baseUrl).then((response) => {

            setFrom(response.data.From);
            setTo(response.data.To);

            function toDate(dStr, format) {
                var now = new Date(response.data.FlightDepDate);
                if (format == "h:m") {
                    now.setHours(dStr.substr(0, dStr.indexOf(":")));
                    now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
                    now.setSeconds(0);
                    return now;
                } else
                    return "Invalid Format";
            }

            function toDate2(dStr, format) {
                var now = new Date(response.data.FlightArrDate);
                if (format == "h:m") {
                    now.setHours(dStr.substr(0, dStr.indexOf(":")));
                    now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
                    now.setSeconds(0);
                    return now;
                } else
                    return "Invalid Format";
            }

            function getDifferenceInHours(date1, date2) {
                const diffInMs = Math.abs(date2 - date1);
                return diffInMs / (1000 * 60 * 60);
            }
            setayhaga(response.data);
            setDD(response.data.FlightDepDate);
            setAD(response.data.FlightArrDate);
            setDT(response.data.FlightDepTime);
            setAT(response.data.FlightArrTime);
            setFN(response.data.FlightNumber);
            setBA(response.data.BaggageAllowance);
            setBBA(response.data.BusinessSeats);
            setFS(response.data.FirstSeats);
            setEA(response.data.EconomySeats);
            setPrice(response.data.Price);
            setA(response.data.FlightDepDate);
            setB(response.data.FlightArrDate);
            setBB(toDate(response.data.FlightDepTime, "h:m"));
            setBBB(toDate2(response.data.FlightArrTime, "h:m"));
            setTD(Math.floor(getDifferenceInHours(toDate(response.data.FlightDepTime, "h:m"), toDate2(response.data.FlightArrTime, "h:m"))))
        })
    }, [])

    const handleSubmit = () => {
        setUR(updateReservedFlights.push(ayhaga));
        let path = `/reserved`;
        history.push(path);
        axios.put(baseUrl2, { updateReservedFlights }).then((response) => { console.log('updateddd', updateReservedFlights); })
    };

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
                <div className = "ml-5">
                    <Avatar size={84} icon={<UserOutlined />} />
                    <h3 className=" mt-2">Welcome: {users.Fname} {users.Lname}</h3>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <div>
                    <div className="">
                        <div className="mt-5 ml-5">
                            <Steps direction="horizontal" current={1}>
                                <Step className="ml-2 mr-2" title="Finished" description="Choose Suitable Flight" />
                                <Step className="ml-2 mr-2" title="In Progress" description="Confirm Flight Reservation" />
                                <Step className="ml-2 mr-2" title="Waiting" description="Enjoy Your Trip" />
                            </Steps>
                            <div className="d-flex align-items-center justify-content-center mt-5">
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        src={download}
                                        alt="Flight Picture"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <div className="d-flex flex-column align-items-center">
                                                Flight Number : {myParams}
                                            </div>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <div>Departure Date : {DepDate}</div>
                                            <div>Arrival Date : {ArrDate}</div>
                                            <div>Departure Time : {DepTime}</div>
                                            <div>Arrival Time : {ArrTime}</div>
                                            <div>Trip Duartion in Hours: {tripDurate}</div>
                                            <div>First Seats : {FirstSeats}</div>
                                            <div>Business Seats : {BusinessSeats}</div>
                                            <div>Economy Seats : {EconomySeats}</div>
                                            <div>Baggage Allowance : {BaggageAllowance}</div>
                                            <div>Price : {Price}</div>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button type="primary"
                                            onClick={() => { handleSubmit() }}>
                                            Confirm Reservation</Button>
                                    </CardActions>
                                </Card>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}