import {useContext, useEffect, useState} from "react";
import {SocketServerContext} from "./context/SocketServerProvider.js";
import axios from './api/axios_config'

const App = () => {

    const [testing, setTesting] = useState({})
    const [participants, setParticipants] = useState([])

    const socket = useContext(SocketServerContext)

    const getTesting = async (testingId) => {
        const testing = await axios.get(`api/v1/testings/${testingId}`)
        setTesting(testing.data)
        setParticipants([...testing.data.participants])
        socket.on(`addNewParticipantToRoom_${testingId}`, participant => {
            alert('added new participant')
            console.log(participant)
            setParticipants([...participants, participant])
        })

        socket.on(`nextQuestion_${testingId}`, ({question}) => {
            alert(`You have been moved to the question ${question}`)
        })

        socket.on(`removeParticipantToRoom_${testingId}`, participantId => {
            setParticipants([...participants.filter(item => item.id !== participantId)])
        })

        socket.on(`startTesting_${testingId}`, (res) => {
            alert(`The test is started`)
        })

        socket.on(`endTesting_${testingId}`, (res) => {
            alert(`The test is ended`)
        })

        socket.on(`updateParticipantToRoom_${testingId}`, participant => {
            setParticipants([
                ...participants.filter(item => item.id !== participant.id),
                participant
            ])
        })
    }

    useEffect(() => {
        const testingId = prompt('Enter testing id')
        getTesting(testingId).then(r => {})
    }, [])

    return (
        <div>
            <h1>{testing?.code}</h1>
            {participants.map((participant, idx) => <div key={idx}>
                {participant.name}
            </div>)}
        </div>
    );
};

export default App;