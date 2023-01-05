import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { EventsService } from '../events.service';
import { HttpClient } from '@angular/common/http';
import { OrganisationMemberCategory } from '../../models/api/organisation-member-category';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationMemberCategoryService extends APIService<OrganisationMemberCategory> {

  constructor(http: HttpClient, protected events: EventsService, protected storage: StorageService) {
    super(http, events, storage);

    this.url = '/organisation_member_categories';
    this.model =  OrganisationMemberCategory;
    this.model_name = 'OrganisationMemberCategory';
  }

  findCategories(options = {}, page = 1, limit = 15) {
    const params = Object.assign(options, {
      page,
      limit,
      sort: 'name:asc',
      active: 1
    });

    return this.search(params);
  }
}
