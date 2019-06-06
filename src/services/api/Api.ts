
import HttpActions from './HttpActions';
import { Note } from './entities';

class Api {
  public note: Note;

  constructor() {
    const actions = new HttpActions();
    this.note = new Note(actions);
  }

}

export default Api;
