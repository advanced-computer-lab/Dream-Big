//This component is the departurre list of fights after editing the flight
//contains flight price difference
//m3mlt4 al redirection al sahh



import axios from "axios";
import { config } from "react-spring";
import { useState,useEffect } from "react";
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
import { useLocation } from "react-router-dom";
import { Carousel } from '@trendyol-js/react-carousel';
import ReactDOM from 'react-dom';
import { CarouselWrapper } from "react-pretty-carousel";
import { SearchCriteriaContext, SearchCriteriaData } from "../../SearchCriteriaContext";
import { UserContext, UserData } from "../../UserContext";
import { RetFlightContext, RetFlightData, DepFlightContext, DepFlightData } from "../../FlightContext";



const ViewDepRes = (props) => {
  const history = useHistory();

  const location = useLocation();
  const flight = location.state.hello;
  console.log(flight, "flightttttttttttttttt")
  const [isEmpty, setIsEmpty] = useState(true);


  // const outBound = DepFlightData();
  // console.log(outBound, " outBound");




  const routeChange = (slide) => {
    let path = `/ReturnFlightDetails`;
    history.push(path, { slide, flight });
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

  // const [state, setState] = useState({
  //   goToSlide: 0,
  //   offsetRadius: 2,
  //   showNavigation: true,
  //   config: config.gentle
  // });


  let slides = props.retFlights.map((slide, index) => {
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

    const PriceDiff=0;
    if(props.resFlights)
    {
       PriceDiff =props.resFlights.Price-slide.Price;
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
                  <div> Price difference: {PriceDiff} </div>
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
    
      <div className="App" > 
      <CarouselWrapper items={items} mode="gallery">
        
        {slides}
      </CarouselWrapper>
      
      {/* <div>
      <Button className="btn-warning" variant="success" onClick={() => history.push('/ArrivalFlightDetails')}>Back </Button>
</div> */}
              
    </div>

       );

  }
        export default ViewDepRes;