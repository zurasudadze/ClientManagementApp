import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomLanguageValidator} from "../../shared/validators/language.validator";
import {slideInAnimation} from "../animations/animations";
import {ClientsService} from "../../services/clients.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "../../models/types";
import {filter, mergeMap} from "rxjs/operators";
import {CustomUniqueNumberValidator} from "../../shared/validators/uniqueNumber.validator";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
  animations: [slideInAnimation]
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;
  imageName = ''
  isAddMode: boolean = true;
  id: string;
  clients: Client[];
  accountNumbersArr: number[] = [];

  constructor(private clientsService: ClientsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.clientsService.getClients$().subscribe(data =>{
      this.clients = data;
      this.clients.map(client => {
        client.account.map(acc => {
          this.accountNumbersArr.push(acc.accountNumber)
        })
      })
    })
    this.activatedRoute.params.pipe(
      filter(({id}) => Boolean(id)),
      mergeMap(({id}) => {
        if (id) {
          this.isAddMode = false
        }
        this.id = id
        return this.clientsService.getClient$(id);
      })
    ).subscribe(client => this.editClient(client))

    this.clientForm = new FormGroup({
      'name': new FormControl(null, [
        Validators.required,
        CustomLanguageValidator,
        Validators.pattern(/^[a-zA-Z-ა-ჰ]+$/),
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      'lastName': new FormControl(null, [
        Validators.required,
        CustomLanguageValidator,
        Validators.pattern(/^[a-zA-Z-ა-ჰ]+$/),
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      'gender': new FormControl('male', [
        Validators.required
      ]),
      'personalNumber': new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
      'phoneNumber': new FormControl('5', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(9),
        Validators.maxLength(9)
      ]),
      'image': new FormControl(''),
      'legalAddress': new FormGroup({
        'country': new FormControl('', [Validators.required]),
        'city': new FormControl('', [Validators.required]),
        'address': new FormControl('', [Validators.required]),
      }),
      'actualAddress': new FormGroup({
        'country': new FormControl('', [Validators.required]),
        'city': new FormControl('', [Validators.required]),
        'address': new FormControl('', [Validators.required]),
      }),
      'account': new FormArray([
        new FormGroup({
          accountNumber: new FormControl('', [Validators.required, CustomUniqueNumberValidator(this.accountNumbersArr)]),
          accountType: new FormControl('', [Validators.required]),
          currency: new FormControl('', [Validators.required]),
          accountStatus: new FormControl('', [Validators.required]),
        })
      ])
    })
  }

  editClient(client: Client) {
    this.clientForm?.patchValue({
      'name': client.name,
      'lastName': client.lastName,
      'gender': client.gender,
      'image': client.image,
      'phoneNumber': client.phoneNumber,
      'personalNumber': client.personalNumber,
      'legalAddress': client.legalAddress,
      'actualAddress': client.actualAddress,
    });

    (this.clientForm?.get('account') as FormArray).clear();
    client.account.forEach(acc => {
      (this.clientForm?.get('account') as FormArray).push(
        new FormGroup({
          accountNumber: new FormControl(acc.accountNumber, [Validators.required, CustomUniqueNumberValidator(this.accountNumbersArr)]),
          accountType: new FormControl(acc.accountType, [Validators.required]),
          currency: new FormControl(acc.currency, [Validators.required]),
          accountStatus: new FormControl(acc.accountStatus, [Validators.required]),
        })
      )
    })
  }

  addAccounts() {
    (this.clientForm.get('account') as FormArray).push(
      new FormGroup({
        accountNumber: new FormControl('', [Validators.required, CustomUniqueNumberValidator(this.accountNumbersArr)]),
        accountType: new FormControl('', [Validators.required]),
        currency: new FormControl('', [Validators.required]),
        accountStatus: new FormControl('', [Validators.required]),
      })
    );
  }

  removeAccount(index: number) {
    (this.clientForm.get('account') as FormArray).removeAt(index);
  }

  onImageUploaded(imgInfo: any) {
    this.clientForm.get('image')?.setValue(imgInfo.base64Img);
    this.imageName = imgInfo.name;
  }


  onSubmit() {
    if (this.isAddMode) {
      this.addClient()
    } else {
      this.updateClient()
    }
  }

  addClient() {
    this.clientsService.addClient$(this.clientForm.value).subscribe(() => {
      this.clientsService.getClients$().subscribe(() => {
        this.router.navigate(['/clients'])
      })
    })
  }

  updateClient() {
    this.clientsService.updateClient$(this.id, this.clientForm.value)
      .pipe(
        mergeMap(() => {
          return this.clientsService.getClients$()
        })
      ).subscribe(() => {
      this.router.navigate(['/clients'])
    })
  }

  get nameControl() {
    return this.clientForm.get('name')
  }

  get lastNameControl() {
    return this.clientForm.get('lastName')
  }

  get personalNumberControl() {
    return this.clientForm.get('personalNumber');
  }

  get phoneNumberControl() {
    return this.clientForm.get('phoneNumber')
  }

  get imageControl() {
    return this.clientForm.get('image')
  }

  get legalAddressCountryControl() {
    return this.clientForm.get('legalAddress')?.get('country')
  }

  get legalAddressCityControl() {
    return this.clientForm.get('legalAddress')?.get('city')
  }

  get legalAddressAddressControl() {
    return this.clientForm.get('legalAddress')?.get('address')
  }

  get actualAddressCountryControl() {
    return this.clientForm.get('actualAddress')?.get('country')
  }

  get actualAddressCityControl() {
    return this.clientForm.get('actualAddress')?.get('city')
  }

  get actualAddressAddressControl() {
    return this.clientForm.get('actualAddress')?.get('address')
  }

  get accountControl() {
    return this.clientForm.get('account') as FormArray
  }

  getAccountNumberControl(i: any) {
    return (<FormArray>this.clientForm.get('account')).controls[i]?.get('accountNumber')?.value
  }
}
