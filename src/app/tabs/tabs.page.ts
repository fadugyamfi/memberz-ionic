import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { home, calendar, settings } from 'ionicons/icons';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class TabsPage {

    constructor() {
        addIcons({ home, calendar, settings });
    }

}
