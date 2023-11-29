import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { imgDetails } from '../intreface/imgDetails.interface';
import { imageModelDTO } from '../intreface/imageModeDTO';


@Injectable({
  providedIn: 'root'
})
export class JsonServiceTsService {

  constructor(private http: HttpClient) { }


  getCollectionDetils(code: string): Observable<imgDetails> {
    let url: string = 'https://localhost:7002/api/JSON/GetTitelOfImg/' + code;
    return this.http.get<imgDetails>(url)
  }

  addImgToCollection(addItem: imageModelDTO): Observable<imageModelDTO> {
    let url: string = 'https://localhost:7002/api/JSON/AddImages';
    return this.http.post<imageModelDTO>(url, addItem);
  }
}
