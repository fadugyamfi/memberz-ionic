import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { search, pencil, shareSocialOutline } from 'ionicons/icons';
import { IonRouterLink, IonContent, IonList, IonItem, IonIcon, IonLabel, IonFooter, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    imports: [IonContent, IonList, IonItem, RouterLink, IonIcon, IonLabel, IonFooter, IonButton]
})
export class HomePage implements OnInit {

    constructor() {
        addIcons({ search, pencil, shareSocialOutline });
    }

    ngOnInit() {
    }

}
