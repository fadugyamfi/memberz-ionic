/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { EventsService } from '../events.service';
import { AppModel } from '../../models/api/app.model';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage.service';

export interface PagingMeta {
  from: number;
  to?: number;
  total?: number;
  current_page?: number;
  per_page?: number;
  last_page?: 3;
  links?: Array<any>;
  path?: string;
}

export interface ApiResponse {
  data?: any;
  meta?: any;
  links?: any;
}

@Injectable({
  providedIn: 'root'
})
export class APIService<T extends AppModel> {

  public BASE_URL = '';
  public _url: string;
  public model: any;
  public _model_name: string;
  public httpOptions;

  public uploadedPercentage = 0;
  public pagingMeta: PagingMeta = {
    from: 1,
    total: 1
  };

  public selectedModel: T;
  public results: T[];
  public fetching = false;
  public creating = false;
  public updating = false;
  public deleting = false;
  public saving = false;
  public prependItems = false;
  public pagination = new Subject();

  public batchRequests = [];

  public cache = {};
  public cacheKey = '';

  private _requesting = false;

  constructor(
    protected http: HttpClient,
    protected events: EventsService,
    protected storage: StorageService
  ) {
    this._url = '/';
    this.model = AppModel;
    this.model_name = 'AppModel';

    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.setApiUrl();
    this.results = [];
  }

  get url() {
    return this._url;
  }

  set url(str: string) {
    this._url = str.charAt(0) !== '/' ? `/${str}` : str;
  }

  get model_name() {
    return this._model_name;
  }

  set model_name(value) {
    this._model_name = value;
    this.cacheKey = `searched_${this.model_name.toLowerCase()}_cache`;
  }

  get requesting() {
    return this._requesting;
  }

  set requesting(value) {
    this._requesting = value;

    if (value) {
      this.events.trigger(`${this.model_name}:request`);
    } else {
      this.events.trigger(`${this.model_name}:request:completed`);
    }
  }

  getUserAuthorization() {
    const auth = this.storage.get('auth');

    if (auth) {
      return {
        Authorization: `Bearer ${auth.access_token}`
      };
    }

    return {};
  }

  setApiUrl() {
    // set Base URL from cache
    this.BASE_URL = environment.api.url;
  }

  setHttpHeaders(paramHeaders) {
    let hd = Object.assign({ 'Content-Type': 'application/json' }, this.getUserAuthorization());

    if (this.storage.has('auth')) {
      const auth = this.storage.get('auth');
      hd = Object.assign(hd, {
        Authorization: `Bearer ${auth.access_token}`
      });
    }

    if (paramHeaders) {
      hd = Object.assign(hd, paramHeaders);
    }

    this.httpOptions = {
      headers: new HttpHeaders(hd)
    };
  }
  /**
   * Performs an HTTP GET request and returns the Observable
   * object for subscription
   *
   * @param url Endpoint url segment
   * @param params Query Parameters
   */
  public get(url: string, params: object = null, paramHeaders: object = null): Observable<object> {
    const fullUrl = this.BASE_URL + url;
    this.setHttpHeaders(paramHeaders);
    this.httpOptions.params = this.removeEmpty(params);

    this.requesting = true;
    this.fetching = true;

    return this.http.get(fullUrl, this.httpOptions).pipe(map(res => {
      this.requesting = false;
      this.fetching = false;
      this.processMeta(res);
      return res;
    }));
  }


  public processMeta(response) {
    if (response.meta) {
      this.pagingMeta = response.meta;
      setTimeout(() => this.events.trigger(`${this.model_name}:paging`, this.pagingMeta), 100);
      setTimeout(() => this.pagination.next(this.pagingMeta));
    }
  }

  /**
   * Performs an HTTP POST request and returns the Observable
   * object for subscription
   *
   * @param url Endpoint url segment
   * @param params Body Form Data
   * @param qparams Query Parameters
   */
  public post(url: string, params: object | string, qparams: object = null, paramHeaders: object = null): Observable<object> {
    const fullUrl = this.BASE_URL + url;
    this.setHttpHeaders(paramHeaders);
    this.httpOptions.params = qparams;

    this.requesting = true;

    return this.http.post(fullUrl, params, this.httpOptions).pipe(map(res => {
      this.requesting = false;
      this.processMeta(res);
      return res;
    }));
  }

  /**
   * Performs an HTTP POST request and returns the Observable
   * object for subscription
   *
   * @param url Endpoint url segment
   * @param params Body Form Data
   * @param qparams Query Parameters
   */
  public put(url: string, params: object, qparams: object = null, paramHeaders: object = null): Observable<object> {
    const fullUrl = this.BASE_URL + url;
    this.setHttpHeaders(paramHeaders);
    this.httpOptions.params = qparams;

    this.requesting = true;

    return this.http.put(fullUrl, params, this.httpOptions).pipe(map(res => {
      this.requesting = false;
      this.processMeta(res);
      return res;
    }));
  }

  /**
   * Performs an HTTP DELETE request and returns the Observable object
   * for subscription
   *
   * @param url URL to query
   * @param params Query Parameters
   */
  public delete(url, params: object = null, paramHeaders: object = null): Observable<object> {
    const fullUrl = this.BASE_URL + url;
    this.setHttpHeaders(paramHeaders);
    this.httpOptions.params = params;

    this.requesting = true;

    return this.http.delete(fullUrl, this.httpOptions).pipe(map(res => {
      this.requesting = false;
      return res;
    }));
  }

  public paging() {
    return this.pagingMeta;
  }

  public getSelectedModel(): any {
    return this.selectedModel;
  }

  public setSelectedModel(model) {
    this.selectedModel = model;
    this.events.trigger(`${this.model_name}:selected`, model);
  }

  public clearSelectedModel() {
    this.setSelectedModel = null;
  }

  public clearItems() {
    this.results = [];
  }

  public hasZeroItems(): boolean {
    return this.results && this.results.length === 0;
  }

  public hasItems(): boolean {
    return this.results && this.results.length > 0;
  }

  public getItems(): T[] {
    return this.results;
  }

  public getItem(item_id: any): T {
    return this.results.find(result => result.id == item_id);
  }

  public addItem(model: T) {
    this.results.push(model);
    return this;
  }

  public updateItem(model: T) {
    this.results.forEach((g, index) => {
      if (g.id === model.id) {
        this.results[index] = model;
        return false;
      }
    });

    return this;
  }

  public removeItem(model: T) {
    this.results.forEach((g, index) => {
      if (g.id === model.id) {
        this.results.splice(index, 1);
        return false;
      }
    });

    return this;
  }

  public prependItem(model: T) {
    this.results.unshift(model);
    return this;
  }

  public setPrepredItems(status: boolean) {
    this.prependItems = status;

    return this;
  }

  /**
   * Returns an observable array of AppModel objects
   */
  getAll(params: any = {}, headers = {}): Observable<T[]> {
    if (params.cacheResults) {
      const results = this.fetchCachedData(true);

      if (results && results.length > 0) {
        this.results = results;
        return of(results);
      }
    }

    this.results = [];

    return this.get(this.url, params, headers).pipe(map((res: ApiResponse) => {

      if (params.cacheResults) {
        this.updateCache(res.data, params.cacheToLocal);
      }

      this.results = res.data.map(data => new this.model(data));
      return [...this.results];
    }));
  }

  /**
   * Get a specific record by ID
   *
   * @param id ID of record
   * @param params Query parameters to pass in for additional filtering
   */
  getById(id, params: object = null): Observable<T> {
    return this.get(`${this.url}/${id}`, params).pipe(map((res: ApiResponse) => new this.model(res.data)));
  }

  /**
   * Creates a record on the server at the specified endpoint
   *
   * @param model Model data to pass
   */
  create(model: T, qparams: object = null) {
    this.creating = this.saving = true;

    return this.post(`${this.url}`, model, qparams).pipe(
      map((response: ApiResponse) => new this.model(response.data)))
      .subscribe({
        // eslint-disable-next-line @typescript-eslint/no-shadow
        next: (model) => {
          this.setSelectedModel(model);

          if ( this.prependItems ) {
            this.prependItem(model);
          } else {
            this.addItem(model);
          }

          this.clearCache();
          this.events.trigger(`${this.model_name}:created`, model);
        },
        error: (error: HttpErrorResponse) => {
          this.events.trigger(`${this.model_name}:create:error`, error);
          this.triggerError(error);
        },
        complete: () => {
          this.creating = this.saving = false;
        }
      });
  }

  /**
   * Updates a record on the server at the specified endpoint
   *
   * @param model Model data to pass
   */
  update(model: T, qparams: object = null) {
    this.updating = this.saving = true;

    return this.put(`${this.url}/${model.id}`, model, qparams).pipe(
      map((response: ApiResponse) => new this.model(response.data)))
      .subscribe({
        // eslint-disable-next-line @typescript-eslint/no-shadow
        next: (model) => {
          this.setSelectedModel(model);
          this.updateItem(model);
          this.clearCache();
          this.events.trigger(`${this.model_name}:updated`, model);
        },
        error: (error: HttpErrorResponse) => {
          this.events.trigger(`${this.model_name}:update:error`, error);
          this.triggerError(error);
        },
        complete: () => {
          this.updating = this.saving = false;
        }
      });
  }

  /**
   * DELETEs a resource record from the specified endpoint
   *
   * @param model Model data to work with
   */
  remove(model: T, qparams: object = null) {

    if (!model.id) {
      return;
    }

    this.deleting = true;

    return this.delete(`${this.url}/${model.id}`, qparams).subscribe({
      next: (data) => {
        this.setSelectedModel(null); // clear any cached data
        this.removeItem(model);
        this.clearCache();
        this.events.trigger(`${this.model_name}:deleted`, model, data);
      },
      error: (error) => {
        this.events.trigger(`${this.model_name}:delete:error`, error);
        this.triggerError(error);
      },
      complete: () => {
        this.deleting = false;
      }
    });
  }

  /**
   * Requests a count of records in the endpoint that meet a specified criteria
   */
  count(params) {
    return this.get(`${this.url}/count`, params);
  }

  search(params): Observable<T[]> {
    return this.get(`${this.url}/search`, params).pipe(
      map((res: ApiResponse) => this.results = res.data.map(data => new this.model(data)))
    );
  }

  /**
   * Adds a new student photo record and uploads the id image if available
   *
   * @param model AppModel
   * @param qparams Query parameters
   */
  createWithUpload(model: AppModel, qparams: any = null, url: string = null) {
    const hd = Object.assign({}, this.getUserAuthorization());

    const headers = new HttpHeaders(hd);
    const params = new HttpParams({ fromObject: qparams });
    const formData: FormData = new FormData();

    for (const key in model) {
      if (typeof model[key] !== 'function' && model[key] != null) {
        formData.append(key, model[key]);
      }
    }

    if( !url ) {
      url = this.BASE_URL + this.url;
    }

    return this.http.post(url, formData, {
      reportProgress: true, params, headers, observe: 'events'
    })
      .subscribe({
        next: (event) => {
          this.handleUploadProgress(event, (res) => {
            const createdModel = new this.model(res.data);
            if( this.prependItems ) {
              this.prependItem(createdModel);
            } else {
              this.addItem(createdModel);
            }

            this.clearCache();
            this.events.trigger(`${this.model_name}:created`, createdModel);
          });
        },
        error: (error) => {
          this.requesting = false;
          this.triggerError(error);
          this.events.trigger(`${this.model_name}:create:error`, error);
        }
      });
  }

  /**
   * Updates a student photo record and uploads the id image if available
   *
   * @param model Model to work on
   * @param qparams Query params
   */
  updateWithUpload(model: AppModel, qparams: any = null, url: string = null) {
    const hd = Object.assign({}, this.getUserAuthorization());

    const headers = new HttpHeaders(hd);
    const params = new HttpParams({ fromObject: qparams });
    const formData: FormData = new FormData();

    for (const key in model) {
      if (typeof model[key] !== 'function' && model[key] != null) {
        formData.append(key, model[key]);
      }
    }

    if( !url ) {
      url = this.BASE_URL + this.url + `/${model.id}`;
    }

    return this.http.post(url, formData, {
      reportProgress: true, params, headers, observe: 'events'
    })
      .subscribe({
        next: (event) => {
          this.handleUploadProgress(event, (res) => {
            const updatedModel = new this.model(res.data);
            this.updateItem(updatedModel);
            this.clearCache();
            this.events.trigger(`${this.model_name}:updated`, updatedModel);
          });
        },
        error: (error) => {
          this.requesting = false;
          this.triggerError(error);
          this.events.trigger(`${this.model_name}:update:error`, error);
        }
      });
  }

  handleUploadProgress(event, callback = null) {
    switch (event.type) {
      case HttpEventType.Sent:
        this.requesting = true;
        this.events.trigger(`${this.model_name}:upload:start`);
        break;
      case HttpEventType.Response:
        this.requesting = false;
        this.events.trigger(`${this.model_name}:upload:complete`);
        if (callback) {
          callback(event.body);
        }
        break;
      case 1: {
        if (Math.round(this.uploadedPercentage) !== Math.round(event.loaded / event.total * 100)) {
          this.uploadedPercentage = event.loaded / event.total * 100;
          this.events.trigger(`${this.model_name}:upload:progress`, Math.round(this.uploadedPercentage));
        }
        break;
      }
    }
  }

  getError(msg: string) {
    return {
      title: 'Record Save Failed',
      msg,
      type: 'error',
      closeOther: true
    };
  }

  removeEmpty(obj) {
    try {
      if (obj) {
        const o = JSON.parse(JSON.stringify(obj)); // Clone source oect.

        Object.keys(o).forEach(key => {
          if (o[key] && typeof o[key] === 'object') { // Recurse.
            o[key] = this.removeEmpty(o[key]);
          } else if (o[key] === undefined || o[key] === null || o[key] === '') { // Delete undefined and null.
            delete o[key];
          } else { // Copy value.
            o[key] = o[key];
          }
        });

        return o; // Return new object.
      }

    } catch (e) {
      console.log(obj);
      console.log(e);
    }

    return null;
  }

  /**
   * Trigger an error event
   *
   * @param error object
   */
  triggerError(error) {
    let message = error.error && error.error.message ? error.error.message : null;

    if (message && Array.isArray(message)) {
      message = message.join('<br />');
    } else if (!message) {
      message = 'An unexpected error occurred';
    }

    this.events.trigger('toast', this.getError(message));
  }

  /**
   *
   * @param requests Array of requests
   * @param qparams Query parameters
   */
  batch(requests: Array<object>, qparams: object = null) {
    return this.post('/batch', requests, qparams).pipe(map((res: { responses?: []} ) => {
      const responses = [];

      Object.values(res.responses).forEach((resp: ApiResponse) => {
        if (resp.data) {
          if (Array.isArray(resp.data)) {
            responses.push(...resp.data.map(d => new this.model(d)));
          } else {
            responses.push(new this.model(resp.data));
          }
        } else {
          responses.push(resp);
        }
      });

      return responses;
    }));
  }

  /**
   * Returns a batch request data
   *
   * @param url URL to request
   * @param method Type of request, i.e GET, POST, PUT, DELETE
   * @param params Query or body params
   */
  buildBatchRequest(url: string, method: string, params: object = {}) {
    const id = (Math.random() * 10000).toFixed(0);

    return {
      request_id: `${this.model_name}:${method}:${id}`,
      url: '/api' + url,
      method,
      params
    };
  }

  /**
   * Create multiple records on the server at once
   *
   * @param models Array of models
   */
  batchCreate(models: T[], qparams: object = {}) {
    const requests = models.map(model => this.buildBatchRequest(`${this.url}`, 'POST', model));

    return this.batch(requests, qparams).subscribe({
      next: (data) => this.processBatchResponses(data, 'created'),
      error: (error: HttpErrorResponse) => {
        this.requesting = false;
        this.triggerError(error);
      }
    });
  }

  /**
   * Update multiple records on the server at once
   *
   * @param models Array of Models
   */
  batchUpdate(models: T[], qparams: object = {}) {
    const requests = models.map(model => {
      if (model.id) {
        return this.buildBatchRequest(`${this.url}/${model.id}`, 'PUT', model);
      }
      return this.buildBatchRequest(`${this.url}`, 'POST', model);
    });

    return this.batch(requests, qparams).subscribe({
      next: (data) => this.processBatchResponses(data, 'updated'),
      error: (error: HttpErrorResponse) => {
        this.requesting = false;
        this.triggerError(error);
      }
    });
  }

  /**
   * Delete multiple records from the server at once
   *
   * @param models Array of Models
   */
  batchDelete(models: T[], qparams: object = {}) {
    const requests = models.map(model => this.buildBatchRequest(`${this.url}/${model.id}`, 'DELETE'));

    return this.batch(requests, qparams).subscribe({
      next: (data) => this.processBatchResponses(data, 'deleted'),
      error: (error: HttpErrorResponse) => {
        this.requesting = false;
        this.triggerError(error);
      }
    });
  }

  /**
   * Process and trigger events for the responses from the batch request
   *
   * @param data Data to process
   * @param action Method calling processing
   */
  processBatchResponses(data, action) {

    data.forEach(response => {
      if (Array.isArray(response)) {
        response.forEach(model => this.events.trigger(`${this.model_name}:${action}`, model));
      } else if (response instanceof AppModel) {
        this.events.trigger(`${this.model_name}:${action}`, response);
      } else if (response.status && response.status === 'success') {
        this.events.trigger('toast', {
          title: 'Record Save Success',
          msg: response.message,
          type: 'info'
        });
      } else {
        this.triggerError(response);
      }
    });
  }

  findInCache(params) {
    const results = [];

    if (!this.cache) {
      this.cache = this.fetchCachedData();
    }

    if (params.id) {
      for (const id in this.cache) {
        if (id === params.id) {
          results.push(new this.model(this.cache[id]));
        }
      }
    }

    return results;
  }

  updateCache(data: Array<any>, local = false) {
    data.forEach(d => this.cache[d.id] = d);

    if (local) {
      localStorage.setItem(this.cacheKey, JSON.stringify(this.cache));
    } else {
      sessionStorage.setItem(this.cacheKey, JSON.stringify(this.cache));
    }
  }

  clearCache() {
    localStorage.removeItem(this.cacheKey);
    sessionStorage.removeItem(this.cacheKey);
  }

  getCachedData() {
    return localStorage.getItem(this.cacheKey) || sessionStorage.getItem(this.cacheKey);
  }

  fetchCachedData(asArray = false) {
    try {
      const data = JSON.parse(this.getCachedData());

      if ( !asArray ) {
        return data;
      }

      const results = [];
      for (const id in data) {
        if ( data.hasOwnProperty(id) ) {
            results.push(new this.model(data[id]));
        }
      }

      return results;

    } catch (e) {
      console.log(e);
      return asArray ? [] : {};
    }
  }
}
