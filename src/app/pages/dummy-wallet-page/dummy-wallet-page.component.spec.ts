import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyWalletPageComponent } from './dummy-wallet-page.component';

describe('DummyWalletPageComponent', () => {
  let component: DummyWalletPageComponent;
  let fixture: ComponentFixture<DummyWalletPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyWalletPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyWalletPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
