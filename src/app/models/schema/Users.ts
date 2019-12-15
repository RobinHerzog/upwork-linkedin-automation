import * as mongoose from 'mongoose';
import opts from './_options';
import post_users from './_middlewares/post_users';

const Schema = mongoose.Schema;
opts.collection = 'users';


// schema definition
const Sch = new Schema({
  first_name: {type: String, required: 'First name is required.'},
  last_name: {type: String, required: 'Last name is required.'},
  address: String,
  city: String,
  country: String,

  phone: {type: String, required: 'Phone is required.'},
  email: {type: String, required: 'Email is required.'},
  is_email_verified: {type: Boolean, default: false},
  website: String,


  // for login use username:password or access_code
  username: String,
  password: String,

  role: {type: String, enum: ['admin', 'customer'], default: 'customer'},
  is_active: {type: Boolean, default: true}, // administrator can disable account by putting is_active:fale
  jwt_token: String
}, opts);


/* =-=-=-=-= INDEXES =-=-=-=-= */
Sch.index({access_code: 1}, {name: 'access_code', unique: true});
Sch.index({email: 1}, {name: 'email', unique: true});

/* =-=-=-=-= MIDDLEWARES =-=-=-=-= */
Sch.post('remove', post_users.afterUserDelete);

export default Sch;
