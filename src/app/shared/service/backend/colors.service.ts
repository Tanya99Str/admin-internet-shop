import {HttpClient, HttpResponse} from '@angular/common/http';
import {ColourModel} from '../models/colour.model';
import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../config/url';
import {Observable, throwError} from 'rxjs';
import {createRequestOption, Search} from '../../utils/request-util';
import {ProductModel} from '../models/product.model';
import {catchError} from 'rxjs/operators';

type EntityResponseType = HttpResponse<ColourModel>;
type EntityArrayResponseType = HttpResponse<ColourModel[]>;

@Injectable({ providedIn: 'root' })
export class ColourService {
  public resourceUrl = SERVER_API_URL + 'api/colours';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/colours';

  constructor(protected http: HttpClient) {}

  create(colour: ColourModel): Observable<EntityResponseType> {
    return this.http.post<ColourModel>(this.resourceUrl, colour, { observe: 'response' });
  }

  newColor(color: ColourModel): Observable<ColourModel> {
    return this.http.post<ColourModel>(SERVER_API_URL + '/api/colours',
      JSON.stringify(color)).pipe(catchError(err => throwError(err)));
  }


  update(colour: ColourModel): Observable<EntityResponseType> {
    return this.http.put<ColourModel>(this.resourceUrl, colour, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ColourModel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ColourModel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ColourModel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
