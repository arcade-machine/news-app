import { Action, State, StateContext } from "@ngxs/store";
import { News } from "../models/news.models";
import { NewsHttpService } from "../services/news-http.service";
import { catchError, map, Observable, of, tap } from "rxjs";
import { GetNews, GetSingleNews, UpdateLocalNews } from "./news.actions";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface NewsStateModel {
  news: News[];
  page: number;
  newsInLocalStorageAdded: boolean;
  isLoaded: boolean;
  currentNews: News | null;
}

@State<NewsStateModel>({
  name: 'news',
  defaults: {
    news: [],
    page: 1,
    newsInLocalStorageAdded: false,
    isLoaded: true,
    currentNews: null,
  }
})
@Injectable()
export class NewsState {
  constructor(
    private newsHttpService: NewsHttpService,
    private router: Router,
  ) {}

  @Action(GetNews)
  getNews(ctx: StateContext<NewsStateModel>, action: GetNews): Observable<News[]> {
    if (typeof localStorage === 'undefined') {
      return of([]);
    }

    if (!ctx.getState().isLoaded) {
      return of(ctx.getState().news);
    }

    ctx.patchState({
      isLoaded: false
    });

    const storedNewsString = localStorage.getItem('newsData');
    const state = ctx.getState();
    const nextPage = state.page + 1;

    if (storedNewsString && !ctx.getState().newsInLocalStorageAdded) {
      ctx.patchState({
        news: JSON.parse(storedNewsString),
        newsInLocalStorageAdded: true,
      });
    }

    return this.newsHttpService.getNews(nextPage).pipe(
      map((response) => response.news),
      tap((news: News[]) => {
        ctx.patchState({
          news: [...ctx.getState().news, ...news],
          page: nextPage,
          isLoaded: true,
        });
      })
    );
  }

  @Action(UpdateLocalNews)
  updateLocalNews(ctx: StateContext<NewsStateModel>, action: UpdateLocalNews): void {
    ctx.patchState({
      news: [action.newsFormData, ...ctx.getState().news],
      newsInLocalStorageAdded: true,
    });
  }

  @Action(GetSingleNews)
  getSingleNews(ctx: StateContext<NewsStateModel>, action: GetSingleNews): Observable<News | null> {
    ctx.patchState({
      currentNews: null
    });

    return this.newsHttpService.getSingleNews(action.newsUrl).pipe(
      tap((news: News) => {
        ctx.patchState({
          currentNews: news
        })
      }),
      catchError((error: Error) => {
        this.router.navigateByUrl('/');
        return of(null);
      }),
    );
  }
}
