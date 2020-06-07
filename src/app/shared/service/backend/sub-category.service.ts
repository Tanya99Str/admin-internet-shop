import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../../config/url';
import {ISubCategory} from '../models/sub-category.model';
import {createRequestOption, Search} from '../../utils/request-util';

type EntityResponseType = HttpResponse<ISubCategory>;
type EntityArrayResponseType = HttpResponse<ISubCategory[]>;

@Injectable({ providedIn: 'root' })
export class SubCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/sub-categories';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/sub-categories';

  constructor(protected http: HttpClient) {}

  create(subCategory: ISubCategory): Observable<EntityResponseType> {
    return this.http.post<ISubCategory>(this.resourceUrl, subCategory, { observe: 'response' });
  }

  update(subCategory: ISubCategory): Observable<EntityResponseType> {
    return this.http.put<ISubCategory>(this.resourceUrl, subCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubCategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
