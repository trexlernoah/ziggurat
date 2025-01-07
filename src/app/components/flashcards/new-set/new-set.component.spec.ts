import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSetComponent } from './new-set.component';

describe('NewSetComponent', () => {
  let component: NewSetComponent;
  let fixture: ComponentFixture<NewSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
