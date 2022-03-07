import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./in-development/in-development.module').then(
        (m) => m.InDevelopmentModule
      ),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./pages/news/news.module').then((m) => m.NewsModule),
  },
  {
    path: 'applications/main-team',
    loadChildren: () =>
      import('./pages/application-main-team/application-main-team.module').then(
        (m) => m.ApplicationMainTeamModule
      ),
  },
  {
    path: 'applications/team',
    loadChildren: () =>
      import('./pages/application-team/application-team.module').then(
        (m) => m.ApplicationTeamModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
