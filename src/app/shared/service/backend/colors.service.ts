import {HttpClient, HttpResponse} from '@angular/common/http';
import {IColour} from '../models/colour.model';
import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../config/url';
import {Observable} from 'rxjs';
import {createRequestOption, Search} from '../../utils/request-util';

type EntityResponseType = HttpResponse<IColour>;
type EntityArrayResponseType = HttpResponse<IColour[]>;

@Injectable({ providedIn: 'root' })
export class ColourService {
  public resourceUrl = SERVER_API_URL + 'api/colours';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/colours';

  constructor(protected http: HttpClient) {}

  create(colour: IColour): Observable<EntityResponseType> {
    return this.http.post<IColour>(this.resourceUrl, colour, { observe: 'response' });
  }

  update(colour: IColour): Observable<EntityResponseType> {
    return this.http.put<IColour>(this.resourceUrl, colour, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IColour>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IColour[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IColour[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
