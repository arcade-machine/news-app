import {Component, HostListener, Input, OnInit} from '@angular/core';
import { NewsItemComponent } from "../news-item/news-item.component";
import { News } from "../../models/news.models";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {map, Observable} from "rxjs";
import {NewsHttpService} from "../../services/news-http.service";
import {Router, RouterLink} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {NewsState} from "../../state/news.state";
import {NewsSelectors} from "../../state/news.selectors";
import {GetNews} from "../../state/news.actions";

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [
    NewsItemComponent,
    CommonModule,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent implements OnInit {
  @Select(NewsSelectors.news) $news: Observable<News[]> | undefined;
  @Select(NewsSelectors.currentPage) $currentPage: Observable<number> | undefined;

  constructor(
    private router: Router,
    private store: Store
  ) {}

  @HostListener("window:scroll", []) onWindowScroll() {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 1) {
      this.loadNextPage();
    }
  }

  public ngOnInit(): void {
    this.store.dispatch(new GetNews());
  }

  public openSingleNews(news: News): void {
    if (news.customUpload) {
      return;
    }
    this.router.navigateByUrl(`news/${news.url}`);
  }

  loadNextPage(): void {
    this.store.dispatch(new GetNews());
  }
}
