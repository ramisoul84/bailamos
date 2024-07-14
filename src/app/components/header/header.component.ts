import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router, private storageService: StorageService) {}
  goTo(page: string) {
    this.router.navigate([page]);
  }
}
