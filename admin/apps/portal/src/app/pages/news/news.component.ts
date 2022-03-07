import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzUploadFile } from 'ng-zorro-antd/upload';

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

  constructor(private _formBuilder: FormBuilder) {
    this.newsForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: '',
    });
  }

  ngOnInit() {
    //  здесь будем доставать новости из store
  }

  // NzUploadFile
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
    this.mockNews.push({ ...this.newsForm.value, id: Math.random() });
    this.newsForm.reset();
  }

  editNews() {
    this.isLoading = true;
    setTimeout(() => {
      const newsToDeleteIndex = this.mockNews.findIndex(
        (n) => this.selectedNews.id === n.id
      );
      this.mockNews.splice(newsToDeleteIndex, 1);
      this.isVisible = false;
      console.log(this.newsForm.value);
      this.mockNews.push({ ...this.newsForm.value, id: Math.random() });
      this.newsForm.reset();
      this.isVisible = false;
    }, 300);
  }

  confirmDelete() {
    this.isLoading = true;
    setTimeout(() => {
      const newsToDeleteIndex = this.mockNews.findIndex(
        (n) => this.selectedNews.id === n.id
      );
      this.mockNews.splice(newsToDeleteIndex, 1);
      this.isDeleteModalVisible = false;
    }, 300);
  }

  handleCancel(): void {
    this.isDeleteModalVisible = false;
    this.isVisible = false;
    this.newsForm.reset();
  }
}
