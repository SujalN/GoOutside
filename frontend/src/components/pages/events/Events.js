import React from 'react'
import EventsList from './EventsList'
import Map from '../map/Map'
import FloatingActionButton from '../../buttons/FloatingActionButton'
import MapViewTask from '../map/MapViewTask'
import CustomDialog from '../../modals/CustomDialog'
import CustomButton from '../../buttons/CustomButton'
import Alert from '@material-ui/lab/Alert'
import { useAuthContext } from '../../../contexts/AuthContext'
import { useTasksContext } from '../../../contexts/TasksContext'
import { useLocationContext } from '../../../contexts/LocationContext'
import { Page } from '../../../helpers/Page'
import { usePageContext } from '../../../contexts/PageContext'

export default function Tasks() {
    const [layersOpen, setLayersOpen] = React.useState(false)
    const [errorOpen, setErrorOpen] = React.useState(false)
    const pageContext = usePageContext()
    const auth = useAuthContext()
    const tasksContext = useTasksContext()
    const locationContext = useLocationContext()

    const handleCenterCamera = () => {
        locationContext.setState({
            ...locationContext.state,
            viewportLocation: locationContext.state.userLocation,
        })
    }

    const generateTasks = () => {
        fetch(
            `https://taskathon-go.herokuapp.com/api/game/generate?latitude=${locationContext.state.userLocation.latitude}&longitude=${locationContext.state.userLocation.longitude}`,
            {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + auth.state.token,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                tasksContext.setState({
                    ...tasksContext.state,
                    tasks: data,
                })
                pageContext.setState({
                    ...pageContext.state,
                    page: Page.events,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        if (tasksContext.state.events.length === 0) {
            generateTasks()
        } else {
            tasksContext.setState({
                ...tasksContext.state,
                selectedId: null,
            })
        }
    }, [])

    return (
        <div className="overflow-container">
            <CustomDialog
                type="mapLayers"
                open={layersOpen}
                setOpen={setLayersOpen}
                keyName={'mapOptions'}
            />
            {errorOpen && (
                <div className="alertContainer">
                    <Alert
                        className="overlayBottom fadeIn"
                        severity="error"
                        onClose={() => {
                            setErrorOpen(false)
                        }}
                    >
                        You must be at the location to complete a task!
                    </Alert>
                </div>
            )}
            {pageContext.state.mapOpen ? (
                <>
                    <Map />
                    <div
                        className="float"
                        style={{ right: '3%', bottom: '24%' }}
                    >
                        <FloatingActionButton
                            imgSrc="./icons/maparrow.svg"
                            onClick={() => {
                                handleCenterCamera()
                            }}
                        />
                    </div>
                    <div
                        className="float"
                        style={{ right: '3%', bottom: '33%' }}
                    >
                        <FloatingActionButton
                            imgSrc="./icons/layers.svg"
                            onClick={() => {
                                setLayersOpen(true)
                            }}
                        />
                    </div>
                    <div
                        className="float"
                        style={{ bottom: '13%', width: '83%' }}
                    >
                        {tasksContext.state.selectedId != null && (
                            <MapViewTask
                                task={
                                    tasksContext.state.events[
                                        tasksContext.state.events.findIndex(
                                            (task) =>
                                                task.id ===
                                                tasksContext.state.selectedId
                                        )
                                    ]
                                }
                            />
                        )}
                    </div>
                </>
            ) : (
                <div style={{ width: '100%', padding: '0 10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CustomButton
                            type="events"
                            variant="primary"
                            halfWidth={true}
                            onClick={generateTasks}
                        >
                            Refresh Events
                        </CustomButton>
                    </div>
                    <EventsList
                        events={tasksContext.state.events}
                        setErrorOpen={setErrorOpen}
                    />
                    <div
                        className="float"
                        style={{ right: '3%', bottom: '15%' }}
                    >
                        <FloatingActionButton
                            imgSrc="./icons/map.svg"
                            onClick={() => {
                                pageContext.setState({
                                    ...pageContext.state,
                                    mapOpen: true,
                                })
                                setErrorOpen(false)
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
