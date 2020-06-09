import React from 'react';
import Machine from './Machine.interface';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './MachineList.scss';

export default function MachineList(props: {machines: Machine[]}) {
    const colNames = [
        'Altitude', 'Lat, Lng', 'Def rem.', 'Eng. status', 'Fuel rem.', 'Last activity', 
        'Category', 'Make', 'Man. year', 'Model', 'Tank cap.', 'Type', 'Serial No'
    ];   
  
    return (
        <TableContainer component={Paper} className="machine-list">
            <Table aria-label="Machine list" size="small">
                <TableHead className="table-head">                
                    <TableRow>
                        {colNames.map((name, index) => (                    
                            <TableCell key={index}>{name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>                    
                    {props.machines.map(m => (
                        <TableRow key={m.id} className={m.metrics.in_bounds ? "" : "out-of-bounds"}>
                            <TableCell>{m.location.altitude.toFixed(1)}</TableCell>
                            <TableCell>{m.location.latitude.toFixed(7)}, {m.location.longitude.toFixed(7)}</TableCell>
                            <TableCell>{m.metrics.def_remaining}</TableCell>
                            <TableCell>{m.metrics.engine_status}</TableCell>
                            <TableCell>{m.metrics.fuel_remaining}</TableCell>
                            <TableCell>{new Date(m.metrics.last_activity).toDateString()}</TableCell>
                            <TableCell>{m.model.category}</TableCell>
                            <TableCell>{m.model.make}</TableCell>
                            <TableCell>{m.model.manufacture_year}</TableCell>
                            <TableCell>{m.model.model}</TableCell>
                            <TableCell>{m.model.tank_capacity}</TableCell>
                            <TableCell>{m.model.type}</TableCell>
                            <TableCell>{m.serial_number}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}