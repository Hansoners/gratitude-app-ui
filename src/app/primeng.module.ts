import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OrderListModule } from 'primeng/orderlist';
import { PasswordModule } from 'primeng/password';
import { ListboxModule } from 'primeng/listbox';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
    imports: [
        TableModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        CardModule,
        InputTextareaModule,
        AccordionModule,
        ToastModule,
        ToolbarModule,
        ProgressSpinnerModule,
        OrderListModule,
        ListboxModule,
        PasswordModule,
        ConfirmDialogModule
    ],
    exports: [
        TableModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        CardModule,
        InputTextareaModule,
        AccordionModule,
        ToastModule,
        ToolbarModule,
        ProgressSpinnerModule,
        OrderListModule,
        ListboxModule,
        PasswordModule,
        ConfirmDialogModule
    ]
})
export class PrimeNgModule { }
