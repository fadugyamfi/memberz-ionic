import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscoverPage } from './discover.page';

import { DiscoverPageRoutingModule } from './discover-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';
import { IonHeader, IonBackButton, IonTitle, IonButton, IonContent, IonList, IonListHeader, IonSearchbar, IonItem, IonLabel, IonSpinner, IonText } from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        DiscoverPageRoutingModule,
        MainMenuComponent,
        IonHeader,
        IonBackButton,
        IonTitle,
        IonButton,
        IonContent,
        IonList,
        IonListHeader,
        IonSearchbar,
        IonItem,
        IonLabel,
        IonSpinner,
        IonText
    ],
    declarations: [DiscoverPage]
})
export class DiscoverPageModule { }
