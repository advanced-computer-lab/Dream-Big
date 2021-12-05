import Cabin from './Cabin'
import React from "react"

const Cabins = props => {
    const {loading, firstSeats, businessSeats, economySeats} = props.state
    return (
        <div className = {`plane d-flex flex-column align-items-center text-center ${props.title}`}>
            <div className="cockpit" >
                <div className = 'm-3'>
                  <h1>Choose {props.title} Seats</h1>
                </div>
            </div>
            <div className = "d-flex flex-column align-items-center fuselage" style = {{backgroundColor: 'rgba(255, 255, 255, 0.3 )'}}>
            <div className = 'mt-2 mb-2' >
                <Cabin cabin = 'First' maxNum = {props.passengers} chosenCabin = { props.chosenCabin } seats = {firstSeats.allSeats} loading = {loading} 
                addSeatCallback = {props.addSeatCallback} 
                removeSeatCallback = {props.removeSeatCallback}/>
            </div>
            <div className = 'd-flex justify-content-between w-75'>
                <img src="https://img.icons8.com/ios/50/000000/fire-exit.png" alt = 'Exit'/>
                <img src="https://img.icons8.com/ios/50/000000/exit-sign.png" alt = 'Exit'/>
            </div>
            <div className = 'mt-2 mb-2'>
                <Cabin cabin = 'Business' maxNum = {props.passengers} chosenCabin = { props.chosenCabin } seats = {businessSeats.allSeats} loading = {loading} 
                addSeatCallback = {props.addSeatCallback} 
                removeSeatCallback = {props.removeSeatCallback}/>
            </div>
            <div className = 'd-flex justify-content-between w-75 '>
                <img src="https://img.icons8.com/ios/50/000000/fire-exit.png" alt = 'Exit'/>
                <img src="https://img.icons8.com/ios/50/000000/exit-sign.png" alt = 'Exit'/>
            </div>
            <div className = 'mt-2 mb-2 ' >
                <Cabin cabin = 'Economy' maxNum = {props.passengers} seats = {economySeats.allSeats} loading = {loading} 
                addSeatCallback = {props.addSeatCallback} 
                removeSeatCallback = {props.removeSeatCallback}/>
            </div>
            </div>
        </div>
    )
}

export default Cabins