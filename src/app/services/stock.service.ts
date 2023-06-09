import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getAllCategorie(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/categories');
  }

  getAllProduit(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/produits');
  }
}
