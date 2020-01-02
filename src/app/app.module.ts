import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule }         from './app-routing.module';

import { AppComponent }             from './app.component';
import { BlogComponent }            from './components/blog/blog.component';
import { BlogEntryViewComponent }   from './components/blog-entry-view/blog-entry-view.component';
import { CommentsViewComponent }    from './components/comments-view/comments-view.component';
import { BlogcastHeaderComponent }  from './components/blogcast-header/blogcast-header.component';
import { HomeComponent }            from './components/home/home.component';
import { MessagesComponent }        from './components/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    BlogEntryViewComponent,
    CommentsViewComponent,
    BlogcastHeaderComponent,
    HomeComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
