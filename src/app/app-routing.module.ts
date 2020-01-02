import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogEntryViewComponent as EntryComponent } from './components/blog-entry-view/blog-entry-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'blog/:blogId', component: BlogComponent },
  { path: 'blog/:blogId/entry/:entryId', component: EntryComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
