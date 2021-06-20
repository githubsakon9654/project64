import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { GridComponent } from './grid/grid.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { TablelistComponent } from './tablelist/tablelist.component';
import { DurablelistComponent } from './durablelist/durablelist.component';
import { SupplielistComponent } from './supplielist/supplielist.component';
import { RevealComponent} from './reveal/reveal.component';
import { BorrowDurableComponent } from './borrow-durable/borrow-durable.component';
import { FromComponent } from './from/from.component';
import { RegisterComponent } from './register/register.component';
import { UserlistComponent } from './userlist/userlist.component';
import { BuyComponent } from './buy/buy.component';
import { RevelListComponent} from './revel-list/revel-list.component'
import { BorrowListComponent } from './borrow-list/borrow-list.component';
import { DurableReturnComponent } from './durable-return/durable-return.component';
import { DurableOwnComponent } from './durable-own/durable-own.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { HomepageComponent } from './homepage/homepage.component';


export const MaterialRoutes: Routes = [
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'reveal',
    component: RevelListComponent
  },
  {
    path: 'owndurable',
    component: DurableOwnComponent
  },
  {
    path: 'supplie',
    component: SupplielistComponent
  },
  {
    path: 'durable',
    component: DurablelistComponent
  },
  {
    path: 'return',
    component: DurableReturnComponent
  },
  {
    path: 'bor-durable',
    component: BorrowListComponent
  },
  {
    path: 'from',
    component: FromComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'stepper',
    component: StepperComponent
  },
  {
    path: 'expansion',
    component: ExpansionComponent
  },
  {
    path: 'chips',
    component: ChipsComponent
  },
  {
    path: 'toolbar',
    component: ToolbarComponent
  },
  {
    path: 'progress-snipper',
    component: ProgressSnipperComponent
  },
  {
    path: 'progress',
    component: ProgressComponent
  },
  {
    path: 'dialog',
    component: DialogComponent
  },
  {
    path: 'tooltip',
    component: TooltipComponent
  },
  {
    path: 'snackbar',
    component: SnackbarComponent
  },
  {
    path: 'slider',
    component: SliderComponent
  },
  {
    path: 'userlist',
    component: UserlistComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },{
    path: 'buy',
    component: BuyComponent
  }
];
