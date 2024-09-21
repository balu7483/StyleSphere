import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraddComponent } from './useradd.component';

describe('UseraddComponent', () => {
  let component: UseraddComponent;
  let fixture: ComponentFixture<UseraddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UseraddComponent]
    });
    fixture = TestBed.createComponent(UseraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
