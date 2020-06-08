import {Injectable} from '@angular/core';
import {CategoryModel} from '../models/category.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../config/url';
import {Observable} from 'rxjs';
import {createRequestOption, Search} from '../../utils/request-util';

type EntityResponseType = HttpResponse<CategoryModel>;
type EntityArrayResponseType = HttpResponse<CategoryModel[]>;

@Injectable({ providedIn: 'root' })
export class CategoryService {
  public resourceUrl = SERVER_API_URL + 'api/categories';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/categories';

  constructor(protected http: HttpClient) {}

  create(category: CategoryModel): Observable<EntityResponseType> {
    return this.http.post<CategoryModel>(this.resourceUrl, category, { observe: 'response' });
  }

  update(category: CategoryModel): Observable<EntityResponseType> {
    return this.http.put<CategoryModel>(this.resourceUrl, category, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<CategoryModel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<CategoryModel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<CategoryModel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
