import axios from 'axios';

const refresh = axios.create({
    baseURL : process.env.REACT_APP_SERVER
})

refresh.interceptors.request.use(
    function (config) {
        const access_token = localStorage.getItem("access_token");
        if (!access_token) {
            config.headers["Authorization"] = null;
            return config
        }
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
        return config
    }
)

refresh.interceptors.response.use(
    function (response) {
        return response
    },
    async function (error) {
        if (error.response.data.error.errorCode == "EXPIRED_JWT_TOKEN") {
            try {
                const originalRequest = error.config;
                const data = await refresh.post(`${process.env.REACT_APP_SERVER}/members/reissue`, {
                    "accessToken": localStorage.getItem("access_token"),
                    "refreshToken": localStorage.getItem("refresh_token"),
                })
                if (data) {
                    localStorage.setItem("access_token", data.data.response.accessToken);
                    localStorage.setItem("refresh_token", data.data.response.refreshToken);
                    originalRequest.headers['Authorization'] = `Bearer ${data.data.response.accessToken}`;

                    return await refresh.request(originalRequest);
                }
            } catch (error) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                console.log(error);
            }
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
)

export default refresh;

