/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Organisation } from '../shared/models/api/organisation';
import { AuthService } from '../shared/services/api/auth.service';
import { OrganisationService } from '../shared/services/api/organisation.service';

@Component({
    selector: 'app-discover',
    templateUrl: 'discover.page.html',
    styleUrls: ['discover.page.scss'],
    standalone: false
})
export class DiscoverPage implements OnInit {

  public organisations$: Observable<Organisation[]>;

  constructor(
    public organisationService: OrganisationService,
    public router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrganisations();
  }

  loadOrganisations() {
    this.organisations$ = this.organisationService.getRecommended();
  }

  onSearch(event) {
    const params = {
      name_has: event.target.value,
      page: 1,
      limit: 30
    };

    const headers = {};

    this.organisations$ = this.organisationService.getPublicOrganisations(params);
  }

  loadOrganisation(organisation: Organisation) {
    this.organisationService.setSelectedModel(organisation);
    this.router.navigate(['/discover/organisation', organisation.slug]);
  }
}
