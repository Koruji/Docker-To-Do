const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const task = new mongoose.Schema({
    description : { type: String, required: true },
    status : {type : Boolean, default: false},
});

// Adding auto-incrementing ID field
task.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Task', task);
