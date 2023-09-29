import { IBookmark } from './interfaces/i-bookmark';

export class Bookmark implements IBookmark {
  Title: String = '';
  URL: String = '';
  Category: String = '';
}
