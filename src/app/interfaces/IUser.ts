interface IUser {
  _id?: string;

  first_name?: string;
  last_name?: string;
  address?: string;
  city?: string;
  country?: string;

  phone?: string;
  email: string;
  is_email_verified: boolean;
  website?: string;


  // for login use username:password or access_code
  username?: string;
  password?: string;

  role: 'admin' | 'customer';
  is_active: boolean;
  jwt_token: string;
}

export { IUser };
