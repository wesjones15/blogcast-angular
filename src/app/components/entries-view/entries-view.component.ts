import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogEntryService } from '../../services/blog-entry-service/blog-entry.service';
import { BlogEntry } from '../../models/blogEntry';

@Component({
  selector: 'app-entries-view',
  templateUrl: './entries-view.component.html',
  styleUrls: ['./entries-view.component.css']
})
export class EntriesViewComponent implements OnInit {
  entries: BlogEntry[] = [];
  blogId: number = +this.route.snapshot.paramMap.get('blogId');
  
  constructor(
    private route: ActivatedRoute,
    private entryService: BlogEntryService
  ) { }

  ngOnInit() {
    this.getBlogEntries();
  }

  getBlogEntries(): void {
    this.entryService.getBlogEntriesByBlogId(this.blogId).subscribe(entries => this.entries = entries);
  }

}
