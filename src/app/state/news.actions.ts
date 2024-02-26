import {News} from "../models/news.models";

export class GetNews {
  static readonly type = '[News] Get News';
}

export class UpdateLocalNews {
  static readonly type = '[News] Update Local News';

  constructor(public newsFormData: News) {
  }
}

