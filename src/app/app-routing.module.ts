import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddContentComponent } from './components/add-content/add-content.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'add-category', component: AddCategoryComponent, canActivate: [AuthGuard] },
  { path: 'add-content', component: AddContentComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
