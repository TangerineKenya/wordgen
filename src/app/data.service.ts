import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  db: any;
  remote: any;
  loggedIn = false;

  constructor() {
    this.initDB();
  }

  async initDB(){
    this.db = new PouchDB('http://admin:admin@localhost:5984/tusome_logstash');
    
    this.db.info().then(function (result) {
      //console.log(result);
    }).catch(function (err) {
       console.log('Local database cannot be reached!', err);
    });
    /*let options = {
      live: false,
      retry: true,
      continuous: true
    };*/
    return this.db;
  }

  //search
  search(view, key){
    return this.db.query(view, {
        startkey: key,
        endkey: key+'\uffff',
        sort: [{key: 'asc'}], 
        include_docs: true
      });
  }
  //query
  query(view, key){
    return this.db.query(view, {
        key: key,
        sort: [{key: 'asc'}], 
        include_docs: true
      });
  }
  list(view){
    return this.db.query(view, {
        //key: key,
        include_docs: true
      });
  }
  //get
  async getDocument(doc){
    return this.db.get(doc);
  }
  //put
  addDocument(doc){
    return this.db.put(doc);
  }
}
