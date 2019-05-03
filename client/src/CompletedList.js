import React from 'react';
import Job from './Job';

class CompletedList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.completed);
        return (

            <table>
                <tbody>
                    <tr>
                        <th>Delivery Address</th>
                        <th>Driving Distance</th>
                        <th>Job ID</th>
                    </tr>
                    {
                        this.props.completed 
                        ? this.props.completed.map(j => <Job data={j} />)
                        : null
                    }
                </tbody>



            </table>

        )


    }


}




export default CompletedList;