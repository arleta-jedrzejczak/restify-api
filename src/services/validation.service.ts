export class ValidationService {

  public validateCity(city: string): string | false {
    if(city !== 'London' && city !== 'New York') {
      return false;
    } else {
      return city;
    }
  }

  public validateEmail(email: string): string | false {
    const patterns = {
      email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }
    if(patterns.email.test(email)){
      return email;
    } else {
      return false;
    }
  }
  
}

export const validationService = new ValidationService();