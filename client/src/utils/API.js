import axios from "axios";


export default {
  register: (user) => {
    return axios.post("/api/users/register", user);
  },
  login: (userEmail, userPassword) => {

    return axios.post("/api/users/login", { userEmail, userPassword })

  },

  findFood: (searchString, fk_user) =>{

    return axios.post("/api/log/findFood", {searchString, fk_user})
  },

  logFood: (data) =>{
    
    return axios.post("/api/log/food", {data})
  },
  selectPortions: (fk) =>{

    return axios.get(`/api/log/findPortion/${fk}`)
  },
  // selectLogs: (id, table) =>{
  //   return axios.get(`/api/user-logs/logs/${id}/${table}`)
  // },

  // selectSums: (table, id, date1, date2) =>{
  //   console.log(date1)
  //   return axios.get(`/api/user-logs/logs/sums/${id}/${table}/${date1}/${date2}`)
  // },

  // selectAverage: (table, id, date1, date2) =>{
  //   console.log(date1)
  //   return axios.get(`/api/user-logs/logs/average/${id}/${table}/${date1}/${date2}`)
  // }

};