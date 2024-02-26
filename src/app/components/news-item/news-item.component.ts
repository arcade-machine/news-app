import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { News } from "../../models/news.models";
import { AsyncPipe, DatePipe, NgIf } from "@angular/common";
import { Select, Store } from "@ngxs/store";
import { NewsSelectors } from "../../state/news.selectors";
import { GetSingleNews } from "../../state/news.actions";

@Component({
  selector: 'app-news-item',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './news-item.component.html',
  styleUrl: './news-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit {
  @Select(NewsSelectors.currentNews) $currentNews!: Observable<News>;
  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const newsUrl = `${params.get('category')}/${params.get('id')}`;

      this.store.dispatch(new GetSingleNews(newsUrl));
    });
  }
}
