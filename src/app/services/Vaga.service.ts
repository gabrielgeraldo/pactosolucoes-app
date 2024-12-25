import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vaga } from '../models/Vaga';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VagaService {
   baseUrl = environment.apiURL + 'api/vagas';

  constructor(private http: HttpClient) { }

  public getVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.baseUrl);
  }

  public deleteVaga(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(take(1));
  }

  public getVagaById(id: number): Observable<Vaga> {
    return this.http.get<Vaga>(`${this.baseUrl}/${id}`);
  }

  public post(vaga: Vaga): Observable<Vaga> {
    return this.http
      .post<Vaga>(this.baseUrl, vaga)
      .pipe(take(1));
  }

  public put(vaga: Vaga): Observable<Vaga> {
    return this.http
      .put<Vaga>(`${this.baseUrl}/${vaga.id}`, vaga)
      .pipe(take(1));
  }

}
