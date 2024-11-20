import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/api/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class MainMenuComponent implements OnInit {

  @Input() contentId = '';

  constructor(
    public authService: AuthService,
    public storage: StorageService
  ) { }

  ngOnInit() {}

  doLogout() {
    this.authService.logout();
    this.storage.engine.clear();
  }
}
