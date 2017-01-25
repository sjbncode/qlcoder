const fs = require('fs');
const path = require('path');

// function loadQuestions(filter){
// 	var questions=[];
// 	var dir='questions'
// 	var files=fs.readdirSync(dir);
// 	files.filter((f)=>{
// 		return f.endsWith('.js')&&f!='index.js';
// 	}).forEach((f)=>{
// 		var c=dir+'/'+f;
// 		var q=require(c);
// 		questions.push(q);
// 	});
// }
require('./questions/7566').answer();