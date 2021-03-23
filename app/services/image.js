'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const __rootDir = require('../utils/rootDir')
const logln = require('../utils/logln');



exports.processAvatar =  ( userId, file ) => {

  const tempPath = file.path;
  const targetPath = __rootDir +'/storage/app/private/avatars/'+userId+'_avatar.jpeg';
  
  // Only allow png|jpeg|jpg
  if (path.extname(file.originalname).toLowerCase().match(/.(jpg|jpeg|png)/)) {
    
    try {
      sharp(tempPath)
      .resize(300, 300, {
        fit: sharp.fit.cover,
        withoutEnlargement: true,
        position: 'center',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .jpeg({
        quality: 70,
        chromaSubsampling: '4:4:4'
      })
      .toFile(targetPath);
      
    } catch (error) {
      
      logln(error, 'error_shark');
      if (error) return null;
    }

    const avatarUrl =  '/avatars/' + userId + '_' + Math.floor((Math.random()*10000)+1);

    return avatarUrl;

  } else {

    fs.unlink(tempPath, error => {

      logln(error, 'error_file_type');
      if (error) return null;
    });
  }
}
