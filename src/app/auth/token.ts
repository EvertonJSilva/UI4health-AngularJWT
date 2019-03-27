export class Token {
  authenticated: boolean;
  created: string;
  expiration: String;
  accessToken: string; 
  message: String

  constructor(
    authenticated: boolean,
    created: string,
    expiration: String,
    accessToken: string, 
    message: String
  ){
    this.authenticated=authenticated,
    this.created=created,
    this.expiration=expiration,
    this.accessToken=accessToken, 
    this.message =message
  }

  }
  