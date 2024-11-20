import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { search, pencil, shareSocialOutline } from 'ionicons/icons';
import { IonRouterLink } from '@ionic/angular/standalone';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: false
})
export class HomePage implements OnInit {

    constructor() {
        addIcons({ search, pencil, shareSocialOutline });
    }

    ngOnInit() {
    }

}
