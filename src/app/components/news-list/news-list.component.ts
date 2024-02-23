import {Component, Input, OnInit} from '@angular/core';
import { NewsItemComponent } from "../news-item/news-item.component";
import { News } from "../../models/news.models";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {map, Observable} from "rxjs";
import {NewsHttpService} from "../../services/news-http.service";
import {Router, RouterLink} from "@angular/router";

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
  public $news: Observable<News[]> | undefined ;

  constructor(
    private newsHttpService: NewsHttpService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.$news = this.newsHttpService.getNews().pipe(map((response) => response.news));

    this.newsHttpService.getSingleNews('novosti-kompanii/1840').subscribe(console.log);
  }

  public openSingleNews(news: News): void {
    this.router.navigateByUrl(`news/${news.url}`);
  }
}
