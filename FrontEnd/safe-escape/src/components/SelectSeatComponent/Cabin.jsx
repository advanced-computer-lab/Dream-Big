import SeatPicker from './react-seat-picker-master/react-seat-picker-master/src'
import { UserData } from '../../UserContext';
const Cabin = props => {
    const user = UserData()
    console.log('cabin propsss', props.cabin)
    return (
        <>
        <h1>{props.name} Class</h1>
        <SeatPicker
        userId = {user._id}
        addSeatCallback={({ row, number, id }, addCb) => props.addSeatCallback({ row, number, id, cCabin : props.cabin}, addCb)}
        removeSeatCallback={({ row, number, id }, removeCb) => props.removeSeatCallback({ row, number, id, cCabin : props.cabin}, removeCb)}
        rows={props.seats}
        maxReservableSeats={props.maxNum}
        alpha
        visible
        selectedByDefault
        cabin = {props.cabin}
        chosenCabin = {props.chosenCabin}
        loading={props.loading}
        tooltipProps={{multiline: true}}
        />
        </>
    )
}

export default Cabin