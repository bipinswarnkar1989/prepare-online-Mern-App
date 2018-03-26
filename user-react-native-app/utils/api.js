export default class Api {
    fetchData(method,url,data,headers){
        return fetch(url,{
            method:method,
            body:data,
            headers:headers
        });
    }
}