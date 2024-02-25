import { Selector} from "@ngxs/store";
import { NewsState, NewsStateModel } from "./news.state";
import { News } from "../models/news.models";

export class NewsSelectors {
  @Selector([NewsState])
  static news(state: NewsStateModel): News[] {
    return state.news;
  }

  @Selector([NewsState])
  static currentPage(state: NewsStateModel): number {
    return state.page;
  }
}
