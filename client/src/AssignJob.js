import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class AssignJob extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            selectedDriverID: null,
            submitted: false
        }
    }

    render() {
        console.log(this.props.drivers)
        return (
            <div>
                <h3>Select driver to assign Job #{this.props.match.params.id}</h3>
                
                <form
                    action={`/jobs/unassigned/${this.props.match.params.id}`}
                    method="POST"
                    id="assignform"
                    onSubmit={(e) => {
                        e.preventDefault();
                        this._submitForm(this.state.selectedDriver, this.props.match.params.id);
                    }}
                >
                    <select 
                        name="driverlist" 
                        form="assignform"
                        onChange={(e) => this.setState({selectedDriver: e.target.value})}
                    >
                        <option disabled selected>Select a driver</option>
                        {
                            this.props.drivers.filter(driver => !driver.assigned_job).map(driver => <option value={driver.id}>{driver.last_name}</option>)
                        }
                    </select>

                    <button type="submit">Submit</button>
                </form>

                {
                    this.state.submitted ? <Redirect to="/jobs/unassigned" /> : null
                }
            </div>
        )
    }

    _submitForm = async (driverID, jobID) => {
        // send post request to backend, which will update the the driver's assigned_job value
        const response = await axios.post(`http://localhost:5000/jobs/assign/${driverID}/${jobID}`);
        this.props.updateDriverList();
        this.setState({
            submitted: true
        }, this.props.getJobs);
        


    }





}


export default AssignJob;