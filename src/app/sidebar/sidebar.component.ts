import { Component } from '@angular/core';
import { CompanyService } from '../service/company.service';
import { Company, CompanyRaw } from '../model/company';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    companiesRaw!: CompanyRaw[];
    companies!: Company[];
    
    constructor(private _companyService: CompanyService) {

    }

    ngOnInit() {
        this.getData();

    }

    getData() {

       this._companyService.getCompaniesRaw()
		.subscribe(companies => {
			this.companiesRaw = companies as CompanyRaw[];
			console.log('this.companiesRaw: ');
            console.log(this.companiesRaw );
		}) 

		 this._companyService.getCompaniesRaw().pipe( 
			switchMap(ret => {
				return this._companyService.getCompanies(ret);
			})
		)
		.subscribe(companies => {
			this.companies = companies as Company[];
            console.log('this.companies:');
            console.log(this.companies);
			 
		}) 
    }
}
