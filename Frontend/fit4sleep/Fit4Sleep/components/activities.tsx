import { useEffect, useState } from 'react';
import axios from 'axios';

const Activities = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:5000/activities');
                setActivities(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchActivities();
    }, []);

    return (
        <div>
            <h1>Activities</h1>
        <ul>
        {activities.map(activity => (
                <li key={activity.id}>{activity.name}</li>
            ))}
        </ul>
        </div>
    );
};

export default Activities;
