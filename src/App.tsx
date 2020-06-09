import React, {useState, useEffect} from 'react';
import Machine from './Machine.interface';
import MachineMap from './MachineMap';
import MachineList from './MachineList';
import SimpleSnackbar from './SimpleSnackbar';
import './App.scss';

export default function App() {
    const [machines, setMachines] = useState<Machine[]>([]);
    const [openErrorSnackbar, setSnackbarOpen] = useState(false);

    useEffect(() => {
        async function getMachines(): Promise<void> {
            try {
                const response = await fetch('http://localhost:8081/machines');                

                if(!response.ok) {
                    throw new Error(response.statusText);
                }

                setMachines(await response.json());
            } catch(error) {
                setSnackbarOpen(true);
                console.log(error);
            }
        }

        getMachines();
        let id = setInterval(getMachines, 10000);

        return () => clearInterval(id);   
    }, []);

    return (
        <div className="container">   
            <MachineMap machines={machines} />
            <MachineList machines={machines} />
            <SimpleSnackbar
                open={openErrorSnackbar}
                handleClose={() => setSnackbarOpen(false)} />
        </div>
    )
}