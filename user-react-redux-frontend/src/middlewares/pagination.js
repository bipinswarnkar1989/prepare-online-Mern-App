class Pagination {
  pagination  = (count,maxButtons,page,limit) => {
    var buttonsRangeArray = [];
    var start_loop = 1;
    var end_loop = 5;
    var currentPage = page;
    var totalNumberOfPagination = Math.ceil(count/limit);
    if(currentPage < maxButtons){
      if(totalNumberOfPagination < maxButtons){
        end_loop = parseInt(totalNumberOfPagination);
      }
    }
    else{
      start_loop = currentPage - 2;
      if (totalNumberOfPagination >= (currentPage + 2)) {
        end_loop = currentPage + 2;
      }
      else if(totalNumberOfPagination <= (currentPage + 2)){
        end_loop = totalNumberOfPagination;
      }
    }

   for (var i = start_loop; i <= end_loop; i++) {
     buttonsRangeArray.push(i)
   }
   const data = {
     currentPage:currentPage,
     buttonsRangeArray:buttonsRangeArray,
     totalNumberOfPagination:totalNumberOfPagination
   }
   return data;
 }
}

export default Pagination;
