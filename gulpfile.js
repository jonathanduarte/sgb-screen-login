'use strict';

var megazord = require ('megazord-sdk');
var gulp = require ('gulp'); 
megazord.registerScreenTasks();
gulp.tasks = megazord.gulp.tasks;  