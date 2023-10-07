import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Bookmark } from 'src/app/models/bookmark';
import { faCircleInfo, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  modalRef?: BsModalRef;
  saveBtnPressed: boolean = false;
  addBookmarks!: FormGroup;
  addCategoryBtnPressed: boolean = false;
  newCategoryError: boolean = true;
  bookmarks = null;

  // Font Awesome
  faCircleInfo = faCircleInfo;
  faTrash = faTrash;

  // NgSelect
  categoryName: Array<string> = [];
  categoryWithSubCategory: any;
  subCatDetailsPressed: boolean = false;
  subCategoryDetails: any = {
    Title: '',
    Url: '',
    Category: '',
  };

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.addBookMarkBuilder();
    // this.apiService.getAllCategories().subscribe((res:any) => {
    //   this.categoryName = res[0];
    //   this.categoryWithSubCategory = res[1]
    //   console.log(this.categoryName)
    //   console.log(this.categoryWithSubCategory )
    // });
    this.getAllCategories();
  }

  getAllCategories() {
    this.bookmarks = this.apiService.getAllCategories();
    if (this.bookmarks) {
      this.categoryName = Object.keys(this.bookmarks);
      this.categoryWithSubCategory = this.bookmarks;
      console.log(this.bookmarks);
    }
  }

  openModal(template: TemplateRef<any>) {
    if (!this.bookmarks) {
      this.addCategoryBtnPressed = true;
    } else {
      this.addCategoryBtnPressed = false;
    }
    this.modalRef = this.modalService.show(template);
  }

  addBookMarkBuilder() {
    this.addBookmarks = this.fb.group(
      {
        Title: ['', [Validators.required, Validators.maxLength(30)]],
        Url: ['', Validators.required],
        Category: [null],
        NewCategoryName: [null],
      },
      {
        validators: [this.urlValidatorFn],
      }
    );
  }

  // ------------------------------------------------------------------------
  // Custom validations
  // ------------------------------------------------------------------------
  urlValidatorFn(control: AbstractControl) {
    // URL validation regular expression
    var regex =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regex.test(control.get('Url')!.value) ? null : { invalidUrl: true };
  }

  // ------------------------------------------------------------------------
  // On submit
  // ------------------------------------------------------------------------
  submitBookmark() {
    this.saveBtnPressed = true;
    if (!this.Category.value && !this.NewCategory.value) {
      this.newCategoryError = true;
    } else {
      let bkMark: Bookmark = new Bookmark();

      bkMark.Title = this.Title.value;
      bkMark.URL = this.Url.value;
      if (this.Category.value) bkMark.Category = this.Category.value;
      else bkMark.Category = this.NewCategory.value;

      this.apiService.saveBookmark(bkMark);

      this.getAllCategories();
      this.modalRef?.hide();
      this.addBookmarks.reset();
    }
  }

  resetModalFields() {
    this.addBookmarks.reset();
    this.addCategoryBtnPressed = false;
    this.saveBtnPressed = false;
    this.newCategoryError = false;
  }

  clickedCatBtn() {
    this.addCategoryBtnPressed = true;
    this.newCategoryError = false;
    this.Category.reset();
  }

  details(sub: any, cat: string) {
    this.subCategoryDetails = sub;
    this.subCategoryDetails.Category = cat;
    this.subCategoryDetails.Title = sub.Title;
    this.subCategoryDetails.Url = sub.Url;
    this.subCatDetailsPressed = true;
  }

  deleteSubCategory(cat: string, index: number) {
    // ------------------------------------------------
    // Need to finish
    // Delete from local storage using api service
    // Call getAllCategories()
    // Data structure { Category: [{}, {}, {}] }
    // Access the category and remove the index
    // ------------------------------------------------
    console.log(cat, index);
  }

  // ------------------------------------------------------------------------
  // Gets
  // ------------------------------------------------------------------------
  get Title() {
    return this.addBookmarks.get('Title') as FormControl;
  }

  get Url() {
    return this.addBookmarks.get('Url') as FormControl;
  }

  get Category() {
    return this.addBookmarks.get('Category') as FormControl;
  }

  get NewCategory() {
    return this.addBookmarks.get('NewCategoryName') as FormControl;
  }
}
