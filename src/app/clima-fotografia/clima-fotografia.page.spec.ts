import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClimaFotografiaPage } from './clima-fotografia.page';

describe('ClimaFotografiaPage', () => {
  let component: ClimaFotografiaPage;
  let fixture: ComponentFixture<ClimaFotografiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimaFotografiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
