import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzUploadFile } from 'ng-zorro-antd/upload';
import { switchMap } from 'rxjs';
import { NewsService } from './news.service';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'portal-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  newsForm: FormGroup;
  isVisible = false;
  isDeleteModalVisible = false;

  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  selectedNews: any;
  isLoading = false;

  newsList: any = [];
  mockNews = [
    {
      id: 1,
      title: 'title',
      description: 'description',
      images: [
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      ],
    },
    {
      id: 2,
      title: 'title2',
      description: 'description2',
      images: [
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      ],
    },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _newsService: NewsService
  ) {
    this.newsForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: '',
    });
  }

  ngOnInit() {
    //  здесь будем доставать новости из store
    this.getNewsList();
  }

  getNewsList() {
    this._newsService.getAllNews().subscribe((news) => (this.newsList = news));
  }

  handlePreview = async (file: any): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  showModal(news?: any): void {
    this.selectedNews = news;
    this.newsForm.patchValue(this.selectedNews);
    this.isVisible = true;
  }

  showDeleteConfirmationModal(news: any): void {
    this.isDeleteModalVisible = true;
    this.selectedNews = news;
  }

  createNews() {
    this.isVisible = false;
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this._newsService
      .saveImages(formData)
      .pipe(
        switchMap((images) => {
          return this._newsService.createNews({
            ...this.newsForm.value,
            // images,
            main_image_url: images[0],
          });
        })
      )
      .subscribe((_) => {
        this.newsForm.reset();
        this.getNewsList();
        this.fileList = [];
      });
  }

  editNews() {
    this.isLoading = true;
    setTimeout(() => {
      const newsToDeleteIndex = this.mockNews.findIndex(
        (n) => this.selectedNews.id === n.id
      );
      this.mockNews.splice(newsToDeleteIndex, 1);
      this.isVisible = false;
      this.newsForm.reset();
    }, 300);
  }

  confirmDelete() {
    this.isLoading = true;
    this._newsService
      .deleteNewsById(this.selectedNews._id)
      .pipe(
        switchMap(() => {
          this.isLoading = false;
          this.isDeleteModalVisible = false;
          this.getNewsList();
          return this._newsService.deleteImageByName(
            this.selectedNews.main_image_url
          );
        })
      )
      .subscribe();
  }

  handleCancel(): void {
    this.isDeleteModalVisible = false;
    this.isVisible = false;
    this.newsForm.reset();
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
}
