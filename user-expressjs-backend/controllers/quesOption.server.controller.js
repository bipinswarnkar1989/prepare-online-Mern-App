// .user-expressjs-backend/controllers/quesOption.server.controller.js
import Option from '../models/quesOption.server.model';
import Question from '../models/question.server.model';
import elasticsearch from 'elasticsearch';
import elasticClient from '../config/esSearchConfig';
const esClient = elasticClient;

export default class quesOptionCtrl {
   createOption(req,res){
       console.log('createOption: '+ JSON.stringify(req.body));
       if (req.body) {
           var  Options = req.body.options;
           Options.forEach(element => {
            element.question = req.ques._id;
            console.log('element: '+ JSON.stringify(element));
            return element;
           });
           console.log('Options: '+ JSON.stringify(Options))
            Option.insertMany(Options, (err,opts) => {
                if(err) {
                     return res.json({success:false,message:'Something going wrong',err});
                }
                else{
                  if (opts) {
                    console.log('OPTS: '+opts);
                    opts.forEach(el => {
                      req.ques.options.push(el._id);
                    })
                    req.ques.save(err => {
                      if(err){
                        return res.json({success:false,message:'Something going wrong',err});
                      }else{
                        return res.json({
                          success:true,
                          message:'Question & Options Added to Question Bank Successfully',
                          ques:req.ques,
                          opts:opts
                        });
                      }
                    });
                  }
                }
              });
       }
   }
}


