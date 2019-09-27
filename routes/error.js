#!/usr/bin/env node

"use strict";
module.exports= function(err, req, res, next) {
  var code = err.status || 500;
  var response = { error: err.message || err, stack: err.stack?err.stack.split('\n') : '' };

  if (err.data) {
    response.data = err.data;
  }
  if(err.url){
    response.url = err.url;
  }
  res.status(code).json(response);
};
