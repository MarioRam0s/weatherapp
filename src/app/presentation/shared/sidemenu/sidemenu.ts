import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'shared-sidemenu',
  templateUrl: './sidemenu.html',
  imports: [RouterLink, RouterLinkActive],
})
export class Sidemenu {}
