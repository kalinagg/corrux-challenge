export default interface Machine {
    canedge_id?: string;        
    id: number;
    location: Location;
    metrics: Metrics;
    model: Model;
    serial_number: string;
}

interface Location {
    altitude: number;
    latitude: number;
    longitude: number;
}

interface Metrics {   
    def_remaining: number;
    engine_status: number;
    fuel_remaining: number;
    last_activity: string;
    in_bounds: boolean;
}

interface Model {
    category: string;
    make: string;
    manufacture_year: number;
    model: string;
    tank_capacity: number;
    type: string;
}