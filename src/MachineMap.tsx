import React, {useState} from 'react';
import {GoogleApiWrapper, Map, Marker, Polygon, InfoWindow} from 'google-maps-react';
import Machine from './Machine.interface';
import redDot from './images/red-dot.png';
import greenDot from './images/green-dot.png';

function MachineMap(props: {machines: Machine[], google: any}) {
    const [infoWindow, setInfoWindow] = useState({id: -1});

    const rect = {
        topLeft: {lat: 48.144111, lng: 11.519889}, // Top-left: 48°08'38.8"N 11°31'11.6"E
        topRight: {lat: 48.144111, lng: 11.527278}, // Top-right: 48°08'38.8"N 11°31'38.2"E
        bottomLeft: {lat: 48.141361, lng: 11.519889}, // Bottom-left: 48°08'28.9"N 11°31'11.6"E
        bottomRight: {lat: 48.141361, lng: 11.527278} // Bottom-right: 48°08'28.9"N 11°31'38.2"E
    };

    const rectCenter = {
        lat: rect.topLeft.lat + (rect.bottomLeft.lat - rect.topLeft.lat) / 2,
        lng: rect.bottomLeft.lng + (rect.bottomRight.lng - rect.bottomLeft.lng) / 2
    };

    return (  
        <div className="map">
            <Map
                google={props.google}
                zoom={16}
                initialCenter={rectCenter}>
                <Polygon
                    paths={[rect.topLeft, rect.topRight, rect.bottomRight, rect.bottomLeft]}
                    strokeColor='#fc6355'
                    strokeOpacity={1}
                    strokeWeight={2}
                    fillColor='#fff'
                    fillOpacity={.1} />
                {props.machines.map((m: Machine) => (
                    <Marker
                        icon={m.metrics.in_bounds ? greenDot : redDot}
                        key={m.id}
                        position={{lat: m.location.latitude, lng: m.location.longitude}}
                        title={'Machine ' + m.serial_number}
                        onClick={() => setInfoWindow({id: m.id})}>                    
                    </Marker>                   
                ))}
                {props.machines.map((m: Machine) => (
                    <InfoWindow
                        key={m.id}
                        google={props.google}
                        map={props.google.map}
                        marker={props.google.marker}
                        visible={m.id === infoWindow.id}
                        pixelOffset={new google.maps.Size(0,-35)}
                        position={{lat: m.location.latitude, lng: m.location.longitude}}>
                        <div>
                            <strong>Make:</strong> {m.model.make}<br />
                            <strong>Serial No:</strong> {m.serial_number}<br />
                            <strong>Location:</strong> {m.location.latitude.toFixed(7)},{m.location.longitude.toFixed
                            (7)}<br />
                            <strong>Fuel remaining:</strong> {m.metrics.fuel_remaining}<br />
                            <strong>Last activity:</strong> {new Date(m.metrics.last_activity).toDateString()}<br />
                            <strong>Tank capacity:</strong> {m.model.tank_capacity}<br />
                            <strong>Type:</strong> {m.model.type}<br />
                        </div>                  
                    </InfoWindow>                   
                ))}                        
            </Map>
        </div>      
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC1QEJB_1iq8-N9zhpOCHk6m_VEFA1XdmM'
  })(MachineMap);