import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Cabins from './Cabins'
import Transition from "./Plane"
import TextField from '@mui/material/TextField'
import './style.scss'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useTransition } from "react-spring"
import Paper from '@mui/material/Paper'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import { UserData } from '../../UserContext'
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { SearchCriteriaData } from "../../SearchCriteriaContext"
import FadeInOut from "./Fader"
import axios from 'axios'

const EditSeats = props => {
  const scData = SearchCriteriaData();
  const history = useHistory();
  const location = useLocation();
  const user = UserData();

  console.log('Location Dataaa', location.state)
  
  const [firstSeats, setFirstSeats] = useState([]);
  const [businessSeats, setBusinessSeats] = useState([]);
  const [economySeats, setEconomySeats] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chosenSeats, setChosenSeats] = useState([[], [], []]);

  const [numOfPass, setNumOfPass] = useState();
  const [cabin, setCabin] = useState();
  const [seatsOfPass, setSeatsOfPass] = useState([]);
  const [cabinOfPass, setCabinOfPass] = useState([]);

  const [passInfo, setPassInfo] = useState({});

  const [loadingBtn1, setloadingBtn1] = useState(true);

  const [showPassInfo, setShowPassInfo] = useState([]);
  const [indexOfCurrEdit, setIndexOfCurrEdit] = useState();

  const [errorHandlingMessage, setErrorHandlingMessage] = useState('');


  console.log("User: ", user)

  useEffect(() => {

    setLoading(true);

    setFirstSeats(location.state.flight.FirstSeats)
    setBusinessSeats(location.state.flight.BusinessSeats)
    setEconomySeats(location.state.flight.EconomySeats)
    setNumOfPass(Object.keys(location.state.passengersInfo).length);
    setCabin(location.state.ChosenCabin);

    console.log('Chosennn', location.state.ChosenCabin)

    let passInfos = [];
    for(let i = 0; i < Object.keys(location.state.passengersInfo).length; i++) {
      passInfos.push({show: false});
    }
    setShowPassInfo(passInfos);

    setPassInfo(location.state.passengersInfo)

    setSeatsOfPass([...Array(Object.keys(location.state.passengersInfo).length)].map((info, index) => 
      location.state.passengersInfo[`Passenger ${index}`].seat))
    setCabinOfPass([...Array(Object.keys(location.state.passengersInfo).length)].map((info, index) => 
    location.state.passengersInfo[`Passenger ${index}`].cabin))
    setFetched(true)
    setLoading(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fetched])

  const addDepSeatCallback = ({ row, number, id, cCabin }, addCb) => {
    const sId = id - 1;
    addCb(row, number, id)
    setLoading(true)
    if (cCabin === 'FirstSeats') {
      setSeatsOfPass([...seatsOfPass.slice(0, indexOfCurrEdit), `${row}${number}`, ...seatsOfPass.slice((row.charCodeAt(0) - 65) + 1, seatsOfPass.length)])
      setCabinOfPass([...cabinOfPass.slice(0, indexOfCurrEdit), `First`, ...cabinOfPass.slice((row.charCodeAt(0) - 65) + 1, cabinOfPass.length)])
      setPassInfo({ ...passInfo, [`Passenger ${indexOfCurrEdit}`]: { ...passInfo[`Passenger ${indexOfCurrEdit}`], seat: `${row}${number}`, cabin: 'First' } })
      setChosenSeats([[...chosenSeats[0], `${row}${number}`], chosenSeats[1], chosenSeats[2]])
      setFirstSeats({
        availableSeatsNum: firstSeats.availableSeatsNum - 1, allSeats: [...firstSeats.allSeats.slice(0, row.charCodeAt(0) - 65),
        firstSeats.allSeats[row.charCodeAt(0) - 65].map(
          (seat, i) => (i === (sId))  ? { id: user._id, number, row: row, isSelected: true, tooltip: 'Reserved by you' } : seat),
        ...firstSeats.allSeats.slice((row.charCodeAt(0) - 65) + 1, firstSeats.allSeats.length)]
      })
    }
    else if (cCabin === 'BusinessSeats') {
      setSeatsOfPass([...seatsOfPass.slice(0, indexOfCurrEdit), `${row}${number}`, ...seatsOfPass.slice((row.charCodeAt(0) - 65) + 1, seatsOfPass.length)])
      setCabinOfPass([...cabinOfPass.slice(0, indexOfCurrEdit), `Business`, ...cabinOfPass.slice((row.charCodeAt(0) - 65) + 1, cabinOfPass.length)])
      setPassInfo({ ...passInfo, [`Passenger ${indexOfCurrEdit}`]: { ...passInfo[`Passenger ${indexOfCurrEdit}`], seat: `${row}${number}`, cabin: 'Economy' } })
      setChosenSeats([chosenSeats[0], [...chosenSeats[1], `${row}${number}`], chosenSeats[2]])
      setBusinessSeats({
        availableSeatsNum: businessSeats.availableSeatsNum - 1, allSeats: [...businessSeats.allSeats.slice(0, row.charCodeAt(0) - 65), 
          businessSeats.allSeats[row.charCodeAt(0) - 65].map(
          (seat, i) => (i === (sId) ) ? { id: user._id, number, row: row, isSelected: true, tooltip: 'Reserved by you' } : seat),
        ...businessSeats.allSeats.slice((row.charCodeAt(0) - 65) + 1, businessSeats.allSeats.length)]
      })
    }
    else {
      setSeatsOfPass([...seatsOfPass.slice(0, indexOfCurrEdit), `${row}${number}`, ...seatsOfPass.slice((row.charCodeAt(0) - 65) + 1, seatsOfPass.length)])
      setCabinOfPass([...cabinOfPass.slice(0, indexOfCurrEdit), `Economy`, ...cabinOfPass.slice((row.charCodeAt(0) - 65) + 1, cabinOfPass.length)])
      setPassInfo({ ...passInfo, [`Passenger ${indexOfCurrEdit}`]: { ...passInfo[`Passenger ${indexOfCurrEdit}`], seat: `${row}${number}`, cabin: 'Economy' } })
      setChosenSeats([chosenSeats[0], chosenSeats[1], [...chosenSeats[2], `${row}${number}`]])
      setEconomySeats({
        availableSeatsNum: economySeats.availableSeatsNum - 1, allSeats: [...economySeats.allSeats.slice(0, row.charCodeAt(0) - 65), 
          economySeats.allSeats[row.charCodeAt(0) - 65].map(
          (seat, i) => (i === (sId) ) ? { id: user._id, number, row: row, isSelected: true, tooltip: 'Reserved by you' } : seat),
        ...economySeats.allSeats.slice((row.charCodeAt(0) - 65) + 1, economySeats.allSeats.length)]
      })
    }
    setLoading(false)
  }

  const removeDepSeatCallback = ({ row, number, id, cCabin }, removeCb) => {
    const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
    removeCb(row, number, newTooltip)
    setLoading(true)
    if (cCabin === 'FirstSeats') {
      setSeatsOfPass(seatsOfPass.map((seat,i) => i === indexOfCurrEdit ? "" : seat));
      setCabinOfPass(cabinOfPass.map((cabin,i) => i === indexOfCurrEdit ? "" : cabin));
      //setPassInfo({ ...passInfo, [`Passenger ${seatsOfPass.length + 1}`]: { seat: `${row}${number}`, cabin: 'Economy' } })
      setChosenSeats([[...(chosenSeats[0].filter(seat => seat !== `${row}${number}`))], chosenSeats[1], chosenSeats[2]])
      setFirstSeats({
        availableSeatsNum: firstSeats.availableSeatsNum + 1, allSeats: [...firstSeats.allSeats.slice(0, row.charCodeAt(0) - 65),
        firstSeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? { id: number, number } : seat), ...firstSeats.allSeats.slice((row.charCodeAt(0) - 65) + 1,
            firstSeats.allSeats.length)]
      })
    }
    else if (cCabin === 'BusinessSeats') {
      setSeatsOfPass(seatsOfPass.map((seat,i) => i === indexOfCurrEdit ? "" : seat));
      setCabinOfPass(cabinOfPass.map((cabin,i) => i === indexOfCurrEdit ? "" : cabin));
      setChosenSeats([chosenSeats[0], [...(chosenSeats[1].filter(seat => seat !== `${row}${number}`))], chosenSeats[2]])
      setBusinessSeats({
        availableSeatsNum: businessSeats.availableSeatsNum + 1, allSeats: [...businessSeats.allSeats.slice(0, row.charCodeAt(0) - 65),
        businessSeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? { id: number, number } : seat), ...businessSeats.allSeats.slice((row.charCodeAt(0) - 65) + 1,
            businessSeats.allSeats.length)]
      })
    }
    else {
      setSeatsOfPass(seatsOfPass.map((seat,i) => i === indexOfCurrEdit ? "" : seat));
      setCabinOfPass(cabinOfPass.map((cabin,i) => i === indexOfCurrEdit ? "" : cabin));
      setChosenSeats([chosenSeats[0], chosenSeats[1],
      [...(chosenSeats[2].filter(seat => seat !== `${row}${number}`))]])
      setEconomySeats({
        availableSeatsNum: economySeats.availableSeatsNum + 1, allSeats: [...economySeats.allSeats.slice(0, row.charCodeAt(0) - 65),
        economySeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? { id: number, number } : seat), ...economySeats.allSeats.slice((row.charCodeAt(0) - 65) + 1,
            economySeats.allSeats.length)]
      })
    }
    setLoading(false)
  }

  const handleSubmit = () => {
    let flag = true;
    for(let i = 0; i < Object.keys(passInfo).length; i++){
      if(Object.keys(passInfo[`Passenger ${i}`]).length !== 3){
        flag = false;
        break;
      }
    }
    if(Object.keys(passInfo).length !== numOfPass && Object.keys(passInfo).length !== numOfPass){
      setErrorHandlingMessage('You Forgot To Fill All Inputs');
    }
    else if(!flag)
      setErrorHandlingMessage('You Forgot To Fill All Inputs')

    else{
      console.log('Sendinggg')

      axios.patch(`http://localhost:8000/flights/${location.state.flight._id}`, {
        updatedFlights: {
          FirstSeats: firstSeats, BusinessSeats: businessSeats,
          EconomySeats: economySeats
        }
      })
        .then((response) => {
          console.log('Depppppppp')
          console.log('Respp', response)
          axios.patch('http://localhost:8000/users/updatereservedtrip', {
            updatedFlights: {
              flight: response.data,
              depPassengerInfo:passInfo
            },
            flightType: location.state.Flighttype,
            index: location.state.tIndex,
            userId : user._id
          })
            .then((res) => { 
              console.log('Responneeeeeesssss', res.data)
              props.setUser(res.data)
              history.push(`/ReservedFlights`)
          })
         })
    }
    
  }

  const toggleDepShow = (index) => {
    setShowPassInfo(showPassInfo.map((info, i) => i === index ? {show: !info.show} : {show: false}))
    setIndexOfCurrEdit(index)
  };

  ///BookingTripInfo
  console.log('passArrayyy', seatsOfPass);
  //
  console.log('Passengerrss', passInfo);

  const [depVisible, setDepVisible] = useState(true);
  const depTransitions = useTransition(depVisible, {
    from: { opacity: 0, transform: "translateY(40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(40px)" }
  })

  //     [{id: 1, number: 1, isSelected: true, tooltip: 'Reserved by you'}, {id: 2, number: 2, tooltip: 'Cost: 15$'}, null, {id: 3, number: '3', isReserved: true, orientation: 'east', tooltip: 'Reserved by Rogger'}, null, {id: 15, number: 3, isReserved: true, orientation: 'east'}, {id: 16, number: '4', orientation: 'west'}, null, {id: 17, number: 5}, {id: 18, number: 6}],
  //     [{id: 19, number: 1, tooltip: 'Cost: 25$'},{id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'},
  return (
    <>
      <div style={{ backgroundImage: "url(/airplane-sky-flight-clouds.jpg)", backgroundSize: '100% 100%', zIndex: '1' }} className="flex-column justify-content-center align-items-center">
        <Card className="m-auto w-100" style={{ backgroundColor: 'transparent' }}>
        {(fetched === true) ?
        (<Card.Body className="d-flex">
          <Col lg={6} >

            <Paper className='pt-3' elevation={3} style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', height: '120vh' }}>
              <div className='d-flex justify-content-center align-items-center w-100 '>
                {
                  (fetched === true) ?
                    (
                      <div>
                        {depTransitions(
                          (styles, item) =>
                            item && (
                              <Transition style={styles} >
                                <Cabins title={'Departure'} chosenCabin={cabin} passengers={numOfPass} state={{ loading: loading, firstSeats: firstSeats, businessSeats: businessSeats, economySeats: economySeats }}
                                  addSeatCallback={addDepSeatCallback}
                                  removeSeatCallback={removeDepSeatCallback} handleSubmit={handleSubmit} />
                              </Transition>
                            )
                        )}
                      </div>) :
                    (
                      <Box sx={{ margin: '2rem', display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                      </Box>
                    )
                }
              </div>
            </Paper>

          </Col>

          <Col lg={6} className='d-flex flex-column align-items-center p-3'
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <Paper elevation={3} className='w-100 text-center d-flex justify-content-center'>
              <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  {location.state.Flighttype} Flight Seats Details
                </Typography>
                <div>
                  <Typography variant="h6" component="div">
                    Number Of Passengers: {numOfPass}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" component="div">
                    Chosen Cabin: {cabin}
                  </Typography>
                </div>
              </CardContent>
            </Paper>

            <div className='w-75 mt-3 mb-4 d-flex justify-content-center'>
              <Button className='m-2' variant='warning' onClick={() => { setloadingBtn1(true); setTimeout(() => setDepVisible(true), 1000); showPassInfo.map(info => info.show = false)}} 
              disabled = {loadingBtn1 === true} >
                {loadingBtn1 ? `Currently Viewing ${location.state.Flighttype} Seats` : `Show ${location.state.Flighttype} Plane`}
              </Button>
            </div>

            <div className='w-100 d-flex justify-content-center align-items-center mt-4 mb-4' style={{ height: '40vh', marginRight: '2vh' }}>
              {depTransitions(
                (styles, item) =>
                  item && (
                    <Transition width={'w-100'} style={styles} >
                      <Paper elevation={3} className='m-2 w-100 text-center'>
                        <CardContent>
                          <Typography variant="h5" color="text.secondary" gutterBottom>
                            Chosen {location.state.Flighttype} Flight Seats
                          </Typography>
                          <Typography variant="h6" color="text.secondary" gutterBottom>
                            {errorHandlingMessage === '' ? 'Press On The Buttons On The Right To Start Editing Info For Passengers' : errorHandlingMessage}
                          </Typography>
                          <div>
                          <div className='d-flex justify-content-center justify-content-between'>
                            
                                  <div>
                                    <Typography className='m-2 p-1' variant="h6" component="div">
                                      Passengers
                                    </Typography>
                                  </div>

                                  <div>
                                    <Typography className='m-2 p-1' variant="h6" component="div">
                                      Chosen Seats
                                    </Typography>
                                  </div>

                                  <div>
                                    <Typography className='m-2 p-1' variant="h6" component="div">
                                      Chosen Class
                                    </Typography>
                                  </div>

                                  <div>
                                    <Typography className='m-2 p-1' variant="h6" component="div">
                                      Press To Choose Seat
                                    </Typography>
                                  </div>

                          </div>
                          {
                            
                            ([...Array(numOfPass)].map((e, index) => (
                              <div className='d-flex justify-content-center  justify-content-between'>
                              {
                                showPassInfo[index].show === false ? (
                                  <FadeInOut show={!showPassInfo[index].show } duration={500} >
                                  <Typography className='mt-3' variant="h5" color="text.secondary" gutterBottom>
                                  {`Passenger ${index + 1 } Info`}
                                  </Typography>
                                </FadeInOut>
                                ) : (
                                  <>
                                  <div>
                                  <FadeInOut show={showPassInfo[index].show } duration={500} >
                                    <div className='d-flex flex-column justify-content-center w-75'>
                                      <TextField
                                        id="standard-password-input"
                                        label={`Passenger ${index + 1 } Name`}
                                        type="text"
                                        variant="standard"
                                        defaultValue = { 
                                        passInfo.hasOwnProperty(`Passenger ${indexOfCurrEdit}`) && 
                                        passInfo[`Passenger ${indexOfCurrEdit}`].hasOwnProperty('name') ? 
                                        passInfo[`Passenger ${indexOfCurrEdit}`].name : 
                                        '' }
                                        onChange={(e) => 
                                          setPassInfo({ ...passInfo, [`Passenger ${indexOfCurrEdit}`]: 
                                          {...passInfo[`Passenger ${indexOfCurrEdit}`], name: e.target.value, 
                                           } })}
                                        />
                                    </div>
                                  </FadeInOut>
                                  </div>
  
                                  <div>
                                
                                    {
                                    seatsOfPass.map((seat, i) => i === index ? (
                                    <FadeInOut show={showPassInfo[index].show } duration={500} >
                                       <div className='d-flex flex-column justify-content-center align-items-center'
                                       style = {{marginTop : '7px'}}>
                                        <Typography className = "mr-5 pr-3 mt-2" color="text.secondary">
                                          {seat}
                                        </Typography>
                                      </div>
                                       </FadeInOut>
                                    ) : (
                                      ''
                                    )
                                    )}
                                 
                                  </div>
  
                                  <div>
                                
                                    {cabinOfPass.map((cabin, i) => i === index ? (
                                    <FadeInOut show={showPassInfo[index].show } duration={500} >
                                       <div className='d-flex flex-column justify-content-center mt-3'
                                        style = {{marginTop : '5px'}}>
                                        <Typography color="text.secondary">
                                          {cabin}
                                        </Typography>
                                      </div>
                                    </FadeInOut>
                                    ) : (
                                      ''
                                    )
                                    )}
                                
                                  </div>
                                  </>
                                )
                              }
                                <div>
                                  <div className='d-flex flex-column justify-content-center align-items-center'>
                                  {
                                    <Button className='m-3' variant="warning" id="button-1" onClick={() => toggleDepShow(index)} disabled = {showPassInfo[index].show}>
                                      {showPassInfo[index].show ? `Now Editing Passenger ${index + 1}` :`Edit Info Passenger ${index + 1}`} 
                                    </Button>
                                  }
                                  </div>
                                </div>
                              </div>
                              
                            )))
                          }
                          </div>
                          
                        </CardContent>
                      </Paper>
                    </Transition>
                  )
              )}
            </div>

            <Button className='w-25 mt-4' variant="success" id="button-1" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Card.Body>) : ''
        }
      </Card>
      </div>
    </>
  )
}


export default EditSeats