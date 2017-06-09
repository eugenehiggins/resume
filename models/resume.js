/**
 * Created by ehigginsiii on 6/9/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  companyName: { type: String, required: true }
})

module.exports = mongoose.model('Resume',schema,'main');
