import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RepoItem, User } from './repos-list.model';

@Injectable({
  providedIn: 'root'
})
export class ReposListService {
  readonly _rootUrl = 'https://api.github.com';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsersDetails(username: string): Observable<User> {
    return this.httpClient.get<User>(`${this._rootUrl}/users/${username}`);
  }

  getRepoList(username: string, page: number): Observable<RepoItem[]> {
    return this.httpClient.get<RepoItem[]>(`${this._rootUrl}/users/${username}/repos`, {
      params: { per_page: 100, page: page, type: 'public' }
    });
  }

}
