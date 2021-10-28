import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  @ViewChild('searchBox')
  searchBox!: ElementRef;
  searchResults: any;
  showResult = false;
  title = 'user-search';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    
  }

getUserData(search = '') {
  const url = `https://api.stackexchange.com/2.3/users?sort=reputation&inname=${search}&site=stackoverflow`;

  return this.http.get<any>(url).pipe(
    map((response: any) => {
       return this.searchResults = response.items;
       if (response.items.length > 0) {
         this.showResult = true;
       }
    })
  );
}

searchUser() {
  this.showResult = false;
  this.getUserData(this.searchBox.nativeElement.value).subscribe();
}

}
 

