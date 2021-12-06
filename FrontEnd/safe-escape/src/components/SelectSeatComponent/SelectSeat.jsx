import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Cabins from './Cabins'
import Transition from "./Plane"
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
import { SearchCriteriaContext, SearchCriteriaData } from "../../SearchCriteriaContext";
import axios from 'axios'

const SelectSeats = () => {
    const scData = SearchCriteriaData();
    const history = useHistory();
    const location = useLocation();
    const [ depFirstSeats, setDepFirstSeats ] = useState(location.state.departureFlight.FirstSeats);
    const [ depBusinessSeats, setDepBusinessSeats ] = useState(location.state.departureFlight.BusinessSeats);
    const [ depEconomySeats, setDepEconomySeats ] = useState(location.state.departureFlight.EconomySeats);
    const [ retFirstSeats, setRetFirstSeats ] = useState(location.state.returnFlight.FirstSeats);
    const [ retBusinessSeats, setRetBusinessSeats ] = useState(location.state.returnFlight.BusinessSeats);
    const [ retEconomySeats, setRetEconomySeats ] = useState(location.state.returnFlight.EconomySeats);
    const [ fetched, setFetched ] = useState(true);
    const [ loading, setLoading ] = useState(false);
    const [ chosenDepartureSeats, setChosenDepartureSeats ] = useState([[],[],[]]);
    const [ chosenArrivalSeats, setChosenArrivalSeats ] = useState([[],[],[]]);

    const [ numOfPass, setNumOfPass] = useState(scData.depCriteria.chosenSeats);
    const [ cabin, setCabin] = useState(scData.depCriteria.cabin);
    const [ depSeatsOfPass, setDepSeatsOfPass] = useState([]);
    const [ depCabinOfPass, setDepCabinOfPass] = useState([]);
    const [ retSeatsOfPass, setRetSeatsOfPass] = useState([]);
    const [ retCabinOfPass, setRetCabinOfPass] = useState([]);

    const [ passInfo ,setPassInfo] = useState({});

    console.log('passinfoo', passInfo);
    console.log('deparrayy', depSeatsOfPass);
    console.log('retarrayyy', retSeatsOfPass);

    console.log(scData, 'sdddd')

    const user = UserData();

    let buttons = [];

    for (let i = 1; i <= numOfPass; i++) {
      buttons.push(
          <Button className = 'm-1' variant="warning" id="button-1" >
            Passenger {i}
          </Button>
        );
    }

    const addDepSeatCallback = ({ row, number, id, cabin }, addCb) => {
        const sId = id;
        addCb(row, number, id, '')
        setLoading(true)
        if(cabin === 'First'){
          setDepSeatsOfPass([...depSeatsOfPass, `${row}${number}`])
          setDepCabinOfPass([...depCabinOfPass, 'First'])
          setPassInfo({...passInfo,[`Passenger ${ depSeatsOfPass.length + 1}`]: {seat: `${row}${number}`, cabin: 'Economy'}})
          setChosenDepartureSeats([[...chosenDepartureSeats[0],`${row}${number}`],chosenDepartureSeats[1], chosenDepartureSeats[2]])
          setDepFirstSeats({availableSeatsNum: depFirstSeats.availableSeatsNum - 1 , allSeats: [...depFirstSeats.allSeats.slice(0, row.charCodeAt(0) - 65),
          depFirstSeats.allSeats[row.charCodeAt(0) - 65].map(
            (seat, i) => i === (sId - 1) ? {id: user._id, number, row: row, isSelected: true, tooltip: 'Reserved by you'} : seat), 
            ...depFirstSeats.allSeats.slice((row.charCodeAt(0) - 65)+1, depFirstSeats.allSeats.length)]})
        }
        else if(cabin === 'Business'){
          setDepSeatsOfPass([...depSeatsOfPass, `${row}${number}`])
          setDepCabinOfPass([...depCabinOfPass, 'Business'])
          setPassInfo({...passInfo,[`Passenger ${ depSeatsOfPass.length + 1}`]: {seat: `${row}${number}`, cabin: 'Economy'}})
          setChosenDepartureSeats([chosenDepartureSeats[0],[...chosenDepartureSeats[1],`${row}${number}`], chosenDepartureSeats[2]])
          setDepBusinessSeats({availableSeatsNum: depBusinessSeats.availableSeatsNum - 1 , allSeats: [...depBusinessSeats.allSeats.slice(0, row.charCodeAt(0) - 65),depBusinessSeats.allSeats[row.charCodeAt(0) - 65].map(
            (seat, i) => i === (sId - 1) ? { id: user._id, number, row: row, isSelected: true, tooltip: 'Reserved by you'} : seat), 
            ...depBusinessSeats.allSeats.slice((row.charCodeAt(0) - 65)+1,depBusinessSeats.allSeats.length)]})
        }
        else{
          setDepSeatsOfPass([...depSeatsOfPass, `${row}${number}`])
          setDepCabinOfPass([...depCabinOfPass, 'Economy'])
          setPassInfo({...passInfo,[`Passenger ${ depSeatsOfPass.length + 1}`]: {seat: `${row}${number}`, cabin: 'Economy'}})
          setChosenDepartureSeats([chosenDepartureSeats[0],chosenDepartureSeats[1],[...chosenDepartureSeats[2],`${row}${number}`]])
          setDepEconomySeats({availableSeatsNum: depEconomySeats.availableSeatsNum - 1 , allSeats: [...depEconomySeats.allSeats.slice(0, row.charCodeAt(0) - 65),depEconomySeats.allSeats[row.charCodeAt(0) - 65].map(
            (seat, i) => i === (sId - 1) ? {id: user._id, number, row: row, isSelected: true, tooltip: 'Reserved by you'} : seat), 
            ...depEconomySeats.allSeats.slice((row.charCodeAt(0) - 65)+1, depEconomySeats.allSeats.length)]})
        }
        setLoading(false)
    }
 
    const removeDepSeatCallback = ({ row, number, id, cabin }, removeCb) => {
        const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
        removeCb(row, number, newTooltip)
        setLoading(true)
        if(cabin === 'First'){
          setChosenDepartureSeats([[...(chosenDepartureSeats[0].filter(seat => seat !== `${row}${number}`))],chosenDepartureSeats[1], chosenDepartureSeats[2]])
          setDepFirstSeats({availableSeatsNum: depFirstSeats.availableSeatsNum + 1 , allSeats: [...depFirstSeats.allSeats.slice(0, row.charCodeAt(0) - 65),
          depFirstSeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? {id: number, number} : seat), ...depFirstSeats.allSeats.slice((row.charCodeAt(0) - 65)+1, 
          depFirstSeats.allSeats.length)]
          })
        }
        else if(cabin === 'Business'){
          setChosenDepartureSeats([chosenDepartureSeats[0],[...(chosenDepartureSeats[1].filter(seat => seat !== `${row}${number}`))], chosenDepartureSeats[2]])
          setDepBusinessSeats({availableSeatsNum: depBusinessSeats.availableSeatsNum + 1 , allSeats: [...depBusinessSeats.allSeats.slice(0, row.charCodeAt(0) - 65),
          depBusinessSeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? {id: number, number} : seat), ...depBusinessSeats.allSeats.slice((row.charCodeAt(0) - 65)+1, 
          depBusinessSeats.allSeats.length)]})
        }
        else{
          setChosenDepartureSeats([chosenDepartureSeats[0],chosenDepartureSeats[1], 
          [...(chosenDepartureSeats[2].filter(seat => seat !== `${row}${number}`))]])
          setDepEconomySeats({availableSeatsNum: depEconomySeats.availableSeatsNum + 1 , allSeats: [...depEconomySeats.allSeats.slice(0, row.charCodeAt(0) - 65),
          depEconomySeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? {id: number, number} : seat), ...depEconomySeats.allSeats.slice((row.charCodeAt(0) - 65)+1, 
          depEconomySeats.allSeats.length)]
          })
        }
        setLoading(false)
    }

    const addRetSeatCallback = ({ row, number, id, cabin }, addCb) => {
      const sId = id;
      addCb(row, number, id, '')
      setLoading(true)
      if(cabin === 'First'){
        setRetSeatsOfPass([...retSeatsOfPass, `${row}${number}`])
        setRetCabinOfPass([...retCabinOfPass, 'First'])
        setChosenArrivalSeats([[...chosenArrivalSeats[0],`${row}${number}`],chosenArrivalSeats[1], chosenArrivalSeats[2]])
        setRetFirstSeats({availableSeatsNum: retFirstSeats.availableSeatsNum - 1 , allSeats: [...retFirstSeats.allSeats.slice(0, row.charCodeAt(0) - 65)
          ,retFirstSeats.allSeats[row.charCodeAt(0) - 65].map(
          (seat, i) => i === (sId - 1) ? {id: user._id, number, isSelected: true, row: row, tooltip: 'Reserved by you'} : seat), 
          ...retFirstSeats.allSeats.slice((row.charCodeAt(0) - 65)+1, retFirstSeats.allSeats.length)]})
      }
      else if(cabin === 'Business'){
        setRetSeatsOfPass([...retSeatsOfPass, `${row}${number}`])
        setRetCabinOfPass([...retCabinOfPass, 'Business'])
        setChosenArrivalSeats([chosenArrivalSeats[0],[...chosenArrivalSeats[1],`${row}${number}`], chosenArrivalSeats[2]])
        setRetBusinessSeats({availableSeatsNum: retBusinessSeats.availableSeatsNum - 1 , allSeats: [...retBusinessSeats.allSeats.slice(0, row.charCodeAt(0) - 65),retBusinessSeats.allSeats[row.charCodeAt(0) - 65].map(
          (seat, i) => i === (sId - 1) ? {id: user._id, number, isSelected: true, row: row, tooltip: 'Reserved by you'} : seat), 
          ...retBusinessSeats.allSeats.slice((row.charCodeAt(0) - 65)+1,retBusinessSeats.allSeats.length)]})
      }
      else{
        setRetSeatsOfPass([...retSeatsOfPass, `${row}${number}`])
        setRetCabinOfPass([...retCabinOfPass, 'Economy'])
        setChosenArrivalSeats([chosenArrivalSeats[0],chosenArrivalSeats[1],[...chosenArrivalSeats[2],`${row}${number}`]])
        setRetEconomySeats({availableSeatsNum: retEconomySeats.availableSeatsNum - 1 , allSeats: [...retEconomySeats.allSeats.slice(0, row.charCodeAt(0) - 65),retEconomySeats.allSeats[row.charCodeAt(0) - 65].map(
          (seat, i) => i === (sId - 1) ? {id: user._id, number, isSelected: true, row: row, tooltip: 'Reserved by you'} : seat), 
          ...retEconomySeats.allSeats.slice((row.charCodeAt(0) - 65)+1, retEconomySeats.allSeats.length)]})
      }
      setLoading(false)
    }

    const removeRetSeatCallback = ({ row, number, id, cabin }, removeCb) => {
        const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
        removeCb(row, number, newTooltip)
        setLoading(true)
        if(cabin === 'First'){
          setChosenArrivalSeats([[...(chosenArrivalSeats[0].filter(seat => seat !== `${row}${number}`))],chosenArrivalSeats[1], chosenArrivalSeats[2]])
          setRetFirstSeats({availableSeatsNum: retFirstSeats.availableSeatsNum + 1 , allSeats: [...retFirstSeats.allSeats.slice(0, row.charCodeAt(0) - 65),
          retFirstSeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? {id: number, number} : seat), ...retFirstSeats.allSeats.slice((row.charCodeAt(0) - 65)+1, 
          retFirstSeats.allSeats.length)]
          })
        }
        else if(cabin === 'Business'){
          setChosenArrivalSeats([chosenArrivalSeats[0],[...(chosenArrivalSeats[1].filter(seat => seat !== `${row}${number}`))], chosenArrivalSeats[2]])
          setRetBusinessSeats({availableSeatsNum: retBusinessSeats.availableSeatsNum + 1 , allSeats: [...retBusinessSeats.allSeats.slice(0, row.charCodeAt(0) - 65),
          retBusinessSeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? {id: number, number} : seat), ...retBusinessSeats.allSeats.slice((row.charCodeAt(0) - 65)+1, 
          retBusinessSeats.allSeats.length)]})
        }
        else{
          setChosenArrivalSeats([chosenArrivalSeats[0],chosenArrivalSeats[1],[...(chosenArrivalSeats[2].filter(seat => seat !== `${row}${number}`))]])
          setRetEconomySeats({availableSeatsNum: retEconomySeats.availableSeatsNum + 1 , allSeats: [...retEconomySeats.allSeats.slice(0, row.charCodeAt(0) - 65),
          retEconomySeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? {id: number, number} : seat), ...retEconomySeats.allSeats.slice((row.charCodeAt(0) - 65)+1, 
          retEconomySeats.allSeats.length)]
          })
        }
        setLoading(false)
    }

    const handleSubmit = () => {
        console.log('heree in departure seats', depFirstSeats)
        axios.patch('http://localhost:8000/flights/61ab38be47a43061f70d0262', { updatedFlights: {FirstSeats: depFirstSeats, BusinessSeats: depBusinessSeats, 
        EconomySeats: depEconomySeats} })
        .then((response) => { console.log('dep updated: ', response); })

        console.log('heree in return seats', retFirstSeats)
        axios.patch('http://localhost:8000/flights/61aabb22a6e8ee04242bcdbe', { updatedFlights: {FirstSeats: retFirstSeats, BusinessSeats: retBusinessSeats, 
        EconomySeats: retEconomySeats} })
        .then((response) => {  console.log('arr updated: ', response); })

        history.push(`/BookingTripInfo`,{dFlight: location.state.departureFlight, rFlight: location.state.returnFlight, dSeats: depSeatsOfPass, rSeats:retSeatsOfPass,
          cabin: scData.depCriteria.cabin })
    }
    ///BookingTripInfo

    console.log('deparrayy', depSeatsOfPass);
    console.log('retarrayyy', retSeatsOfPass);
    //setTimeout(()=>myRef.current.scrollIntoView({behavior: 'smooth'}), 500)
    
    const [depVisible, setDepVisible] = useState(true);
    const depTransitions = useTransition(depVisible, {
      from: { opacity: 0, transform: "translateY(40px)" },
      enter: { opacity: 1, transform: "translateY(0px)" },
      leave: { opacity: 0, transform: "translateY(40px)" }
    })

    const [retVisible, setRetVisible] = useState(false);
    const retTransitions = useTransition(retVisible, {
      from: { opacity: 0, transform: "translateY(40px)" },
      enter: { opacity: 1, transform: "translateY(0px)" },
      leave: { opacity: 0, transform: "translateY(40px)" }
    })

    //     [{id: 1, number: 1, isSelected: true, tooltip: 'Reserved by you'}, {id: 2, number: 2, tooltip: 'Cost: 15$'}, null, {id: 3, number: '3', isReserved: true, orientation: 'east', tooltip: 'Reserved by Rogger'}, null, {id: 15, number: 3, isReserved: true, orientation: 'east'}, {id: 16, number: '4', orientation: 'west'}, null, {id: 17, number: 5}, {id: 18, number: 6}],
    //     [{id: 19, number: 1, tooltip: 'Cost: 25$'},{id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5, tooltip: 'Cost: 11$'},
    return (
      <>
        <Card className ="m-auto w-100" style = {{backgroundColor: 'transparent'}}>
            <Card.Body className ="d-flex">
                <Col lg ={6}>

                    <Paper elevation={3} style = {{backgroundColor: 'rgba(255, 255, 255, 0.2)', height: '120vh'}}>
                      <div className = 'd-flex justify-content-center align-items-center w-100'style = {{marginBottom: '4vh'}} >
                        {
                          (fetched === true) ? 
                          (
                              <div>
                                {depTransitions(
                                    (styles, item) =>
                                    item && (
                                        <Transition style={styles} >
                                          <Cabins title = {'Departure'} chosenCabin = {cabin} passengers = {numOfPass} state = {{loading: loading, firstSeats: depFirstSeats, businessSeats: depBusinessSeats, economySeats: depEconomySeats}} 
                                          addSeatCallback = {addDepSeatCallback} 
                                          removeSeatCallback = {removeDepSeatCallback} handleSubmit = {handleSubmit}/>
                                        </Transition>
                                    )
                                )}
                                {retTransitions(
                                    (styles, item) =>
                                    item && (
                                        <Transition style={styles} >
                                          <Cabins title = {'Return'} chosenCabin = {cabin} passengers = {numOfPass} state = {{loading: loading, firstSeats: retFirstSeats, businessSeats: retBusinessSeats, economySeats: retEconomySeats}} 
                                          addSeatCallback = {addRetSeatCallback} 
                                          removeSeatCallback = {removeRetSeatCallback} handleSubmit = {handleSubmit}/>
                                        </Transition>
                                    )
                                )}
                              </div>) :
                            (
                              <Box sx={{ margin : '2rem', display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                              </Box>
                            )
                        }
                      </div>
                    </Paper>

                </Col>

                <Col lg ={6} className = 'd-flex flex-column justify-content-center align-items-center' 
                style = {{ backgroundColor: 'rgba(255, 255, 255, 0.2)', height: '120vh'}}>
                    <Paper elevation={3} className = 'w-75 text-center d-flex justify-content-center'>
                      <CardContent>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                          Departure/Return Flight Seats Details
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
                      {/* <CardContent>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                          Color Schema Of Seats
                        </Typography>
                          <div>
                            <Typography variant="h6" component="div">
                              Number Of Passengers: {'Num'}
                            </Typography>
                          </div>
                          <div>
                          <Typography variant="h6" component="div">
                              Chosen Cabin: {'Cabin'}
                          </Typography>
                        </div>
                      </CardContent> */}
                    </Paper>

                    <div className = 'mt-3 mb-3'>
                      <Button className = 'm-2' variant = 'warning' onClick={() => { setRetVisible(false); setTimeout(()=>setDepVisible(true), 1000) }}  >
                        Show Departure Plane
                      </Button>
                      <Button className = 'm-2' variant = 'warning' onClick={() => { setDepVisible(false); setTimeout(()=>setRetVisible(true), 1000) }}  >
                        Show Return Plane
                      </Button>
                    </div>

                    <div className = 'w-100 d-flex justify-content-center align-items-center' style = {{height: '50vh',marginRight: '2vh'}}>
                      {depTransitions(
                          (styles, item) =>
                          item && (
                              <Transition width = {'w-75'} style={styles} >
                                <Paper elevation={3} className = 'm-2 w-100 text-center'>
                                    <CardContent>
                                      <Typography variant="h5" color="text.secondary" gutterBottom>
                                        Chosen Departure Flight Seats
                                      </Typography>
                                      <div className = 'd-flex justify-content-center'>
                                        <div>
                                          <Typography className = 'm-3' variant="h6" component="div">
                                            Passengers
                                          </Typography>
                                          <div className = 'd-flex flex-column justify-content-center'>
                                            { buttons }
                                          </div>
                                        </div>

                                        <div>
                                          <Typography className = 'm-3' variant="h6" component="div">
                                            Passengers Seats
                                          </Typography>
                                          <div className = 'd-flex flex-column justify-content-center'>
                                            { depSeatsOfPass.map(seat => (
                                              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {seat}
                                              </Typography>
                                            )) }
                                          </div>
                                        </div>

                                        <div>
                                          <Typography className = 'm-3' variant="h6" component="div">
                                            Passengers Class
                                          </Typography>
                                          { depCabinOfPass.map(cabin => (
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                              {cabin}
                                            </Typography>
                                          )) }
                                        </div>
                                      </div>
                                    </CardContent>
                                </Paper>
                              </Transition>
                          )
                      )}
                      {retTransitions(
                          (styles, item) =>
                          item && (
                              <Transition width = {'w-75'} style={styles} >
                                <Paper elevation={3} className = 'm-2 w-100 text-center'>
                                    <CardContent>
                                      <Typography variant="h5" color="text.secondary" gutterBottom>
                                        Chosen Arrival Flight Seats
                                      </Typography>
                                      <div className = 'd-flex justify-content-center'>
                                        <div>
                                          <Typography className = 'm-3' variant="h6" component="div">
                                            Passengers
                                          </Typography>
                                          <div className = 'd-flex flex-column justify-content-center'>
                                            { buttons }
                                          </div>
                                        </div>

                                        <div>
                                          <Typography className = 'm-3' variant="h6" component="div">
                                            Passengers Seats
                                          </Typography>
                                          { retSeatsOfPass.map(seat => (
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                              {seat}
                                            </Typography>
                                          )) }
                                        </div>

                                        <div>
                                          <Typography className = 'm-3' variant="h6" component="div">
                                            Passengers Class
                                          </Typography>
                                          { retCabinOfPass.map(cabin => (
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                              {cabin}
                                            </Typography>
                                          )) }
                                        </div>
                                      </div>
                                    </CardContent>
                                </Paper>
                              </Transition>
                          )
                      )}
                    </div>

                    <Button className = 'w-25 mt-3' variant="success" id="button-1" onClick = {handleSubmit} >
                          Submit
                    </Button>
                </Col>
            </Card.Body>
        </Card>
      </>
    )
}


export default SelectSeats