import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company, CompanyRaw, CompanyTemp, Department } from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

    apiUrl = 'http://localhost:3000/companies/';
    allCompaniesRaw!: Observable<any[]>;
    allCompanies: Company[] = [];
    tempCompanies: CompanyTemp[] = [];

    constructor(private _http: HttpClient) { }

    getCompaniesRaw(): Observable<any[]> {
		console.log('getCompaniesRaw triggered')
        this.allCompaniesRaw = this._http.get(this.apiUrl) as Observable<CompanyRaw[]> ; ;

        return this.allCompaniesRaw;
    }

    getCompanies(companiesRaw: CompanyRaw[]): Observable<any[]> {
		console.log('getCompanies triggered');
        console.log('companiesRaw: ');
        console.log(companiesRaw);
 
        companiesRaw.forEach(company => {
            let splitedCompany = company.name.split('/');

             
            let tempCompany: CompanyTemp = { name: splitedCompany[0], items: splitedCompany[1]}

            this.tempCompanies.push(tempCompany); 
            
        })

        this.tempCompanies.forEach(company => {
            console.log('tempCompanies company:');
            console.log(company);
            let hasCompany!: Company;
            let companyName = company.name;
            let companyItems = company.items;
   
            
            console.log('hasCompany:');
            console.log(hasCompany);

            if(this.allCompanies && this.allCompanies.length > 0) {
                let foundCompany =  this.allCompanies.find(company => company.name == companyName )
                //let company: Company = { name: hasCompany.name, items: hasCompany.items } 

                /* if(foundCompany) {
                    foundCompany.items.push()
                }
                this.allCompanies.push(company); */
            }
            else {
                let newCompany: Company = { name: companyName, items: companyItems} 
                this.allCompanies.push(newCompany);
            } 
        })

        //console.log('tempCompanies:');
       // console.log(this.tempCompanies);

        return of(this.allCompanies);
    }
    
}
