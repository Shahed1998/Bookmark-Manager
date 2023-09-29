import { IBookmark } from './interfaces/i-bookmark';
import { ICategory } from './interfaces/i-category';

export class Category implements ICategory {
  Name: String = '';
  Bookmarks: IBookmark[] = [];
}
