// .user-expressjs-backend/controllers/quesOption.server.controller.js
import Option from '../models/quesOption.server.model';
import Question from '../models/question.server.model';
import elasticsearch from 'elasticsearch';
import elasticClient from '../config/esSearchConfig';
const esClient = elasticClient;

export default class quesOptionCtrl {
   createOption(req,res){
       console.log('createOption: '+req.body);
       if (req.body) {
           let Options = req.body.Options;
            newOption.insertMany(Options, (err,opts) => {
                if(err) {
                     return res.json({success:false,message:'Something going wrong',err});
                }
                else{
                  return res.json({
                    success:true,
                    message:'Option Added Successfully',
                    opts
                  });
                }
              });
       }
   }
}


