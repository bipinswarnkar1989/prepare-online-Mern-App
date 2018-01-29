const qbApiUrl = '/api/qbank';

export const searchQbanks = (q) => {
   return fetch(`${qbApiUrl}/Qbanks/search/${q}`,{
      method:'get'
    }).then(response => response.json() );
}
