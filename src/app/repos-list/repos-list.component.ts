import { Component, OnInit } from '@angular/core';
import { ReposListService } from './repos-list.service';
import { LanguageItem, RepoItem } from './repos-list.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.scss']
})
export class ReposListComponent implements OnInit {
  languageList = [] as LanguageItem[];
  username = 'awslabs';
  reposCount: number;

  constructor(
    private service: ReposListService
  ) { }

  ngOnInit(): void {
    this.getUserDetails(this.username);
  }

  getUserDetails(username: string): void {
    this.languageList = [];
    this.service.getUsersDetails(username)
      .pipe(first())
      .subscribe(res => {
        this.reposCount = res.public_repos;
        this.getRepos(res.public_repos);
      });
  }

  getRepos(reposCount: number): void {
    let i = 0;
    do {
      i += 100;
      this.service.getRepoList(this.username, i / 100)
        .pipe(first())
        .subscribe(res => {
          this.getLanguages(res);
        });
    } while (i < reposCount);
  }

  getLanguages(respoList: RepoItem[]): void {
    respoList.map((item) => {
      const existingItem = this.languageList.filter(e => e.language === item.language);

      if (existingItem.length > 0) {
        existingItem[0].occurrence++;
      } else if (item.language !== null) {
        this.languageList.push({
          language: item.language,
          occurrence: 1
        });
      }
    });
  }
}
