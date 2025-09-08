import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSummaryComponent } from './note-summary.component';

describe('NoteSummaryComponent', () => {
  let component: NoteSummaryComponent;
  let fixture: ComponentFixture<NoteSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
