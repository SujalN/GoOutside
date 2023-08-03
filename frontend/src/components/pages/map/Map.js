import React from 'react'
import ReactMapGL, { Marker, FlyToInterpolator } from '!react-map-gl'
import { useAppContext } from '../../../contexts/AppContext'
import { useLocationContext } from '../../../contexts/LocationContext'
import { useTasksContext } from '../../../contexts/TasksContext'
import mapboxgl from 'mapbox-gl'

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default

export default function MapView({ noDrag }) {
    const context = useAppContext()
    const tasksContext = useTasksContext()
    const locationContext = useLocationContext()

    let mapStyle = 'mapbox://styles/mapbox/streets-v11'
    if (context.state.mapOptions.mapLayers.mapType === 'satelite') {
        mapStyle = 'mapbox://styles/mapbox/satellite-streets-v11'
    }

    const [viewport, setViewport] = React.useState({
        width: '100%',
        height: '100%',
        latitude:
            locationContext.state.viewportLocation.latitude ||
            locationContext.state.userLocation.latitude,
        longitude:
            locationContext.state.viewportLocation.longitude ||
            locationContext.state.userLocation.longitude,
        zoom: 15,
    })

    React.useEffect(() => {
        if (locationContext.state.viewportLocation.latitude !== null) {
            const newLoc = locationContext.state.viewportLocation
            setViewport({
                ...viewport,
                latitude: newLoc.latitude,
                longitude: newLoc.longitude,
                zoom: 15,
                transitionDuration: 500,
                transitionInterpolator: new FlyToInterpolator(),
            })
            locationContext.setState({
                ...locationContext.state,
                viewportLocation: { latitude: null, longitude: null },
            })
        }
    }, [locationContext.state.viewportLocation])

    return (
        <ReactMapGL
            {...viewport}
            onViewportChange={(newViewport) => {
                if (!noDrag) {
                    setViewport({
                        ...newViewport,
                        width: '100%',
                        height: '100%',
                    })
                }
            }}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
            mapStyle={mapStyle}
        >
            <Marker
                latitude={locationContext.state.userLocation.latitude}
                longitude={locationContext.state.userLocation.longitude}
            >
                <div className="">
                    <span>
                        <img
                            style={{
                                width: '25%',
                                height: '25%',
                            }}
                            src={`./icons/me.svg`}
                        />
                    </span>
                </div>
            </Marker>
            {tasksContext.state.events != null &&
                tasksContext.state.events.map((event, i) => {
                    return (
                        <Marker
                            key={event.id}
                            id={event.id}
                            latitude={event.latitude}
                            longitude={event.longitude}
                            onClick={() => {
                                tasksContext.setState({
                                    ...tasksContext.state,
                                    selectedId: event.id,
                                })
                            }}
                        >
                        </Marker>
                    )
                })}
        </ReactMapGL>
    )
}
