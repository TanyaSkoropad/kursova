import { ThemeComponent, OnInit } from '@angular/core';

@Component({
selector: 'app-preview',
templateUrl: './preview.component.html',
styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
visibility: boolean = true;
toggle() {
     this.visibility = !this.visibility;
  }
  constructor() { }

  ngOnInit() {
  }

}
