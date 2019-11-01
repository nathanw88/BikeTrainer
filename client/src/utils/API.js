import axios from "axios";


export default {
  register: (user) => {
    return axios.post("/api/users/register", user);
  },
  login: (userEmail, userPassword) => {

    return axios.post("/api/users/login", { userEmail, userPassword })

  },
  logBike: (keys, values) =>{
    return axios.post("api/log/bike",{keys, values})
  },
  logRun: (keys, values) =>{
    return axios.post("/api/log/run",{keys, values})
  },
  logSleep: (keys, values) =>{
    return axios.post("/api/log/sleep",{keys, values})
  },
  logFood: (array, foodName) =>{
    
    return axios.post("/api/log/food", {array, foodName})
  },

  selectLogs: (id, table) =>{
    return axios.get(`/api/users/logs/${id}/${table}`)
  }

};