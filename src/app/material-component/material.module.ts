import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
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
import {
  DialogComponent,
  DialogOverviewExampleDialogComponent
} from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { TablelistComponent } from './tablelist/tablelist.component';
import { SupplielistComponent,SupplieInsertComponent ,SupplieDeleteComponent,SupplieUpdateComponent} from './supplielist/supplielist.component';
import { DurablelistComponent } from './durablelist/durablelist.component';
import { RevealComponent } from './reveal/reveal.component';
import { RevealDialogComponent } from './reveal/dialog/reveal-dialog/reveal-dialog.component';
import { BorrowDurableComponent } from './borrow-durable/borrow-durable.component';
import { DialogBorComponent } from './dialog-bor/dialog-bor.component';
import { FromComponent } from './from/from.component';
import { FromDialogComponent } from './from/dialog/from-dialog/from-dialog.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { BuyComponent } from './buy/buy.component';
import { BuyformComponent } from './buy/buyDialog/buyform/buyform.component';
import { BuyDetailComponent } from './buy/buyDialog/buy-detail/buy-detail.component';
import { RevelListComponent } from './revel-list/revel-list.component';
import { RevealDetailComponent } from './reveal/dialog/reveal-detail/reveal-detail.component';
import { FromDetailComponent } from './from/dialog/from-detail/from-detail.component';
import { UserDeleteComponent ,UserResetComponent} from './user-detail/dialog/user-delete/user-delete.component';
import { InsertDurableComponent,UpdateDurableComponent,DeleteDurableComponent } from './durablelist/dialog/insert-durable/insert-durable.component';
import { BorrowListComponent } from './borrow-list/borrow-list.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  entryComponents: [DialogOverviewExampleDialogComponent],
  declarations: [
    ButtonsComponent,
    GridComponent,
    ListsComponent,
    UpdateDurableComponent,
    MenuComponent,
    DeleteDurableComponent,
    TabsComponent,
    StepperComponent,
    ExpansionComponent,
    ChipsComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    ProgressComponent,
    DialogComponent,
    DialogOverviewExampleDialogComponent,
    TooltipComponent,
    SnackbarComponent,
    SliderComponent,
    UserResetComponent,
    SupplieInsertComponent,
    SupplieDeleteComponent,
    SupplieUpdateComponent,
    SlideToggleComponent,
    TablelistComponent,
    SupplielistComponent,
    DurablelistComponent,
    RevealComponent,
    RevealDialogComponent,
    BorrowDurableComponent,
    DialogBorComponent,
    FromComponent,
    FromDialogComponent,
    UserlistComponent,
    UserDetailComponent,
    BuyComponent,
    BuyformComponent,
    BuyDetailComponent,
    RevelListComponent,
    RevealDetailComponent,
    FromDetailComponent,
    UserDeleteComponent,
    InsertDurableComponent,
    BorrowListComponent
  ]
})
export class MaterialComponentsModule {}
