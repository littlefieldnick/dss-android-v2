import { NgModule } from "@angular/core";
import {HttpModule} from "@angular/http";
import {FieldworkerService} from "../services/fieldworker.service";

@NgModule({
  imports: [HttpModule],
  providers: [FieldworkerService]
})

export class PagesModule { }
