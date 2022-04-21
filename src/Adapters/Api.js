import axios from "axios";
import ConfigViewService from "../ViewService/ConfigViewService";
import { ServerHandlerError } from "./ServerError";


const { showLoading, hideLoading } = ConfigViewService();

const baseURL = "";

const mainServer = axios.create({

    baseURL: "https://shop.devsharp.ir/api/"
});

mainServer.defaults.headers.post = { "Content-Type": "multipart/form-data" };
mainServer.defaults.headers.put = { "Content-Type": "multipart/form-data" };

mainServer.interceptors.request.use((cnf)=>{   
    showLoading();
    return cnf;
});

mainServer.interceptors.response.use((cnf)=>{
    hideLoading();
    return cnf;
});

export const Get = async (action, data = null) => {

    let params = "";
    if (data) {
        params = "?";
        for (let key in data) {
            params += key + "=" + data[key] + "&";
        }
    }
    

    let response = await mainServer.get(baseURL + action.url + params).catch(err => {
        
        throw new ServerHandlerError(err);
    });

   

    if (response)
        return response.data

    return null;
}

export const Post = async (action, data) => {


    let formData = new FormData();

    for (let key in data) {
        formData.append(key, data[key]);
    }


    let response = await mainServer.post(baseURL + action.url, formData).catch(err => {
        throw new ServerHandlerError(err);
    });

    if (response)
        return response.data

    return null;
}

export const Put = async (action, data) => {


    let formData = new FormData();

    for (let key in data) {
        formData.append(key, data[key]);
    }


    let response = await mainServer.put(baseURL + action.url, formData).catch(err => {
        throw new ServerHandlerError(err);
    });

    if (response)
        return response.data

    return null;
}

export const Remove = async (action, ids) => {



    return await mainServer.delete(baseURL + action.url + "/" + Object.values(ids).join("/")).catch(err => {
        throw new ServerHandlerError(err);
    });
}


