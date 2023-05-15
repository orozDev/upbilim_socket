import {useContext, useEffect, useState} from "react";
import {SocketServerContext} from "./context/SocketServerProvider.js";
import axios from './api/axios_config'

const App = () => {

    const [testing, setTesting] = useState({})
    const [participants, setParticipants] = useState([])

    const socket = useContext(SocketServerContext)
    useEffect(() => {
        const getTesting = async (testingId) => {
            const testing = await axios.get(`api/v1/testings/${testingId}`)
            setTesting(testing.data)
            setParticipants(testing.data.participants)

            return testing.data.participants
        }

        const testingId = prompt('Enter testing id')

        getTesting(testingId).then((participants) => {
            socket.on(`addNewParticipantToRoom_${testingId}`, participant => {
                setParticipants([...participants, participant])
            })

            socket.on(`removeParticipantToRoom_${testingId}`, participantId => {
                setParticipants([...participants.filter(item => item.id !== participantId)])
            })

            socket.on(`updateParticipantToRoom_${testingId}`, participant => {
                setParticipants([
                    ...participants.filter(item => item.id !== participant.id),
                    participant
                ])
            })
        })

        return () => {
            socket.off(`addNewParticipantToRoom_${testingId}`)
        }
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