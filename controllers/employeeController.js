const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

//storing employee schema from mongoose
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});

router.post('/',(req,res)=>{
    //console.log(req.body);
    if(req.body._id == '')
        insertRecord(req,res); 
    else    
        updateRecord(req,res);
});

//For inserting data
function insertRecord(req,res){
    var employee = new Employee(); //creating object of employee schema
    
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err,doc)=>{
        if(!err)
            res.redirect('employee/list'); 
        else{
            //checking whether error is due to the validation or not
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log("Error occured during Insertion :"+err);
        }
    });
}

function updateRecord(req,res){
    Employee.findOneAndUpdate({ _id: req.body._id},req.body,{new: true},(err,doc)=>{
        if(!err){res.redirect('employee/list');}
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit",{
                    viewTitle: 'Update Employee',
                    employee: req.body
                })
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list',(req,res)=>{
    //res.json('from list');
    
    //retrieve data from database. For that we call the find() function from the schema
    Employee.find((err,docs)=>{
         if(!err){
            res.render("employee/list",{
                list:docs
            });
        }
        else{
            console.log('Error in retrieving employee list :'+err);
        }
    });
});

function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message; 
                break;
            case 'email':
                body['emailError'] = err.errors[field].message; 
                break;
            default:
                break;
        } 
    }
}

router.get('/:id',(req,res)=>{
    //retriew a specific from mongodb collection 
    Employee.findById(req.params.id,(err,doc)=>{
        if(!err){
           res.render('employee/addOrEdit',{
               viewTitle : 'Update Employee',
               employee  : doc
           }); 
        }
    });
});

router.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/employee/list');
        }
        else{
            console.log('Error in employee delete :'+err);
        }
    })
});
module.exports = router;