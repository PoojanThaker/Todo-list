class Task{
	constructor(name, description, estimatedDuration, activeBy, occurrence, dueDate, priority, id){
    	this.name=name;
      	this.description=description;
        this.estimatedDuration=estimatedDuration;
        this.activeBy=activeBy;
        this.occurrence=occurrence;
        this.dueDate=dueDate;
        this.priority=priority;
        this.id=id;
    }
}

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var moment = require('moment');
const { redirect } = require("express/lib/response");

// var tasksvar = [{'name':'Buy shit','description':"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting."},{'name':'Name1','description':'description2'}];
var tasksvar = [];
let task1 = new Task('Buy shit', "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.", 10, "27-02-2022", 5, "10-03-2022", 100, 1);
tasksvar.push(task1);
let task2= new Task('Name1', "decription", 10, "27-02-2022", 5, "10-03-2022", 210, 2);
tasksvar.push(task2);

var completedTasks = [];

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'))

function compare_priority(a, b){
    if(a.priority < b.priority){
            return 1;
    }else if(a.priority > b.priority){
            return -1;
    }else{
            return 0;
    }
}

app.get("/",function(req,res){
    tasksvar.sort(compare_priority);
    res.render('index',{data:{moment:moment, title: "All Tasks", tasks:tasksvar,}});
})

app.get("/completedTasks",function(req,res){
    completedTasks.sort(compare_priority);
    res.render('index',{data:{moment:moment, title: "Completed Tasks", tasks:completedTasks,}});
})

app.get("/highPriority",function(req,res){
    var highPriority = [];
    for(var i=0; i<tasksvar.length; i++) {
        if(tasksvar[i].priority >= 200) {
            highPriority.push(tasksvar[i]);
        }
    }
    highPriority.sort(compare_priority);
    res.render('index',{data:{moment:moment, title: "High Priority", tasks:highPriority,}});
})

app.post("/", function(req,res){
    var index=req.body.id;
    for(var i=0;i<tasksvar.length;i++)
    {
        if(tasksvar[i].id == index) {
            completedTasks.push(tasksvar[i]);
            tasksvar.splice(i,1);
        }
    }
    console.log(tasksvar);
    console.log(completedTasks);
    res.redirect('/');
})

app.listen(3000);

