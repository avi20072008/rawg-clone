import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {   
        key: 'ad2e990d735b4daf9f94d7336627a429'
    }
})

