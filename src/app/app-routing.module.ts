import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { PatientlistComponent } from "./patient/patientlist.component";
import { PatientComponent } from "./patient/patient.component";
import { LoginComponent } from "./user/login/login.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "patient", component: PatientlistComponent },
  { path: "patient/:patienid", component: PatientComponent },
  { path: "", component: HomeComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
