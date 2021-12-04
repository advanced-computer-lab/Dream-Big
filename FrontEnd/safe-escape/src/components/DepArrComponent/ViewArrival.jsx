
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
import { useParams } from "react-router-dom";

import { withRouter } from 'react-router-dom';



const ViewReturn = () => {
  const history = useHistory();

  const routeChange = (slide) => {
    let path = `/ArrivalFlightDetails`;
    history.push(path, {flightNumber: slide.flightNumber});
  }
  //let { id } = useParams();
  // const baseUrl = `http://localhost:8000/flights/FlightDetails/${id}`;

  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  });



  let slides = [
    {
      flightNumber: "A102",
      Seats: 5,

    },
    {

      flightNumber: "A199",
      Seats: 9,

    },
    {

      flightNumber: "A18882",
      Seats: 7,

    },
    {
      flightNumber: "A102",
      Seats: 5,

    },
    {

      flightNumber: "hjh00",
      Seats: 9,

    },
    {

      flightNumber: "",
      Seats: 7,

    },

  ].map((slide, index) => {
    return {
      ...slide, content:
        (
          <Card sx={{ maxWidth: 200 }} >

            <CardMedia
              component="img"
              height="90"
              src={download}
              alt="Flight Picture"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <div className="d-flex flex-column align-items-center">
                  {slide.flightNumber}
                </div>
              </Typography>
              <Typography variant="body2" color="text.secondary">

                <div> Departure time: {slide.FlightDepTime} </div>
                <div>  Arrival time: {slide.FlightArrTime}</div>
                <div> Trip duration: {slide.TDuration} </div>
                <div> Price : {slide.Price} </div>

              </Typography>
              <CardActions>

                <Button type="button" class="btn btn-outline-success" className="d-flex justify-content-center mt-3" onClick={() => routeChange(slide)} >Select</Button>
              </CardActions>
            </CardContent>
          </Card>
        )
      , onClick: () => setState({ goToSlide: index })
    };

  });

  <CardActions>

    <Button type="primary" onClick={routeChange} >Select</Button>
  </CardActions>

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
      <div className="d-flex justify-content-center mt-3" >  <h3>Arrival Flights </h3> </div>,
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


  );

}



export default ViewReturn;



