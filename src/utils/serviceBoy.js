/**
 *
 *  Service boy fetches what you need 
 *  
 *  
 **/

import axios from "axios"
import { getToken } from "./authBoy"
import configURL from "./configURL"


const getHeaders = (hasHeaders) => (hasHeaders ? {headers:{'Authorization':getToken()}} : {headers:{}})

export const serviceBoy = {
    get:(path,hasHeader = true)=> (axios.get(configURL(path), getHeaders(hasHeader))),
    post:(path,data,hasHeaders = true) => (axios.post(configURL(path),data,getHeaders(hasHeaders))),
    put:(path,data,hasHeaders = true) => (axios.put(configURL(path),data,getHeaders(hasHeaders))),
    delete:(path,data,hasHeaders = true) => (axios.delete(configURL(path), {...getHeaders(hasHeaders), data} ))
}
