import axios from 'axios';
const baseUrl = "https://gamelogicservice.azurewebsites.net/api";

const getUser = async (accessToken) => {
      var config = {
          method: 'get',
          url: `https://dev-he67eqpc846lev05.us.auth0.com/userinfo`,
          headers: {
            'authorization': `Bearer ${accessToken}`}
        };
    
      return await axios(config).then(function (response) {
        return response.data;
      })
      .catch(function (error) {
      });
};

const processUser = async (sub, username, emailAddress, token) => {
    var config = {
        method: 'post',
        url: baseUrl + '/GameAccount/ProcessUser',
        headers: {"Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` },
        data:  {  "userId": sub,
                  "username": username,
                  "emailAddress": emailAddress }
        };       
    return await axios(config).then(function (response) {
        return response.data;
     })
    .catch(function (error) {
    });   
 };   

 const deleteUser = async (username, emailAddress, token) => {
    var config = {
        method: 'post',
        url: baseUrl + '/GameAccount/DeleteUser',
        headers: {"Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` },
        data:  {  "username": username,
                  "emailAddress": emailAddress,
                  "token": token }
        };       
    return await axios(config).then(function (response) {
        return response.data;
     })
    .catch(function (error) {
    });   
 };      


export default {
    getUser,
    processUser,
    deleteUser
};   