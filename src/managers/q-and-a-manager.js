import axios from 'axios';
const baseUrl = "https://gamelogicservice.azurewebsites.net/api";

 const getQuizGameCategories = async (token) => {
    var config = {
        method: 'get',
        url: baseUrl + '/GameOptions/GetQuizGameCategories',
        headers: {"Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` }
      };
  
    return await axios(config).then(function (response) {
      return response.data;
    })
    .catch(function (error) {
    });
  };

const getGameOptionsByAccountEmailAddress = async (accountEmailAddress, token) => {
    var config = {
      method: 'get',
      url: baseUrl + '/GameOptions/GetGameOptionsByAccountEmailAddress?accountEmailAddress='+ accountEmailAddress,
      headers: {"Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` }
    };
    
    return await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
    });
  };

const getQuizQuestions = async (data, token) => {
  // const token = await userManager.GetLogedUsersToken();
  var config = {
    method: 'post',
    url: baseUrl + '/GameOptions/GetQuizGameQuestions',
    headers: {"Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` },
    data : data
  };
  
  return await axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
  });
  };

const submitQuizQuestions = async (data, token) => {
  var config = {
    method: 'post',
    url: baseUrl + '/PlayedQuiz/GetFilledQuiz',
    headers: {"Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` },
    data : data
  };

  return axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    
  });
};


export default {
    getQuizGameCategories,
    getGameOptionsByAccountEmailAddress,
    getQuizQuestions,
    submitQuizQuestions
};
