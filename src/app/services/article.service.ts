import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { APIService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ArticleService {
  private articleUrl = 'articles/';

  /**
   * ArticleService constructor
   *
   * @param {LocalStorageService} localStorageService
   * @param {APIService} APIService
   */
  constructor(private localStorageService: LocalStorageService, private APIService: APIService) {}

  /**
   * @returns {Observable<any>}
   */
  getArticles() {
    return this.APIService.get(this.articleUrl);
  }

  /**
   * @param {string} id
   * @returns {Observable<any>}
   */
  getArticleById(id: string) {
    return this.APIService.get(this.articleUrl + id);
  }

  /**
   * @param article
   * @returns {Observable<any>}
   */
  createArticle(article) {
    return this.APIService.post(
      this.articleUrl + '?token=' + this.localStorageService.getParameter('token'),
      {
        title: article.value.title,
        body: article.value.body,
        category: article.value.category.split(','),
        image: article.value.image
      }
    );
  }

  /**
   * @param article
   * @returns {Observable<any>}
   */
  editArticle(article) {
    console.log(article._id, article.title, article.body, article.image);
    return this.APIService.put(
      this.articleUrl + article._id,
      {
        title: article.title,
        body: article.body,
        category: article.category,
        image: article.image
      }
    );
  }

  /**
   * @param {string} id
   * @returns {Promise<never | any>}
   */
  deleteArticle(id: string) {
    return this.APIService.delete(
      this.articleUrl + id)
      .toPromise()
      .then(() => null)
      .catch(() => null);
  }
}
