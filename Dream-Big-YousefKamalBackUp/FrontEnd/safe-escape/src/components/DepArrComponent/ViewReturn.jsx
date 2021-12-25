import axios from "axios";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import download from './jpeg.jpeg';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";
import { css } from '@emotion/react';
import { useParams } from "react-router-dom";
import { Steps } from 'antd';
import { CarouselWrapper } from "react-pretty-carousel";

import { withRouter } from 'react-router-dom';




const ViewReturn2 = (props) => {

  const history = useHistory();
  
  console.log(props.resFlights,"jjjjjjjjj");

  const routeChange = (slide) => {
    let path = `ArrivalFlightDetails`;
    history.push(path, { slide });
  }

  const handleSubmit=() => {
    let path = `search`;
    axios.routeChange(path);
  }

  const [items, setItems] = useState(5);
  
  useEffect(() => {
    if (window.innerWidth < 576) setItems(1);
    else setItems(5);
    window.addEventListener("resize", () => {
      if (window.innerWidth < 576) setItems(1);
      else setItems(5);
    });
  }, []);

  let slides = props.depFlights.map((slide, index) => {

    function toDate(dStr, format) {
      var now = new Date(slide.FlightDepDate);
      if (format == "h:m") {
        now.setHours(dStr.substr(0, dStr.indexOf(":")));
        now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
        now.setSeconds(0);
        return now;
      } else
        return "Invalid Format";
    }

    function toDate2(dStr, format) {
      var now = new Date(slide.FlightArrDate);
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
   
    return(
          <div>
            <Card sx={{ maxWidth: 500 }} >

              <CardMedia
                component="img"
                height="100"
                src={download}
                alt="Flight Picture"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <div className="d-flex flex-column align-items-center">
                    {slide.FlightNumber}
                  </div>
                </Typography>
                <Typography variant="body2" color="text.secondary">

                  <div> Departure time: {slide.FlightDepTime} </div>
                  <div>  Arrival time: {slide.FlightArrTime}</div>
                  <div> Trip duration in Hours: {Math.floor(getDifferenceInHours(toDate(slide.FlightDepTime, "h:m"), toDate2(slide.FlightArrTime, "h:m")))} </div>

                  <div> Price : {slide.Price} </div>
                 

                </Typography>
                <CardActions>


                  <Button type="button" class="btn btn-outline-success" className="d-flex justify-content-center mt-3" onClick={() => routeChange(slide)}>
                    Select Flight</Button>
                </CardActions>
              </CardContent>
            </Card>
          </div>

        )
      
    
  });

  
      
    return(
      <div>
      <div className="App" > 
      <CarouselWrapper items={items} mode="gallery">
        
        {slides}
      </CarouselWrapper>
    </div>


 <div>
 <Button className="btn-warning" variant="success" onClick={() => history.push('/users/search')}>Back </Button>
</div>
</div>

       );


}



export default ViewReturn2;



