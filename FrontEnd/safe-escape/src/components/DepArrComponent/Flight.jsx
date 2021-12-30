import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import download from './jpeg.jpeg';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useHistory } from "react-router-dom"

const Flight = props => {

    const history = useHistory();

    console.log('flight', props.flight)

    const routeChange = (slide) => {
        if(props.data){
          console.log('Ediittttttt')
          if(props.type === 'Return'){
            console.log('Return Editttt')
            let path = `/ReturnFlightDetails`;
            history.push(path, {  ...props.data , slide });
          }
          else{
            console.log('Deppppppp Editttt')
            let path = `ArrivalFlightDetails`;
            history.push(path, {  ...props.data , slide });
          }
        }
        else if(props.type === 'Return'){
            let path = `/ReturnFlightDetails`;
            history.push(path, { slide, flight: {...props.depflight} });
        }
        else{
            let path = `ArrivalFlightDetails`;
            history.push(path, { slide });
        }
      }

    function toDate(dStr, format) {
        var now = new Date(props.flight.FlightDepDate);
        if (format === "h:m") {
          now.setHours(dStr.substr(0, dStr.indexOf(":")));
          now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
          now.setSeconds(0);
          return now;
        } else
          return "Invalid Format";
      }
  
      function toDate2(dStr, format) {
        var now = new Date(props.flight.FlightArrDate);
        if (format === "h:m") {
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

    return (
        <div className="m-2 " role="presentation">
        <Card sx={{ maxWidth: 500 }} >

          <CardMedia
            component="img"
            height="100"
            src={download}
            alt="Flight Picture"
          />

          <CardContent className = 'd-flex flex-column justify-content-between align-items-center'>
            <Typography gutterBottom variant="h5" component="div">
              <div className="d-flex flex-column align-items-center">
                {props.flight.FlightNumber}
              </div>
            </Typography>
            <Typography variant="body2" color="text.secondary">

              <div> Departure time: {props.flight.FlightDepTime} </div>
              <div>  Arrival time: {props.flight.FlightArrTime}</div>
              <div> Trip duration in Hours: {Math.floor(getDifferenceInHours(toDate(props.flight.FlightDepTime, "h:m"), toDate2(props.flight.FlightArrTime, "h:m")))} </div>

              <div> {props.priceToSubtract === 0 ? 'Price' : 'Price Difference'} : {Math.abs(props.flight.Price - props.priceToSubtract)} </div>


            </Typography>
            <CardActions>


            <Button type="button" class="btn btn-outline-success" className="d-flex justify-content-center mt-3" onClick={() => routeChange(props.flight)}>
                Select Flight
            </Button>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    )
}
export default Flight