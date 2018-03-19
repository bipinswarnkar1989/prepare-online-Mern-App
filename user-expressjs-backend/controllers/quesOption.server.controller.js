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
            return element;
           });
            Option.insertMany(Options, (err,opts) => {
                if(err) {
                     return res.json({success:false,message:'Something going wrong',err});
                }
                else{
                  if (opts) {
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

   updateOption(req,res,next){
     console.log('upadateOption: '+ req.body.options);
     let optionsArray = req.body.options;
     let optionIds = optionsArray.map(item => item._id);
     let optionValues = optionsArray.map(item => item.value);
     console.log('optionIds: '+ JSON.stringify(optionIds))
     if (optionsArray) {
       optionsArray.forEach(element => {
         
       });
       Option.update(
         {
           _id:{ $in:optionIds }
         }, {
           $set: { value:optionValues }
         }, {
           multi:true
         }
       ).exec((err,opts) => {
        if(err) {
             return res.json({success:false,message:'Something going wrong',err});
        }
        else{
           if (opts) {
             console.log('RESULT: '+ JSON.stringify(opts))
             next();
           }
        }
      });
     }
   }

   deleteOptions(req,res,next){
     console.log('deleteOptions: '+req.ques.options);
     let options = req.ques.options;
     if (options) {
       Option.find(
         {
           _id: { $in:options }
         }
       ).remove().exec((err,result) => {
        if(err) {
          console.log(err);
          return res.json({success:false,message:'Something going wrong',err});
         }else{
           console.log(result);
           return res.json({
            success:true,
            message:'Question Delete Successfully',
            ques:req.ques
          });
         }
       })
     }
   }
}


