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

const SelectSeats = () => {
  const scData = SearchCriteriaData();
  const history = useHistory();
  const location = useLocation();
  const user = UserData();
  
  const [depFirstSeats, setDepFirstSeats] = useState([]);
  const [depBusinessSeats, setDepBusinessSeats] = useState([]);
  const [depEconomySeats, setDepEconomySeats] = useState([]);
  const [retFirstSeats, setRetFirstSeats] = useState([]);
  const [retBusinessSeats, setRetBusinessSeats] = useState([]);
  const [retEconomySeats, setRetEconomySeats] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chosenDepartureSeats, setChosenDepartureSeats] = useState([[], [], []]);
  const [chosenArrivalSeats, setChosenArrivalSeats] = useState([[], [], []]);

  const [numOfPass, setNumOfPass] = useState();
  const [cabin, setCabin] = useState();
  const [depSeatsOfPass, setDepSeatsOfPass] = useState([]);
  const [depCabinOfPass, setDepCabinOfPass] = useState([]);
  const [retSeatsOfPass, setRetSeatsOfPass] = useState([]);
  const [retCabinOfPass, setRetCabinOfPass] = useState([]);

  const [passInfo, setPassInfo] = useState({});
  const [passInfo1, setPassInfo1] = useState({});

  const [loadingBtn1, setloadingBtn1] = useState(true);
  const [loadingBtn2, setloadingBtn2] = useState(false);

  const [showDepPassInfo, setShowDepPassInfo] = useState([]);
  const [showRetPassInfo, setShowRetPassInfo] = useState([]);
  const [indexOfCurrEdit, setIndexOfCurrEdit] = useState();

  const [errorHandlingMessage, setErrorHandlingMessage] = useState('');


  console.log("User: ", user)

  useEffect(() => {

    setLoading(true);
    setDepFirstSeats(location.state.departureFlight.FirstSeats)
    setDepBusinessSeats(location.state.departureFlight.BusinessSeats)
    setDepEconomySeats(location.state.departureFlight.EconomySeats)
    setRetFirstSeats(location.state.returnFlight.FirstSeats)
    setRetBusinessSeats(location.state.returnFlight.BusinessSeats)
    setRetEconomySeats(location.state.returnFlight.EconomySeats)
    setNumOfPass(scData.depCriteria.chosenSeats);
    setCabin(scData.depCriteria.cabin);
    console.log("Cabinnn", scData.depCriteria.cabin)

    let passInfos = [];
    for(let i = 0; i < scData.depCriteria.chosenSeats; i++) {
      passInfos.push({show: false});
    }
    setShowDepPassInfo(passInfos);

    let passInfos1 = [];
    for(let i = 0; i < scData.depCriteria.chosenSeats; i++) {
      passInfos1.push({show: false});
    }
    setShowRetPassInfo(passInfos1);

    setDepSeatsOfPass([...Array(scData.depCriteria.chosenSeats)].map(() => ""))
    setDepCabinOfPass([...Array(scData.depCriteria.chosenSeats)].map(() => ""))
    setRetSeatsOfPass([...Array(scData.depCriteria.chosenSeats)].map(() => ""))
    setDepCabinOfPass([...Array(scData.depCriteria.chosenSeats)].map(() => ""))

    setFetched(true)
    setLoading(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fetched])

  const addDepSeatCallback = ({ row, number, id, cCabin }, addCb) => {
    const sId = id - 1;
    addCb(row, number, id)
    setLoading(true)
    if (cCabin === 'FirstSeats') {
      setDepSeatsOfPass([...depSeatsOfPass.slice(0, indexOfCurrEdit), `${row}${number}`, ...depSeatsOfPass.slice((row.charCodeAt(0) - 65) + 1, depSeatsOfPass.length)])
      setDepCabinOfPass([...depCabinOfPass.slice(0, indexOfCurrEdit), `First`, ...depCabinOfPass.slice((row.charCodeAt(0) - 65) + 1, depCabinOfPass.length)])
      setPassInfo({ ...passInfo, [`Passenger ${indexOfCurrEdit}`]: { ...passInfo[`Passenger ${indexOfCurrEdit}`], seat: `${row}${number}`, cabin: 'First' } })
      setChosenDepartureSeats([[...chosenDepartureSeats[0], `${row}${number}`], chosenDepartureSeats[1], chosenDepartureSeats[2]])
      setDepFirstSeats({
        availableSeatsNum: depFirstSeats.availableSeatsNum - 1, allSeats: [...depFirstSeats.allSeats.slice(0, row.charCodeAt(0) - 65),
        depFirstSeats.allSeats[row.charCodeAt(0) - 65].map(
          (seat, i) => (i === (sId))  ? { id: user._id, number, row: row, isSelected: true, tooltip: 'Reserved by you' } : seat),
        ...depFirstSeats.allSeats.slice((row.charCodeAt(0) - 65) + 1, depFirstSeats.allSeats.length)]
      })
    }
    else if (cCabin === 'BusinessSeats') {
      setDepSeatsOfPass([...depSeatsOfPass.slice(0, indexOfCurrEdit), `${row}${number}`, ...depSeatsOfPass.slice((row.charCodeAt(0) - 65) + 1, depSeatsOfPass.length)])
      setDepCabinOfPass([...depCabinOfPass.slice(0, indexOfCurrEdit), `Business`, ...depCabinOfPass.slice((row.charCodeAt(0) - 65) + 1, depCabinOfPass.length)])
      setPassInfo({ ...passInfo, [`Passenger ${indexOfCurrEdit}`]: { ...passInfo[`Passenger ${indexOfCurrEdit}`], seat: `${row}${number}`, cabin: 'Economy' } })
      setChosenDepartureSeats([chosenDepartureSeats[0], [...chosenDepartureSeats[1], `${row}${number}`], chosenDepartureSeats[2]])
      setDepBusinessSeats({
        availableSeatsNum: depBusinessSeats.availableSeatsNum - 1, allSeats: [...depBusinessSeats.allSeats.slice(0, row.charCodeAt(0) - 65), 
          depBusinessSeats.allSeats[row.charCodeAt(0) - 65].map(
          (seat, i) => (i === (sId) ) ? { id: user._id, number, row: row, isSelected: true, tooltip: 'Reserved by you' } : seat),
        ...depBusinessSeats.allSeats.slice((row.charCodeAt(0) - 65) + 1, depBusinessSeats.allSeats.length)]
      })
    }
    else {
      setDepSeatsOfPass([...depSeatsOfPass.slice(0, indexOfCurrEdit), `${row}${number}`, ...depSeatsOfPass.slice((row.charCodeAt(0) - 65) + 1, depSeatsOfPass.length)])
      setDepCabinOfPass([...depCabinOfPass.slice(0, indexOfCurrEdit), `Economy`, ...depCabinOfPass.slice((row.charCodeAt(0) - 65) + 1, depCabinOfPass.length)])
      setPassInfo({ ...passInfo, [`Passenger ${indexOfCurrEdit}`]: { ...passInfo[`Passenger ${indexOfCurrEdit}`], seat: `${row}${number}`, cabin: 'Economy' } })
      setChosenDepartureSeats([chosenDepartureSeats[0], chosenDepartureSeats[1], [...chosenDepartureSeats[2], `${row}${number}`]])
      setDepEconomySeats({
        availableSeatsNum: depEconomySeats.availableSeatsNum - 1, allSeats: [...depEconomySeats.allSeats.slice(0, row.charCodeAt(0) - 65), 
          depEconomySeats.allSeats[row.charCodeAt(0) - 65].map(
          (seat, i) => (i === (sId) ) ? { id: user._id, number, row: row, isSelected: true, tooltip: 'Reserved by you' } : seat),
        ...depEconomySeats.allSeats.slice((row.charCodeAt(0) - 65) + 1, depEconomySeats.allSeats.length)]
      })
    }
    setLoading(false)
  }

  const removeDepSeatCallback = ({ row, number, id, cCabin }, removeCb) => {
    const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
    removeCb(row, number, newTooltip)
    setLoading(true)
    if (cCabin === 'FirstSeats') {
      setDepSeatsOfPass(depSeatsOfPass.map((seat,i) => i === indexOfCurrEdit ? "" : seat));
      setDepCabinOfPass(depCabinOfPass.map((cabin,i) => i === indexOfCurrEdit ? "" : cabin));
      //setPassInfo({ ...passInfo, [`Passenger ${depSeatsOfPass.length + 1}`]: { seat: `${row}${number}`, cabin: 'Economy' } })
      setChosenDepartureSeats([[...(chosenDepartureSeats[0].filter(seat => seat !== `${row}${number}`))], chosenDepartureSeats[1], chosenDepartureSeats[2]])
      setDepFirstSeats({
        availableSeatsNum: depFirstSeats.availableSeatsNum + 1, allSeats: [...depFirstSeats.allSeats.slice(0, row.charCodeAt(0) - 65),
        depFirstSeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? { id: number, number } : seat), ...depFirstSeats.allSeats.slice((row.charCodeAt(0) - 65) + 1,
            depFirstSeats.allSeats.length)]
      })
    }
    else if (cCabin === 'BusinessSeats') {
      setDepSeatsOfPass(depSeatsOfPass.map((seat,i) => i === indexOfCurrEdit ? "" : seat));
      setDepCabinOfPass(depCabinOfPass.map((cabin,i) => i === indexOfCurrEdit ? "" : cabin));
      setChosenDepartureSeats([chosenDepartureSeats[0], [...(chosenDepartureSeats[1].filter(seat => seat !== `${row}${number}`))], chosenDepartureSeats[2]])
      setDepBusinessSeats({
        availableSeatsNum: depBusinessSeats.availableSeatsNum + 1, allSeats: [...depBusinessSeats.allSeats.slice(0, row.charCodeAt(0) - 65),
        depBusinessSeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? { id: number, number } : seat), ...depBusinessSeats.allSeats.slice((row.charCodeAt(0) - 65) + 1,
            depBusinessSeats.allSeats.length)]
      })
    }
    else {
      setDepSeatsOfPass(depSeatsOfPass.map((seat,i) => i === indexOfCurrEdit ? "" : seat));
      setDepCabinOfPass(depCabinOfPass.map((cabin,i) => i === indexOfCurrEdit ? "" : cabin));
      setChosenDepartureSeats([chosenDepartureSeats[0], chosenDepartureSeats[1],
      [...(chosenDepartureSeats[2].filter(seat => seat !== `${row}${number}`))]])
      setDepEconomySeats({
        availableSeatsNum: depEconomySeats.availableSeatsNum + 1, allSeats: [...depEconomySeats.allSeats.slice(0, row.charCodeAt(0) - 65),
        depEconomySeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? { id: number, number } : seat), ...depEconomySeats.allSeats.slice((row.charCodeAt(0) - 65) + 1,
            depEconomySeats.allSeats.length)]
      })
    }
    setLoading(false)
  }

  const addRetSeatCallback = ({ row, number, id, cCabin }, addCb) => {
    const sId = id - 1;
    addCb(row, number, id)
    setLoading(true)
    console.log()
    if (cCabin === 'FirstSeats') {
      setRetSeatsOfPass([...retSeatsOfPass.slice(0, indexOfCurrEdit), `${row}${number}`, ...retSeatsOfPass.slice((row.charCodeAt(0) - 65) + 1, retSeatsOfPass.length)])
      setRetCabinOfPass([...retCabinOfPass.slice(0, indexOfCurrEdit), `First`, ...retCabinOfPass.slice((row.charCodeAt(0) - 65) + 1, retCabinOfPass.length)])
      setPassInfo1({ ...passInfo1, [`Passenger ${indexOfCurrEdit}`]: { ...passInfo1[`Passenger ${indexOfCurrEdit}`], seat: `${row}${number}`, cabin: 'First' } })
      setChosenArrivalSeats([[...chosenArrivalSeats[0], `${row}${number}`], chosenArrivalSeats[1], chosenArrivalSeats[2]])
      setRetFirstSeats({
        availableSeatsNum: retFirstSeats.availableSeatsNum - 1, allSeats: [...retFirstSeats.allSeats.slice(0, row.charCodeAt(0) - 65)
          , retFirstSeats.allSeats[row.charCodeAt(0) - 65].map(
            (seat, i) => (i === (sId)) ? { id: user._id, number, isSelected: true, row: row, tooltip: 'Reserved by you' } : seat),
        ...retFirstSeats.allSeats.slice((row.charCodeAt(0) - 65) + 1, retFirstSeats.allSeats.length)]
      })
    }
    else if (cCabin === 'BusinessSeats') {
      setRetSeatsOfPass([...retSeatsOfPass.slice(0, indexOfCurrEdit), `${row}${number}`, ...retSeatsOfPass.slice((row.charCodeAt(0) - 65) + 1, retSeatsOfPass.length)])
      setRetCabinOfPass([...retCabinOfPass.slice(0, indexOfCurrEdit), `Business`, ...retCabinOfPass.slice((row.charCodeAt(0) - 65) + 1, retCabinOfPass.length)])
      setPassInfo1({ ...passInfo1, [`Passenger ${indexOfCurrEdit}`]: { ...passInfo1[`Passenger ${indexOfCurrEdit}`], seat: `${row}${number}`, cabin: 'Business' } })
      setChosenArrivalSeats([chosenArrivalSeats[0], [...chosenArrivalSeats[1], `${row}${number}`], chosenArrivalSeats[2]])
      setRetBusinessSeats({
        availableSeatsNum: retBusinessSeats.availableSeatsNum - 1, allSeats: [...retBusinessSeats.allSeats.slice(0, row.charCodeAt(0) - 65), retBusinessSeats.allSeats[row.charCodeAt(0) - 65].map(
          (seat, i) => (i === (sId) )? { id: user._id, number, isSelected: true, row: row, tooltip: 'Reserved by you' } : seat),
        ...retBusinessSeats.allSeats.slice((row.charCodeAt(0) - 65) + 1, retBusinessSeats.allSeats.length)]
      })
    }
    else {
      setRetSeatsOfPass([...retSeatsOfPass.slice(0, indexOfCurrEdit), `${row}${number}`, ...retSeatsOfPass.slice((row.charCodeAt(0) - 65) + 1, retSeatsOfPass.length)])
      setRetCabinOfPass([...retCabinOfPass.slice(0, indexOfCurrEdit), `Economy`, ...retCabinOfPass.slice((row.charCodeAt(0) - 65) + 1, retCabinOfPass.length)])
      setPassInfo1({ ...passInfo1, [`Passenger ${indexOfCurrEdit}`]: { ...passInfo1[`Passenger ${indexOfCurrEdit}`], seat: `${row}${number}`, cabin: 'Economy' } })
      setChosenArrivalSeats([chosenArrivalSeats[0], chosenArrivalSeats[1], [...chosenArrivalSeats[2], `${row}${number}`]])
      setRetEconomySeats({
        availableSeatsNum: retEconomySeats.availableSeatsNum - 1, allSeats: [...retEconomySeats.allSeats.slice(0, row.charCodeAt(0) - 65), retEconomySeats.allSeats[row.charCodeAt(0) - 65].map(
          (seat, i) => (i === (sId) ) ? { id: user._id, number, isSelected: true, row: row, tooltip: 'Reserved by you' } : seat),
        ...retEconomySeats.allSeats.slice((row.charCodeAt(0) - 65) + 1, retEconomySeats.allSeats.length)]
      })
    }
    setLoading(false)
  }

  const removeRetSeatCallback = ({ row, number, id, cCabin }, removeCb) => {
    const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
    removeCb(row, number, newTooltip)
    setLoading(true)
    if (cCabin === 'FirstSeats') {
      setRetSeatsOfPass(retSeatsOfPass.map((seat,i) => i === indexOfCurrEdit ? "" : seat));
      setRetCabinOfPass(retCabinOfPass.map((cabin,i) => i === indexOfCurrEdit ? "" : cabin));
      setChosenArrivalSeats([[...(chosenArrivalSeats[0].filter(seat => seat !== `${row}${number}`))], chosenArrivalSeats[1], chosenArrivalSeats[2]])
      setRetFirstSeats({
        availableSeatsNum: retFirstSeats.availableSeatsNum + 1, allSeats: [...retFirstSeats.allSeats.slice(0, row.charCodeAt(0) - 65),
        retFirstSeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? { id: number, number } : seat), ...retFirstSeats.allSeats.slice((row.charCodeAt(0) - 65) + 1,
            retFirstSeats.allSeats.length)]
      })
    }
    else if (cCabin === 'BusinessSeats') {
      setRetSeatsOfPass(retSeatsOfPass.map((seat,i) => i === indexOfCurrEdit ? "" : seat));
      setRetCabinOfPass(retCabinOfPass.map((cabin,i) => i === indexOfCurrEdit ? "" : cabin));
      setChosenArrivalSeats([chosenArrivalSeats[0], [...(chosenArrivalSeats[1].filter(seat => seat !== `${row}${number}`))], chosenArrivalSeats[2]])
      setRetBusinessSeats({
        availableSeatsNum: retBusinessSeats.availableSeatsNum + 1, allSeats: [...retBusinessSeats.allSeats.slice(0, row.charCodeAt(0) - 65),
        retBusinessSeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? { id: number, number } : seat), ...retBusinessSeats.allSeats.slice((row.charCodeAt(0) - 65) + 1,
            retBusinessSeats.allSeats.length)]
      })
    }
    else {
      setRetSeatsOfPass(retSeatsOfPass.map((seat,i) => i === indexOfCurrEdit ? "" : seat));
      setRetCabinOfPass(retCabinOfPass.map((cabin,i) => i === indexOfCurrEdit ? "" : cabin));
      setChosenArrivalSeats([chosenArrivalSeats[0], chosenArrivalSeats[1], [...(chosenArrivalSeats[2].filter(seat => seat !== `${row}${number}`))]])
      setRetEconomySeats({
        availableSeatsNum: retEconomySeats.availableSeatsNum + 1, allSeats: [...retEconomySeats.allSeats.slice(0, row.charCodeAt(0) - 65),
        retEconomySeats.allSeats[row.charCodeAt(0) - 65]
          .map((seat, i) => (seat && seat.id === user._id && seat.number === number) ? { id: number, number } : seat), ...retEconomySeats.allSeats.slice((row.charCodeAt(0) - 65) + 1,
            retEconomySeats.allSeats.length)]
      })
    }
    setLoading(false)
  }

  const handleSubmit = () => {
    let depFlag = true;
    let retFlag = true;
    console.log('prop1', Object.keys(passInfo).length)
    console.log('prop2', Object.keys(passInfo1).length)

    for(let i = 0; i < Object.keys(passInfo).length; i++){
      if(Object.keys(passInfo[`Passenger ${i}`]).length !== 3){
        console.log('prop11', Object.keys(passInfo[`Passenger ${i}`]).length)
        depFlag = false;
        break;
      }
    }
    for(let i = 0; i < Object.keys(passInfo1).length; i++){
      if(Object.keys(passInfo1[`Passenger ${i}`]).length !== 3){
        console.log('prop22', Object.keys(passInfo1[`Passenger ${i}`]).length)
        retFlag = false;
        break;
      }
    }
    if(Object.keys(passInfo).length !== numOfPass || Object.keys(passInfo1).length !== numOfPass){
      console.log('First caseee')
      setErrorHandlingMessage('You Forgot To Fill All Inputs');
    }
    else if(!depFlag || !retFlag){
      console.log('second caseee')
      setErrorHandlingMessage('You Forgot To Fill All Inputs')
    }
    else{
      console.log('flag11', depFlag)
      console.log('flag22', retFlag)
      console.log('elseeeee')
      
      console.log('heree in departure seats', depFirstSeats)
      axios.patch(`http://localhost:8000/flights/${location.state.departureFlight._id}`, {
        updatedFlights: {
          FirstSeats: depFirstSeats, BusinessSeats: depBusinessSeats,
          EconomySeats: depEconomySeats
        }
      }).then((response) => {
        let updatedDep =  response.data;
        console.log('heree in return seats', retFirstSeats)
        axios.patch(`http://localhost:8000/flights/${location.state.returnFlight._id}`, {
          updatedFlights: {
            FirstSeats: retFirstSeats, BusinessSeats: retBusinessSeats,
            EconomySeats: retEconomySeats
          }
        }).then((res) => {
          let updatedRet = res.data;
          history.push(`/BookingTripInfo`, {
            dFlight: updatedDep, rFlight: updatedRet, dSeats: depSeatsOfPass, rSeats: retSeatsOfPass,
            cabin: scData.depCriteria.cabin, depPassInfo: passInfo, retPassInfo: passInfo1
        })
      })
    })
  }
}

  const toggleDepShow = (index) => {
    setShowDepPassInfo(showDepPassInfo.map((info, i) => i === index ? {show: !info.show} : {show: false}))
    setIndexOfCurrEdit(index)
  };
  const toggleRetShow = (index) => {
    setShowRetPassInfo(showRetPassInfo.map((info, i) => i === index ? {show: !info.show} : {show: false}))
    setIndexOfCurrEdit(index)
  };

  ///BookingTripInfo
  console.log('deparrayyy', depSeatsOfPass);
  console.log('retarrayyy', retSeatsOfPass);
  //
  console.log('depPass', passInfo);
  console.log('retPass', passInfo1);

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
                                <Cabins title={'Departure'} chosenCabin={cabin} passengers={numOfPass} state={{ loading: loading, firstSeats: depFirstSeats, businessSeats: depBusinessSeats, economySeats: depEconomySeats }}
                                  addSeatCallback={addDepSeatCallback}
                                  removeSeatCallback={removeDepSeatCallback} handleSubmit={handleSubmit} />
                              </Transition>
                            )
                        )}
                        {retTransitions(
                          (styles, item) =>
                            item && (
                              <Transition style={styles} >
                                <Cabins title={'Return'} chosenCabin={cabin} passengers={numOfPass} state={{ loading: loading, firstSeats: retFirstSeats, businessSeats: retBusinessSeats, economySeats: retEconomySeats }}
                                  addSeatCallback={addRetSeatCallback}
                                  removeSeatCallback={removeRetSeatCallback} handleSubmit={handleSubmit} />
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
            </Paper>

            <div className='w-75 mt-3 mb-4 d-flex justify-content-between'>
              <Button className='m-2' variant='warning' onClick={() => { setRetVisible(false); setloadingBtn1(true); setloadingBtn2(false); setTimeout(() => setDepVisible(true), 1000); showRetPassInfo.map(info => info.show = false)}} 
              disabled = {loadingBtn1 === true} >
                {loadingBtn1 ? "Currently Viewing Departure Seats" : "Show Departure Plane"}
              </Button>
              <Button className='m-2' variant='warning' onClick={() => { setDepVisible(false); setloadingBtn1(false); setloadingBtn2(true); setTimeout(() => setRetVisible(true), 1000); showDepPassInfo.map(info => info.show = false) }}
                disabled = {loadingBtn2 === true}  >
                {loadingBtn2 ? "Currently Viewing Return Seats" : "Show Return Plane"}
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
                            Chosen Departure Flight Seats
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
                                showDepPassInfo[index].show === false ? (
                                  <FadeInOut show={!showDepPassInfo[index].show } duration={500} >
                                  <Typography className='mt-3' variant="h5" color="text.secondary" gutterBottom>
                                   Passenger {index} Info
                                  </Typography>
                                </FadeInOut>
                                ) : (
                                  <>
                                  <div>
                                  <FadeInOut show={showDepPassInfo[index].show } duration={500} >
                                    <div className='d-flex flex-column justify-content-center w-75'>
                                      <TextField
                                        id="standard-password-input"
                                        label={`Passenger ${index + 1 } Name`}
                                        type="text"
                                        variant="standard"
                                        defaultValue = { 
                                        passInfo.hasOwnProperty(`Passenger ${indexOfCurrEdit}`) && 
                                        passInfo[`Passenger ${indexOfCurrEdit}`].hasOwnProperty('name') ? passInfo[`Passenger ${indexOfCurrEdit}`].name : '' }
                                        onChange={(e) => 
                                          setPassInfo({ ...passInfo, [`Passenger ${indexOfCurrEdit}`]: 
                                          {...passInfo[`Passenger ${indexOfCurrEdit}`], name: e.target.value, 
                                           } })}
                                        />
                                    </div>
                                  </FadeInOut>
                                  </div>
  
                                  <div>
                                
                                    {depSeatsOfPass.map((seat, i) => i === index ? (
                                    <FadeInOut show={showDepPassInfo[index].show } duration={500} >
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
                                
                                    {depCabinOfPass.map((cabin, i) => i === index ? (
                                    <FadeInOut show={showDepPassInfo[index].show } duration={500} >
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
                                    <Button className='m-3' variant="warning" id="button-1" onClick={() => toggleDepShow(index)} disabled = {showDepPassInfo[index].show}>
                                      {showDepPassInfo[index].show ? `Now Editing Passenger ${index + 1}` :`Edit Info Passenger ${index + 1}`} 
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
              {retTransitions(
                (styles, item) =>
                  item && (
                    <Transition width={'w-100'} style={styles} >
                    <Paper elevation={3} className='m-2 w-100 text-center'>
                      <CardContent>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                          Chosen Return Flight Seats
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
                                showRetPassInfo[index].show === false ? (
                                <FadeInOut show={!showRetPassInfo[index].show } duration={500} >
                                <Typography className='mt-3' variant="h5" color="text.secondary" gutterBottom>
                                Passenger {index} Info
                                </Typography>
                              </FadeInOut>
                              ) : (
                                <>
                                <div>
                                <FadeInOut show={showRetPassInfo[index].show } duration={500} >
                                  <div className='d-flex flex-column justify-content-center w-75'>
                                    <TextField
                                      id="standard-password-input"
                                      label={`Passenger ${index + 1 } Name`}
                                      type="text"
                                      variant="standard"
                                      defaultValue = { 
                                        passInfo1.hasOwnProperty(`Passenger ${indexOfCurrEdit}`) && 
                                        passInfo1[`Passenger ${indexOfCurrEdit}`].hasOwnProperty('name') ? passInfo1[`Passenger ${indexOfCurrEdit}`].name : '' }
                                      onChange={(e) => 
                                        setPassInfo1({ ...passInfo1, [`Passenger ${indexOfCurrEdit}`]: 
                                        { ...passInfo1[`Passenger ${indexOfCurrEdit}`], name: e.target.value, 
                                         } })}
                                      />
                                  </div>
                                </FadeInOut>
                                </div>
  
                                <div>
                                
                                {retSeatsOfPass.map((seat, i) => i === index ? (
                                <FadeInOut show={showRetPassInfo[index].show } duration={500} >
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
                            
                                {retCabinOfPass.map((cabin, i) => i === index ? (
                                <FadeInOut show={showRetPassInfo[index].show } duration={500} >
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
                                  <Button className='m-3' variant="warning" id="button-1" onClick={() => toggleRetShow(index)} disabled = {showRetPassInfo[index].show}>
                                    {showRetPassInfo[index].show ? `Now Editing Passenger ${index + 1}` :`Edit Info Passenger ${index + 1}`} 
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


export default SelectSeats