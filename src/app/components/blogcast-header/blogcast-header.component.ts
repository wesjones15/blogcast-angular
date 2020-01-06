import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
// import { User } from 'src/app/models/user';
// import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-blogcast-header',
  templateUrl: './blogcast-header.component.html',
  styleUrls: ['./blogcast-header.component.css']
})
export class BlogcastHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
