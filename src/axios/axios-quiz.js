import axios from 'axios';

export default axios.create(
    {
        baseURL: 'https://udemy-redux-pg-default-rtdb.europe-west1.firebasedatabase.app/'
    }
)