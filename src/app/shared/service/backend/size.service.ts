import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../config/url';
import {Observable} from 'rxjs';
import {SizeModel} from '../models/size.model';
import {createRequestOption, Search} from '../../utils/request-util';

type EntityResponseType = HttpResponse<SizeModel>;
type EntityArrayResponseType = HttpResponse<SizeModel[]>;

@Injectable({ providedIn: 'root' })
export class SizeService {
  public resourceUrl = SERVER_API_URL + 'api/sizes';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/sizes';

  constructor(protected http: HttpClient) {}

  create(size: SizeModel): Observable<EntityResponseType> {
    return this.http.post<SizeModel>(this.resourceUrl, size, { observe: 'response' });
  }

  update(size: SizeModel): Observable<EntityResponseType> {
    return this.http.put<SizeModel>(this.resourceUrl, size, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<SizeModel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<SizeModel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<SizeModel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
