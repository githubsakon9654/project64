import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';
import {MatTreeModule} from '@angular/material/tree';
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
import { SupplielistComponent,SupplieInsertComponent ,SupplieDeleteComponent,SupplieUpdateComponent, SupplieInputComponent} from './supplielist/supplielist.component';
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
import { InsertDurableComponent,UpdateDurableComponent,DeleteDurableComponent,SetnullDurableComponent } from './durablelist/dialog/insert-durable/insert-durable.component';
import { BorrowListComponent } from './borrow-list/borrow-list.component';
import { BorrowDetailComponent } from './borrow-detail/borrow-detail.component';
import { DurableReturnComponent } from './durable-return/durable-return.component';
import { ReturnFormComponent } from './durable-return/dialog/return-form/return-form.component';
import { DurableComponent } from './durable-return/dialog/durable/durable.component';
import { ReturnDetailComponent } from './durable-return/dialog/return-detail/return-detail.component';
import { DurableOwnComponent } from './durable-own/durable-own.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './profile/dialog/password/password.component';
import { UnitOfferComponent } from './from/dialog/unit-offer/unit-offer.component';
import { DurableRepairComponent } from './durable-repair/durable-repair.component';
import { InsertRepairComponent } from './durable-repair/dialog/insert-repair/insert-repair.component';
import { BudgetComponent } from './user-detail/dialog/budget/budget.component';
import { BuyCommentComponent } from './buy/buyDialog/buy-comment/buy-comment.component';
import { RepairListComponent } from './durablelist/dialog/repair-list/repair-list.component';
import { ReportComponent } from './report/report.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StoreComponent } from './supplielist/store/store.component';
import { ListhistoryComponent } from './supplielist/listhistory/listhistory.component';
import { DuReportComponent } from './report/du-report/du-report.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    MatTreeModule
  ],
  providers: [],
  entryComponents: [DialogOverviewExampleDialogComponent],
  declarations: [
    ButtonsComponent,
    GridComponent,
    ListsComponent,
    SupplieInputComponent,
    UpdateDurableComponent,
    MenuComponent,
    SetnullDurableComponent,
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
    BorrowListComponent,
    BorrowDetailComponent,
    DurableReturnComponent,
    ReturnFormComponent,
    DurableComponent,
    ReturnDetailComponent,
    DurableOwnComponent,
    ProfileComponent,
    PasswordComponent,
    UnitOfferComponent,
    DurableRepairComponent,
    InsertRepairComponent,
    BudgetComponent,
    BuyCommentComponent,
    RepairListComponent,
    ReportComponent,
    HomepageComponent,
    StoreComponent,
    ListhistoryComponent,
    DuReportComponent
  ]
})
export class MaterialComponentsModule {}
