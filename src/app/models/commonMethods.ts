/**
 * Methods common for all models.
 */

class CommonMethods {

  modelCommon: any;

  constructor(modelCommon) {
    this.modelCommon = modelCommon;
  }


  static obj(mdlCommon: any): any {
    return new this(mdlCommon);
  }


  // add new doc (multiple (array of docs) can be added)
  add(doc: any): Promise<any> {
    return this.modelCommon.createAsync(doc);
  }


  // save() method or Bluebird's saveAsync()
  save(docObj: any): Promise<any> {
    const doc = new this.modelCommon(docObj);
    return doc.saveAsync();
  }


  // count and list docs for 'moQuery'
  list(moQuery: any, limit?: number, skip?: number, sort?: string, select?: string): Promise<any> {
    return this.modelCommon
      .countDocumentsAsync(moQuery)
      .then(resultsNum => {
        return this.modelCommon
          .find(moQuery)
          .limit(limit)
          .skip(skip)
          .sort(sort)
          .select(select)
          .execAsync()
          .then(resultsArr => {
            const results = {
              success: !!resultsNum,
              count: resultsNum,
              data: resultsArr
            };
            return results;
          });
      });
  }


  // delete one doc
  // First find doc, then delete doc. This is because doc.remove() activate post middleware. modelName.findOneAndRemoveAsync() doesn't activate middleware.
  deleteOne(moQuery: any): Promise<any> {
    // return this.modelCommon.findOneAndRemoveAsync(moQuery); // will not trigger post middleware
    return this.modelCommon.findOneAsync(moQuery)
      .then(doc => {
        if (!doc) { throw new Error('Doc does not exist for specified query!'); }
        return doc.removeAsync();
      });
  }

  // delete multiple docs
  delete(moQuery: any): Promise<any> {
    return this.modelCommon.deleteMany(moQuery);
  }


  // get doc
  getOne(moQuery: any, sort?: any): Promise<any> {
    return this.modelCommon
      .findOne(moQuery)
      .sort(sort)
      .execAsync();
  }


  // update a doc
  editOne(moQuery: any, docNew: any, updOpts?: any): Promise<any> {
    delete docNew.created_at;
    delete docNew.updated_at; // because we want to modify updated_at field
    delete docNew.__v;

    if (!updOpts) {
      // default options https://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate
      updOpts = {
        new: true, // return newly updated doc
        upsert: false, // whether to create the doc if it doesn't match (false)
        fields: false, // which fields to select. Equivalent to .select(fields).findOneAndUpdate()
        sort: false, // how to sort fields
        runValidators: true // validators validate the update operation against the model's schema
      };
    }

    return this.modelCommon.findOneAndUpdateAsync(moQuery, docNew, updOpts);
  }


  // update multiple websource documents
  editMultiple(moQuery: any, docNew: any, updOpts?: any): Promise<any>  {
    delete docNew.created_at;
    delete docNew.updated_at; // because we want to modify updated_at field
    delete docNew.__v;

    if (!updOpts) {
      // default options https://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate
      updOpts = {
        new: true, // return newly updated doc
        upsert: false, // whether to create the doc if it doesn't match (false)
        fields: false, // which fields to select. Equivalent to .select(fields).findOneAndUpdate()
        sort: false, // how to sort fields
        runValidators: true // validators validate the update operation against the model's schema
      };
    }

    return this.modelCommon.updateMany(moQuery, docNew, updOpts);
  }


}



export default CommonMethods;
