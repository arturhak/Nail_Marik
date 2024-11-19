import React, {useEffect, useState} from "react";
import moment from "moment";

function Admin() {
    const [allData, setAllData] = useState([]);
    const [deletedData, setDeletedData] = useState();

    useEffect(() => {
        fetch('https://chicchoc.top/public/public/all/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setAllData(data)
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, [deletedData]);

    const handleCancelBook = (item: any) => {
        console.log("handleRemoveItem", item)

        fetch('https://chicchoc.top/public/public/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                master: item.master,
                name: item.name,
                date: item.date,
                timeState: item.time_start,
                totalTime: item.total_time
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data Deleted', data);
                setDeletedData(data)
                // Process data here
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    console.log("allData", allData)

    return (
        <div className="admin">
            <table id="customers">
                <thead>
                    <tr>
                        <th>Master</th>
                        <th>User</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {allData.map((user: any) => {
                    return (
                        <tbody key={user.id}>
                            <tr>
                                <td>{user.master}</td>
                                <td>{user.name}</td>
                                <td>{user.services}</td>
                                <td>{moment(user.date).format('MMMM Do YYYY')}</td>
                                <td>{user.booked_hours}</td>
                                <td>
                                    <button className="table-remove-btn" onClick={() => handleCancelBook(user)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>

        </div>
    )
}

export default Admin