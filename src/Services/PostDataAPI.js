
import { GetUserInfo } from "./GetUserInfo";
import axios from 'axios';

export function PostDataAPI(methodName, apiData, userInfo, type){

    //let baseUrl = configData.default.ApiUrl;
    let baseUrl = sessionStorage.getItem('server_api_url');
    let token = sessionStorage.getItem('auth_token');
   
    
    if (userInfo == true) {
      
        let user_info = JSON.parse(GetUserInfo());
        
        if (type == "formData")
            apiData.append("encUserID", user_info.user.userID); // apiData.append("userInfo", JSON.stringify( user_info.user))
        else
            apiData.encUserID = user_info.user.userID;
    }

    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + token
    }

    return new Promise((resolve, reject) => {
        axios.post(baseUrl + methodName, apiData, {
            headers: headers
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}