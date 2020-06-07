import {Injectable} from '@angular/core';
import {Collection} from '../models/collection.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../config/url';
import {Observable} from 'rxjs';
import {createRequestOption, Search} from '../../utils/request-util';

type EntityResponseType = HttpResponse<Collection>;
type EntityArrayResponseType = HttpResponse<Collection[]>;

@Injectable({ providedIn: 'root' })
export class CollectionService {
  public resourceUrl = SERVER_API_URL + 'api/collections';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/collections';

  constructor(protected http: HttpClient) {}

  create(collection: Collection): Observable<EntityResponseType> {
    return this.http.post<Collection>(this.resourceUrl, collection, { observe: 'response' });
  }

  update(collection: Collection): Observable<EntityResponseType> {
    return this.http.put<Collection>(this.resourceUrl, collection, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<Collection>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<Collection[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<Collection[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
