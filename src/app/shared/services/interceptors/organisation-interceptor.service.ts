import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { OrganisationService } from '../api/organisation.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class OrganisationInterceptor implements HttpInterceptor {

    constructor(private organisationService: OrganisationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const organisation = this.organisationService.getActiveOrganisation();

        if (organisation && req.url.includes(environment.api.url) && !req.headers.has('X-Tenant-Id')) {
            const cloneReq = req.clone({
                setHeaders: {
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  'X-Tenant-Id': organisation.uuid
                }
             });
            return next.handle(cloneReq);
        }

        return next.handle(req);
    }

}
