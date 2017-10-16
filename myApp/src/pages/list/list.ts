import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddressService } from './address.service';
import { IAddress } from './address';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [AddressService]
})
export class ListPage implements OnInit{
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  _listFilter: string;
  errorMessage: string;
  
  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredAddresses = this.listFilter ? this.performFilter(this.listFilter) : this.addresses;
  }

  filteredAddresses: IAddress[];
  addresses: IAddress[] = [  ];

  performFilter(filterBy: string): IAddress[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.addresses.filter((address: IAddress) =>
          address.streetName.toLocaleLowerCase().indexOf(filterBy) !== -1);
}


  constructor(public navCtrl: NavController, public navParams: NavParams, public _addressService: AddressService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit(): void {
    this._addressService.getAddresses()
            .subscribe(addresses => {
                this.addresses = addresses;
                this.filteredAddresses = this.addresses;
            },
                error => this.errorMessage = <any>error);
}



  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
