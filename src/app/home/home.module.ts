import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';
import { IonContent, IonList, IonItem, IonIcon, IonLabel, IonFooter, IonButton } from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HomePageRoutingModule,
        MainMenuComponent,
        IonContent,
        IonList,
        IonItem,
        IonIcon,
        IonLabel,
        IonFooter,
        IonButton,
        HomePage
    ]
})
export class HomePageModule { }
