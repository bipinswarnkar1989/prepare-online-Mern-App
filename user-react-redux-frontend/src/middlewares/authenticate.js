const apiUrl = "http://localhost:3001/api/";

const Authenticate = () => {
      const token = localStorage.getItem('userToken');
      if(token){
        return fetch(`${apiUrl}user/getUser`,{
          method:'get',
          headers: { 'authorization':token }
        }).then(response => {
          if(response.ok){
            response.json().then(data => {
              console.log(data);
              if(data.success){
                return true;
              }
              else if(!data.success && data.message){
                return false;
              }
              else{
                return false;
              }
            })
          }
          else{
            return false;
          }
        })
  
      }
      else{
        // else part if there is no token on localStorage
        return false;
      }
    }

  export default Authenticate;
  