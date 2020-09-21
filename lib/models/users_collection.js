'use strict';

const schema = require('./users-schema.js');

class User {

  constructor(schema) {
    this.schema = schema;
  }
  /**
         * 
         * @param {record to add} record 
         */
  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
  /**
         * 
         * @param {id} _id 
         */
  get(_id) {
    let obj = _id ? { _id } : {};
    return this.schema.find(obj);
  }
  /**
         * 
         * @param {id} _id 
         * @param {record to edit} record 
         */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record);
  }
  /**
         * 
         * @param {id} _id 
         */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = User;