import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements AfterViewInit {
  seletorVisivel = false;
  navbarTogglerVisivel = true;
  screenWidth!: number;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  constructor(private renderer: Renderer2, private cdref: ChangeDetectorRef, private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.cdref.detectChanges();

    this.renderer.listen('document', 'click', (event: Event) => {
      const clickedInsideDropdown = this.dropdownMenu.nativeElement.contains(event.target);
      const clickedInsideButton = this.elementRef.nativeElement.querySelector('#select-icon').contains(event.target);

      if (!clickedInsideDropdown && !clickedInsideButton) {
        this.seletorVisivel = false;
      }
      else
        !this.mostrarDropdown;
    });
  }

  mostrarDropdown() {
    this.seletorVisivel = !this.seletorVisivel;
  }
  ocultarDropdown() {
    this.seletorVisivel = false;
  }
}
