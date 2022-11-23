import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponce } from '../../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = 'QB4CKgqx41fhnbYnM4Hth4FMvZffH49T';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  buscarGifs( query: string) {
    query = query.trim().toLocaleLowerCase();

    if ((!this._historial.includes(query)) && (query.length > 0)) {
      this._historial.unshift( query);
      this._historial = this._historial.splice(0,10);
      console.log(this._historial);
    }

    this.http.get<SearchGifsResponce>(`https://api.giphy.com/v1/gifs/search?api_key=QB4CKgqx41fhnbYnM4Hth4FMvZffH49T&limit=10&q=${query}`)
      .subscribe((resp) => {
        console.log (resp.data);
        this.resultados = resp.data;
      })

  }
}
