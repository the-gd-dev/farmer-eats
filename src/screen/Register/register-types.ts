export type RegisterationData = {
  full_name?: string;
  // example?: john doe
  email?: string;
  // example?: johndoe@mail.com
  phone?: string;
  // example?: +19876543210
  password?: string;
  // example?: 12345678
  role?: string;
  // example?: farmer
  business_name?: string;
  // example?: Dairy Farm
  informal_name?: string;
  // example?: London Dairy
  address?: string;
  // example?: 3663 Marshville Road
  city?: string;
  // example?: Poughkeepsie
  state?: string;
  // example?: New York
  zip_code?: number | string;
  // example?: 12601
  registration_proof?: string;
  // example?: my_proof.pdf
  business_hours?: {
    sun?: string[];
    mon?: string[];
    tue?: string[];
    wed?: string[];
    thu?: string[];
    fri?: string[];
    sat?: string[];
  };
  device_token?: string;
  // example?: 0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx
  type?: string;
  // example?: email/facebook/google/apple
  social_id?: string;
  // example?: 0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx
};
