import { Injectable } from '@angular/core';
import { IBookmark } from '../models/interfaces/i-bookmark';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  // Get all categories
  getAllCategories() {
    let bookmarks = JSON.parse(localStorage.getItem('Bookmarks')!);
    return bookmarks;
  }

  // Add bookmark
  saveBookmark(data: IBookmark) {
    const bookmarks = localStorage.getItem('Bookmarks');
    if (!bookmarks) {
      let storage: any = {};
      let category = data.Category;
      storage[`${category}`] = [data];
      localStorage.setItem('Bookmarks', JSON.stringify(storage));
    } else {
      let bookmarkList = JSON.parse(bookmarks);
      if (bookmarkList[`${data.Category}`]) {
        bookmarkList[`${data.Category}`].push(data);
      } else {
        bookmarkList[`${data.Category}`] = [data];
      }
      localStorage.setItem('Bookmarks', JSON.stringify(bookmarkList));
    }
  }
}

// -------------------------------------------------------------------------------
// Removable
// -------------------------------------------------------------------------------
// Save category
// saveAllCategories(data: any, prevData: any) {
//   this.saveBookmark({
//     Title: 'qwerty',
//     URL: 'https://www.google.com',
//     Category: 'A',
//   });
//   // if (prevData) {
//   //   console.log(prevData[data.Category], prevData[data.NewCategoryName]);
//   //   if (prevData[data.Category]) {
//   //     // console.log(prevData[data.Category], prevData[data.NewCategoryName])
//   //     prevData[data.Category].push(data);
//   //     console.log(prevData);
//   //   } else if (prevData[data.NewCategoryName]) {
//   //     prevData[data.NewCategoryName].push(data);
//   //     console.log(prevData);
//   //   } else {
//   //     prevData[data.Category] = [data];
//   //   }
//   //   console.log(prevData);
//   //   localStorage.setItem('Bookmarks', JSON.stringify(prevData));
//   // } else {
//   //   let bookmark: any = {};
//   //   if (data.Category) {
//   //     bookmark[data.Category] = data;
//   //   } else {
//   //     bookmark[data.NewCategoryName] = [data];
//   //   }
//   //   localStorage.setItem('Bookmarks', JSON.stringify(bookmark));
//   // }
// }
