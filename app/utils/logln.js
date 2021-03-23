'use strict';

const logln = (  data='nothing', dataName='' ) => {

  dataName = dataName.toUpperCase();
  
  console.log('\n\n:____________LOG_'+dataName+'___________:\n\n\n', data, '\n\n\n:_END_LOG_'+dataName+'_:\n\n');
}

module.exports = logln;
