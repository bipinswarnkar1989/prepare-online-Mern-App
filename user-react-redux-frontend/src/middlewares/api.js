const qbApiUrl = '/api/qbank';

export default class Api{
  searchQbanks = (q) => {
    return fetch(`${qbApiUrl}/Qbanks/search/${q}`,{
       method:'get'
     }).then(response => response.json() );
 }

  esSearch = async (q) => {
    try {
      const resp = await fetch(`${qbApiUrl}/esSearch/${q}`,{
        method:'get',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      });
      const Json = await resp.json();
      if (Json) {
        console.log('ESRESULT: '+JSON.stringify(Json.hits));
        return Json;
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
 }
}
