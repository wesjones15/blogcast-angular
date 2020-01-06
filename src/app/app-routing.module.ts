import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogEntryViewComponent as EntryComponent } from './components/blog-entry-view/blog-entry-view.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'blog/:blogId', component: BlogComponent },
  { path: 'blog/:blogId/entry/:entryId', component: EntryComponent },
  { path: 'create/blog', component: BlogFormComponent },
  { path: 'blog/:blogId/create', component: EntryFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-success', component: RegisterSuccessComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
