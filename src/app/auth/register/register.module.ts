import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { IonHeader, IonBackButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RegisterPageRoutingModule,
        IonHeader,
        IonBackButton,
        IonTitle,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonItem,
        IonInput,
        IonButton
    ],
    declarations: [RegisterPage]
})
export class RegisterPageModule { }
