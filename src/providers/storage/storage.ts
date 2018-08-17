import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {}

  public setKey(key : string, value : string){
    this.storage.set(key, JSON.stringify(value));
  }

  public getKey (key: string) : any {
    this.storage.get(key).then
    (
      (val) => {
        return val;
      }
    )
    .catch
    (
      (err) => {
        console.error(err);
        return null;
      }
    )
  }

  public getJsonByKey (key: string) : any {
    return JSON.parse(this.getKey(key));
  }
}
