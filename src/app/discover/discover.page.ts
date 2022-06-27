import { Component, OnInit } from '@angular/core';
import { OrganisationService } from '../shared/services/api/organisation.service';

@Component({
  selector: 'app-discover',
  templateUrl: 'discover.page.html',
  styleUrls: ['discover.page.scss']
})
export class DiscoverPage implements OnInit {

  public organisations$;

  constructor(
    public organisationService: OrganisationService
  ) {}

  ngOnInit(): void {
    this.loadOrganisations();
  }

  loadOrganisations() {
    this.organisations$ = this.organisationService.getRecommended();
  }
}
