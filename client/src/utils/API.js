import axios from "axios";

export default {
  register: (user) => {
    return axios.post("/api/users/register", user);
  },
  login: (userEmail, userPassword) => {

    return axios.post("/api/users/login", { userEmail, userPassword })

  },

  findFood: (searchString, fk_user) => {
    return axios.post("/api/log/findFood", { searchString, fk_user })
  },

  logFood: (data) => {
    return axios.post("/api/log/food", { data })
  },

  selectPortions: (fk) => {
    return axios.get(`/api/log/findPortion/${fk}`)
  },

  saveSetup: (data) => {
    return axios.post("/api/users/setup", data)
  },

  saveNutritionPlan: (data) => {
    return axios.post("/api/users/nutritionPlan", data)
  },

  updatePersonalInfo: (data) => {
    return axios.put("/api/users/updatePersonalInfo", data)
  },

  dailySum: (id, date) => {
    return axios.get(`/api/user-logs/dailySum/${id}/${date}`)
  },

  averageMacros:(id, dateFrom, dateTill) =>{
    return axios.get(`/api/user-logs/averageMacros/${id}/${dateFrom}/${dateTill}`)
  },

  userNutrientsTimeline:(id, dateFrom, dateTill) =>{
    return axios.get(`/api/user-logs/userNutrientsTimeline/${id}/${dateFrom}/${dateTill}`)
  },

  userFoodLogs:(id, dateFrom, dateTill, limit, offset) =>{
    return axios.get(`/api/user-logs/userFoodLogs/${id}/${dateFrom}/${dateTill}/${limit}/${offset}`)
  },

  deleteUserLogs:(data)=>{
    return axios.delete(`/api/user-logs/deleteUserLogs`, { data })
  },

  getUserMeasurements:(userID)=>{
    return axios.get(`/api/users/getMeasurements/${userID}`)
  },
  
  getUserInfo: (userID) => {
    return axios.get(`/api/users/measurments/${userID}`)
  },
  
  getUserNutritionPlan: (userID)=>{
    return axios.get(`/api/users/getUserNutritionPlan/${userID}`)
  },

  getUserPersonalInfo: (userID)=>{
    return axios.get(`/api/users/getPersonalInfo/${userID}`)
  },

  deleteNutritionPlan: (planID, userID)=>{
    return axios.delete(`/api/users/nutritionPlan/${planID}/${userID}`)
  }



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