import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organisation } from '../../shared/models/api/organisation';
import { OrganisationService } from '../../shared/services/api/organisation.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.page.html',
  styleUrls: ['./organisation.page.scss'],
})
export class OrganisationPage implements OnInit {

  public organisation: Organisation;

  constructor(
    public organisationService: OrganisationService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadOrganisation();
  }

  async loadOrganisation() {
    this.organisation = this.organisationService.getSelectedModel();

    if( this.organisation ) {
      return;
    }

    const slug = this.route.snapshot.paramMap.get('slug');
    this.organisationService.getBySlug(slug).subscribe({
      next: (organisation: Organisation) => this.organisation = organisation
    });
  }

  join() {

  }
}
