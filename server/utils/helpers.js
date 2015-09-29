module.exports = {
  
  handleError: function(err, res, code) {
    code = code || 500;
    console.log(err);
    res.send(code, err.message);
  }

}