import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { filter } from 'rxjs';
import { currentPage, users, totalUsers } from '../../store/users.store';

@Component({
  templateUrl: './users-signals-page.component.html',
  styleUrls: ['./users-signals-page.component.css']
})
export class UsersSignalsPageComponent implements OnInit {

  public usersService = inject(UsersService);

  get users() {
    return users();
  }

  get currentPage() {
    return currentPage();
  }

  get totalUsers() {
    return totalUsers();
  }

  ngOnInit(): void {
    this.loadPage(currentPage());
  }

  loadPage(page: number) {
    this.usersService.loadPage(page)
      .pipe(filter((newUsers) => newUsers.length > 0))
      .subscribe(newUsers => {
        currentPage.set(page);
        // this.users.set(users);
        // this.users.set([...this.users(), ...users])
        users.update((currentUsers) => [...currentUsers, ...newUsers]);
      })
  }

}
