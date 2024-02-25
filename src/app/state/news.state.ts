import {Action, State, StateContext} from "@ngxs/store";
import {News, NewsModel} from "../models/news.models";
import {NewsHttpService} from "../services/news-http.service";
import {map, tap} from "rxjs";
import {GetNews} from "./news.actions";
import {Injectable} from "@angular/core";

export interface NewsStateModel {
  news: News[];
  page: number;
  newsInLocalStorageAdded: boolean;
  isLoaded: boolean;
}

@State<NewsStateModel>({
  name: 'news',
  defaults: {
    news: [],
    page: 1,
    newsInLocalStorageAdded: false,
    isLoaded: true,
  }
})
@Injectable()
export class NewsState {
  constructor(private newsHttpService: NewsHttpService) {
  }

  @Action(GetNews)
  getNews(ctx: StateContext<NewsStateModel>, action: GetNews) {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    if (!ctx.getState().isLoaded) {
      return ctx.getState().news;
    }

    ctx.patchState({
      isLoaded: false
    });

    const storedNewsString = localStorage.getItem('newsData');
    const state = ctx.getState();
    const nextPage = state.page + 1;
    let storedNews: News[] = [];

    if (storedNewsString && !ctx.getState().newsInLocalStorageAdded) {
      storedNews = JSON.parse(storedNewsString);
      ctx.patchState({
        news: storedNews,
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
}
