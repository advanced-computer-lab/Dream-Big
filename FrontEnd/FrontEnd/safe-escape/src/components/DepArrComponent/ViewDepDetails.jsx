import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import download from './jpeg.jpeg';
import styles from './StyleB.css'; 




 

const ViewDepDetails = () => {
  const history = useHistory();
  
  const routeChange = () => {
    let path = `/reserved`;
    history.push(path);
  }
  
  
  const[Flight,setFlight]=useState([]);

  let { id } = useParams();
  const baseUrl = `http://localhost:8000/flights/FlightDetails/61787bd00739065c8b1a4d0a`;

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      console.log('Response',response.data);
      setFlight(response.data)
      
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
return(

  <div className = "d-flex flex-column align-items-center mt-2"><Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                src={download}
                alt="Flight Picture"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                <div className="d-flex flex-column align-items-center">
                {Flight.FlightNumber}
                </div>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <div> Departure time: {Flight.FlightDepTime} </div>
                <div>  Arrival time: {Flight.FlightArrTime}</div>
                <div> Trip duration: {Flight.TDuration} </div>
                <div>  First class :{Flight.FirstSeats} </div>
                <div> Economy class : {Flight.EconomySeats} </div>
                <div> Business class:{Flight.BusinessSeats} </div>
                <div> Price : {Flight.Price} </div>


                </Typography>
            </CardContent>
            <CardActions>
                
            <Button type="primary"  className={styles.bigblue} onClick = {routeChange}>Confirm Reservation</Button>
            </CardActions>
        </Card></div>

  

);
}

export default ViewDepDetails;