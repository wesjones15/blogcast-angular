import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { BlogEntry } from '../../models/blogEntry';
import { MessageService } from '../message-service/message.service';

@Injectable({
  providedIn: 'root'
})
export class BlogEntryService {
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    )
  };
  blogEntries: BlogEntry[] = [];
  private entryUrl = 'http://localhost:8080/blogEntry';
  private log(message: string) {
    this.messageService.add(`BlogService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getBlogEntriesByBlogId(blogId: number): Observable<BlogEntry[]> {
    const url = `http://localhost:8080/blog/${blogId}/entries`;
    return this.http.get<BlogEntry[]>(url).pipe(
      tap(_ => this.log('fetched blog entries')),
      catchError(this.handleError<BlogEntry[]>('getBlogEntriesByBlogId', []))
    );
  }

  getBlogEntry(entryId: number): Observable<BlogEntry> {
    return this.http.get<BlogEntry>(`${this.entryUrl}/${entryId}`).pipe(
      tap(_ => this.log(`fetched blog entry id=${entryId}`)),
      catchError(this.handleError<BlogEntry>(`getBlogEntry id=${entryId}`))
    );
  }
}
