import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NewsAPI } from "../enums";
import { News, NewsModel } from "../models/news.models";

@Injectable()
export class NewsHttpService {
  constructor(private http: HttpClient) {}

  public getNews(page: number): Observable<NewsModel> {
    return this.http.get<NewsModel>(`${NewsAPI.BASE_API}/${page}/10`);
  }

  public getSingleNews(newsURL: string): Observable<News> {
    return this.http.get<News>(`${NewsAPI.BASE_API}/item/${newsURL}`);
  }
}
