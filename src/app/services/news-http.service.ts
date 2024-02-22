import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NewsAPI } from "../enums";
import { NewsModel } from "../models/news.models";

@Injectable()
export class NewsHttpService {
  constructor(private http: HttpClient) {}

  public getNews(): Observable<NewsModel> {
    return this.http.get<NewsModel>(NewsAPI.NEWS)
  }
}
