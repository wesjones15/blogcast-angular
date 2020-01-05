import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogEntry } from '../../models/blogEntry';
import { BlogEntryService } from '../../services/blog-entry-service/blog-entry.service';
import { User } from '../../models/user';
@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {
  currentUser: User = {
    id: 1,
    username: 'wes',
    createdOn: null
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private entryService: BlogEntryService
  ) { }

  ngOnInit() {
  }

  addBlogEntry(title: string, body: string, ) {
    const entry: BlogEntry = {
      id: null,
      authorId: this.currentUser.id,
      authorName: this.currentUser.username,
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
