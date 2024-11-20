import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MembershipsPageRoutingModule } from './memberships-routing.module';

import { MembershipsPage } from './memberships.page';
import { SharedModule } from '../shared/shared.module';
import { MainMenuComponent } from '../shared/components/main-menu/main-menu.component';
import { DetailsComponent } from './details/details.component';
import { GroupsComponent } from './groups/groups.component';
import { AnniversariesComponent } from './anniversaries/anniversaries.component';
import { PaymentsComponent } from './payments/payments.component';
import { DirectoryComponent } from './directory/directory.component';
import { ProfileDetailsComponent } from './directory/profile-details/profile-details.component';
import { IonHeader, IonToolbar, IonTitle, IonLabel, IonContent, IonRefresher, IonRefresherContent, IonList, IonListHeader, IonItem, IonSpinner, IonText, IonButton, IonItemGroup, IonSkeletonText, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonAccordionGroup, IonAccordion, IonIcon, IonSearchbar, IonModal } from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MembershipsPageRoutingModule,
        SharedModule,
        MainMenuComponent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonLabel,
        IonContent,
        IonRefresher,
        IonRefresherContent,
        IonList,
        IonListHeader,
        IonItem,
        IonSpinner,
        IonText,
        IonButton,
        IonItemGroup,
        IonItem,
        IonLabel,
        IonSkeletonText,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonSegment,
        IonSegmentButton,
        IonContent,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonLabel,
        IonAccordionGroup,
        IonAccordion,
        IonItem,
        IonIcon,
        IonList,
        IonListHeader,
        IonHeader,
        IonToolbar,
        IonSearchbar,
        IonList,
        IonItemGroup,
        IonItem,
        IonLabel,
        IonSkeletonText,
        IonItemGroup,
        IonItem,
        IonLabel,
        IonSkeletonText,
        IonList,
        IonListHeader,
        IonLabel,
        IonButton,
        IonIcon,
        IonSpinner,
        IonItemGroup,
        IonItem,
        IonSkeletonText,
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonContent,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle
    ],
    declarations: [
        MembershipsPage,
        DetailsComponent,
        ProfileDetailsComponent,
        GroupsComponent,
        AnniversariesComponent,
        PaymentsComponent,
        DirectoryComponent
    ]
})
export class MembershipsPageModule { }
