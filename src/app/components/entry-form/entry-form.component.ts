import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogEntry } from '../../models/blogEntry';
import { BlogEntryService } from '../../services/blog-entry-service/blog-entry.service';
import { User } from '../../models/user';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {
  currentUser: User = {
    // every post will have this user id until user id is tracked otherwise
    id: 1,
    username: 'wes',
    createdOn: null
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private entryService: BlogEntryService,
    private $localStorage: LocalStorageService
  ) { }

  ngOnInit() {

  }

  addBlogEntry(title: string, body: string, ) {
    const entry: BlogEntry = {
      id: null,
      authorId: this.currentUser.id,
      authorName: this.$localStorage.retrieve('username'),
      title,
      body,
      createdOn: new Date(),
      blogId: +this.route.snapshot.paramMap.get('blogId')
    };
    this.entryService.addBlogEntry(entry).subscribe();
  }

  goBack() {
    this.location.go(`/blog/${+this.route.snapshot.paramMap.get('blogId')}`);
  }

}
