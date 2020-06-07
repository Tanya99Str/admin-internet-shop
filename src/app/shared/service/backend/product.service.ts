import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {SERVER_API_URL} from '../../config/url';
import {ProductModel} from '../models/product.model';
import {catchError} from 'rxjs/operators';
import {createRequestOption, SearchWithPagination} from '../../utils/request-util';

type EntityResponseType = HttpResponse<ProductModel>;
type EntityArrayResponseType = HttpResponse<ProductModel[]>;

@Injectable({ providedIn: 'root' })
export class ProductService {
  public resourceUrl = SERVER_API_URL + 'api/products';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/products';

  constructor(protected http: HttpClient) {}

  create(product: ProductModel): Observable<EntityResponseType> {
    return this.http.post<ProductModel>(this.resourceUrl, product, { observe: 'response' });
  }

  newProduct(product: ProductModel): Observable<number> {
    return this.http.post<number>(SERVER_API_URL + '/api/products',
      JSON.stringify(product)).pipe(catchError(err => throwError(err)));
  }

  update(product: ProductModel): Observable<EntityResponseType> {
    return this.http.put<ProductModel>(this.resourceUrl, product, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ProductModel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ProductModel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ProductModel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
