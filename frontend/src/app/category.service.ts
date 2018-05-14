//import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from './models/category';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {

  constructor(//private db: AngularFireDatabase
  ) { }

  getAll(): Observable<Category> {
    return JSON.parse('[{ "name" : "Clothes"  },{"name" : "Shoes"  },{"name" : "Watches"}]');
//    return this.db.list('/categories', {
//      query: {
//        orderByChild: 'name'
//      }
//    });
  }
}
