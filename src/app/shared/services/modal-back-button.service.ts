import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalBackButtonService {

  constructor() { }

  pushModalState() {
    const modalState = {
      modal : true,
      desc : 'fake state for our modal'
    };
    history.pushState(modalState, null);
  }

  clearModalState() {
    if (window.history.state.modal) {
      history.back();
    }
  }
}
