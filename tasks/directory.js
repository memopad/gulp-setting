module.exports = function() {
  var getCurrentDirectory = function() {
    var currentDirectory;
    if (process.env.NODE_ENV === undefined) {
      currentDirectory = process.cwd().slice(-1) === '/' ? process.cwd() : process.cwd() + '/';
    } else {
      var arg = process.env.NODE_ENV;
      currentDirectory = arg.slice(-1) === '/' ? arg : arg + '/';
    }
    return currentDirectory.replace("tasks/", '');
  };
  //get current dirctory's directory list
  var getDirectoryList = function(dir) {
    dir = dir === undefined ? process.cwd() + '/' : dir;
    var fs = require('fs');
    try {
      var directory = fs.readdirSync(dir).filter(function(file, index) {
        if (fs.statSync(dir + file).isDirectory()) {
          return file;
        }
      });
      return directory;
    } catch (err) {
      return false;
    }
  };

  //get the sprite Directory

  var getSpriteDirectoryName = function(directory) {
    if (!Array.isArray(directory)) {
      return false;
    }
    directory = directory.filter(function(value, index) {
      if (value.indexOf('sprite') > -1 || value.indexOf('sprites') > -1) {
        return value;
      }
    });
    if (directory.length === 0) {
      // console.log("Honey~you should have a sprite||sprites directory.");
      return false;
    }

    if (directory.length > 1) {
      // console.log("Honey~which images directory?");
      return false;
    }
    if (directory.length === 1) {
      return directory[0];
    }
  };


  //find the sass directory
  var getSassDirectoryName = function(directory) {
    if (!Array.isArray(directory)) {
      return false;
    }
    directory = directory.filter(function(value, index) {
      if (value.indexOf('sass') > -1 || value.indexOf('scss') > -1) {
        return value;
      }
    });
    if (directory.length === 0) {
      // console.log("Honey~you should have a sass||scss directory.");
      return false;
    }

    if (directory.length > 1) {
      // console.log("Honey~which sass|| scss directory?");
      return false;
    }
    if (directory.length === 1) {
      return directory[0];
    }
  };

  //find the images  or image or img dirctory;
  var getImageDirectoryName = function(directory) {

    if (!Array.isArray(directory)) {
      return false;
    }
    directory = directory.filter(function(value, index) {
      if (value.indexOf('img') > -1 || value.indexOf('imgs') > -1 || value.indexOf('images') > -1 || value.indexOf('image') > -1) {
        return value;
      }
    });
    if (directory.length === 0) {
      // console.log("Honey~you should have a img||imgs||images||image directory.");
      return false;
    }

    if (directory.length > 1) {
      // console.log("Honey~which images directory?");
      return false;
    }
    if (directory.length === 1) {
      return directory[0];
    }
  };
  var directoryList = getDirectoryList(getCurrentDirectory()),
    currentDirectory = getCurrentDirectory(),
    spriteName = getSpriteDirectoryName(directoryList),
    sassDirectory = getSassDirectoryName(directoryList),
    imgName = getImageDirectoryName(directoryList);

  return {
    currentDirectory: currentDirectory,
    spriteName: spriteName,
    imgName: imgName,
    release: currentDirectory + 'release/',
    spriteDirectory: currentDirectory + spriteName + '/',
    imgDirectory: currentDirectory + imgName + '/',
    getDirectoryList: getDirectoryList,
    sassDirectory: sassDirectory
  };
}();
