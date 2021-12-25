
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { useState } from "react";
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

import { withRouter } from 'react-router-dom';
import { useEffect } from "react";



const ViewReturn2 = (props) => {

  const [tripDurate, setTD] = useState();
  const { Step } = Steps;

  const history = useHistory();
  const color = 'white'

  const routeChange = (slide) => {
    let path = `/ArrivalFlightDetails`;
    history.push(path, { slide });
  }

  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  });

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
    return {
      ...slide, content:
        (
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
      , onClick: () => setState({ goToSlide: index })
    };
  });

  const onChangeInput = (e) => {
    setState({
      [e.target.name]: parseInt(e.target.value, 10) || 0
    });
  };

  let xDown = null;
  let yDown = null;

  const getTouches = (evt) => {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    ); // jQuery
  };

  const handleTouchStart = (evt) => {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  const handleTouchMove = (evt) => {
    if (!xDown || !yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        setState({ goToSlide: state.goToSlide + 1, ...state });
      } else {
        /* right swipe */
        setState({ goToSlide: state.goToSlide - 1, ...state });
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
      } else {
        /* down swipe */
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-center mt-5"><h3>Outbound Flights</h3> </div>,
        <Button variant="contained" style={{ position: 'center', right: -90, top: -40, backgroundColor: 'white', color: "#f99965" }} className="float-right" onClick={() => history.push('/users/search')} type="primary">Previous</Button>

        <div
          style={{ width: "40%", height: "400px", margin: "0  auto" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <Carousel
            slides={slides}
            goToSlide={state.goToSlide}
            offsetRadius={state.offsetRadius}
            showNavigation={state.showNavigation}
            animationConfig={state.config}
          />
        </div>
      </div>
    </div >



  );

}



export default ViewReturn2;



