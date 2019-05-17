import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public city: any = {};
  public message: string;
  public successMessage: boolean = false;
  public errorMessage: boolean = false;

constructor(private router: Router, private route: ActivatedRoute, private addcity: AppService) {
  setTheme('bs4');
 }

  onSubmit() {
    this.addcity.addNewCity(this.city)
      .subscribe((res: any) => {
        if (res.status === 200) {
          this.addcity.insertToSubject(res);
          this.successMessage = true;
          this.message = res.msg;
          setTimeout(() => this.successMessage = false, 3000);
        } else if (res.status === 404) {
          this.errorMessage = true;
          this.message = res.msg;
          setTimeout(() => this.errorMessage = false, 3000);
        }
        document.forms['addCityForm'].reset();
        this.city.length = 0;
      }, err => {
        console.error(err);
      });
  }

  title = 'app';
}
