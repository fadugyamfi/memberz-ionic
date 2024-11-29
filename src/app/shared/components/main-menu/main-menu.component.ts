import { Component, OnInit, input } from '@angular/core';
import { AuthService } from '../../services/api/auth.service';
import { StorageService } from '../../services/storage.service';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
    standalone: true,
    imports: [
        IonMenu,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel
    ]
})
export class MainMenuComponent implements OnInit {

    readonly contentId = input('');

    constructor(
        public authService: AuthService,
        public storage: StorageService
    ) { }

    ngOnInit() { }

    doLogout() {
        this.authService.logout();
        this.storage.engine.clear();
    }
}
