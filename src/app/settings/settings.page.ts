import { Component, OnInit } from '@angular/core';
import { MemberAccount } from '../shared/models/api/member-account';
import { AuthService } from '../shared/services/api/auth.service';
import { addIcons } from 'ionicons';
import { refresh, exit, pencil, key, phonePortrait, trash } from 'ionicons/icons';
import {
    IonHeader, IonToolbar, IonTitle, IonLabel, IonContent, IonList, IonItemGroup,
    IonListHeader, IonItem, IonIcon
} from '@ionic/angular/standalone';
import { AvatarModule } from 'ngx-avatars';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
    imports: [
        IonHeader, IonToolbar, IonTitle, IonLabel, AvatarModule, RouterLink, IonContent,
        IonList, IonItemGroup, IonListHeader, IonItem, IonIcon
    ]
})
export class SettingsPage implements OnInit {

    public user: MemberAccount;

    constructor(
        public authService: AuthService
    ) {
        addIcons({ refresh, exit, pencil, key, phonePortrait, trash });
    }

    ngOnInit(): void {
        this.user = this.authService.getLoggedInUser();
    }

    doLogout() {
        this.authService.logout();
    }

    doRefresh() {
        window.location.reload();
    }
}
