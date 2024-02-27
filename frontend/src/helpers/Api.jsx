// make for api axios
import axios from 'axios';

// post api axios using header
const ApiPost = (url, data, header = null) => {
    axios.post(process.env.REACT_APP_API_URL + url, data, header)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
}

export {
    ApiPost
}