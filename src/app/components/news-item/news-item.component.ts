import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {News} from "../../models/news.models";
import {NewsHttpService} from "../../services/news-http.service";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-news-item',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './news-item.component.html',
  styleUrl: './news-item.component.scss'
})
export class NewsItemComponent implements OnInit {
  public $currentNews: Observable<News> | undefined;
  constructor(private route: ActivatedRoute, private newsHttpService: NewsHttpService,) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const newsUrl = `${params.get('category')}/${params.get('id')}`;
      this.$currentNews = this.newsHttpService.getSingleNews(newsUrl);
      this.$currentNews.subscribe(console.log)
    });
  }
}
