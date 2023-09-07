import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { RouteConfigLoadEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Get all categories
  getAllCategories(){
    // return this.http.get("assets/data/categories.json").pipe(
    //   map(res => {
    //     let categories = Object.keys(res);
    //     // returns keys and complete object
    //     return [categories, res];
    //   })
    // )

    let bookmarks = JSON.parse(localStorage.getItem("Bookmarks")!);
    console.log(bookmarks)
    return bookmarks;
  }

  // Save category
  saveAllCategories(data: any, prevData: any){
    if(prevData){
      console.log(prevData[data.Category], prevData[data.NewCategoryName])
      if(prevData[data.Category]){
        // console.log(prevData[data.Category], prevData[data.NewCategoryName])
        prevData[data.Category].push(data)
        console.log(prevData)
      }
      else if(prevData[data.NewCategoryName]){
        prevData[data.NewCategoryName].push(data)
        console.log(prevData)
      }
      else{
        prevData[data.Category] = [data];
      }
      console.log(prevData)
      localStorage.setItem("Bookmarks", JSON.stringify(prevData))
    }else{
      
      let bookmark:any = {}
      if(data.Category){
        bookmark[data.Category] = data;
      }else{
        bookmark[data.NewCategoryName] = [data];
      }
      
      localStorage.setItem("Bookmarks", JSON.stringify(bookmark))
    }

  }
}
