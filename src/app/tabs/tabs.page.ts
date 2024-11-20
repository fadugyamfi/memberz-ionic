import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { home, calendar, settings } from 'ionicons/icons';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    standalone: false
})
export class TabsPage {

    constructor() {
        addIcons({ home, calendar, settings });
    }

}
