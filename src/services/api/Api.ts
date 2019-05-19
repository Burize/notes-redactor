
import HttpActions from './HttpActions';
import { Country } from './entities';

class Api {
  public country: Country;

  constructor() {
    const actions = new HttpActions();
    this.country = new Country(actions);
  }

}

export default Api;
