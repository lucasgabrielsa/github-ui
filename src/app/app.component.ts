import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from './models/user-model';
import { GithubService } from './services/github.service';
import { filter, map, debounceTime, switchMap, catchError, distinctUntilChanged } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  findControl: FormControl = new FormControl();

  error: boolean = false;

  user: User = null;

  constructor(private githubService: GithubService) {

  }

  ngOnInit() {
    this.findControl.valueChanges
      .pipe(
        filter(userInput => userInput.length > 2 && userInput),
        map(userInput => userInput),
        debounceTime(1000)
      )
      .subscribe(userInput => {
        this.error = false;
        console.log(userInput);
        this.githubService.getUser(userInput)
          .pipe(
            catchError(error => {
              this.user = null;
              this.error = true;
              return EMPTY;
            })
          ).subscribe(user => {
            this.user = user;
            console.log('user', user);
          })
      })
  }


}
