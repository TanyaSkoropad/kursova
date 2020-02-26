export class User {

  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;



  constructor(firstName: string,
    lastName: string, 
     email: string,
     phone: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }
}
