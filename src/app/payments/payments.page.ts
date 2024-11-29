import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
    selector: 'app-tab3',
    templateUrl: 'payments.page.html',
    styleUrls: ['payments.page.scss'],
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel]
})
export class PaymentsPage {

    constructor() { }

}
