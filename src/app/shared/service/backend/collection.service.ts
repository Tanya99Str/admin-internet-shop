import {Injectable} from '@angular/core';
import {ICollection} from '../models/collection.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../config/url';
import {Observable} from 'rxjs';
import {createRequestOption, Search} from '../../utils/request-util';

type EntityResponseType = HttpResponse<ICollection>;
type EntityArrayResponseType = HttpResponse<ICollection[]>;

@Injectable({ providedIn: 'root' })
export class CollectionService {
  public resourceUrl = SERVER_API_URL + 'api/collections';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/collections';

  constructor(protected http: HttpClient) {}

  create(collection: ICollection): Observable<EntityResponseType> {
    return this.http.post<ICollection>(this.resourceUrl, collection, { observe: 'response' });
  }

  update(collection: ICollection): Observable<EntityResponseType> {
    return this.http.put<ICollection>(this.resourceUrl, collection, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICollection>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICollection[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICollection[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
