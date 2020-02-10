/*
* libarary fir storing and editing data
*
*/

//Dependencies
var fs = require('fs');
var path = require('path');

//container for the module
var lib = {};

//Base Direcotry for data folder
lib.baseDir = path.join(__dirname,'/../.data/');

//write data to file
lib.create = function(dir,file,data,callback){
  //Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDiscriptor){
    if(!err && fileDiscriptor){
      //convert data to stringif
      var stringData = JSON.stringify(data);

      //write to file and close setInterval(function () {
      fs.writeFile(fileDiscriptor,stringData,function(err){
        if(!err){
          //closing the file
          fs.close(fileDiscriptor,function(err){
            if(!err){
              callback(false);
            }else{
              callback("error closing new file");
            }
          });
        }else{
          callback('error writing to new file');
        }
      });
    }else{
      callback('Could not create one may be already exist')
    }
  });
}

//read data from a file
lib.read = function(dir,file,callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf-8',function(err,data){
    callback(err,data);
  });
}

//update the data
lib.update = function(dir,file,data,callback){
  //open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDiscriptor){
    if(!err && fileDiscriptor){
      //convert data to string
      var stringData = JSON.stringify(data);

      //truncate the data
      fs.ftruncate(fileDiscriptor,function(err){
        if(!err){
          //write data to file and close it
          fs.writeFile(fileDiscriptor,stringData,function(err){
            if(!err){
              //close the file
              fs.close(fileDiscriptor,function(err){
                if(!err){
                  callback(false);
                }else{
                  callBack('error closing existing file');
                }
              });
            }else{
              callback('error wrintg file');
            }
          });
        }else{
          callback('error truncating file');
        }
      });

    }else{
      callback("could not open for update may not eixst");
    }
  });
}

//Dating a file
lib.delete = function(dir,file,callback){
  //unlink the file
  fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
    if(!err){
      callback(false);
    }else{
      callback('there was an error deleting the file file my not exist');
    }
  })
}

//Export the module
module.exports = lib;
