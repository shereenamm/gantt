import { Injectable } from '@angular/core';
import { Link } from './models/link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() { }
  get(): Promise<Link[]> {
    return Promise.resolve([
        {id: 1, source: 1, target: 2, type: "0"},
        {id: 4, source: 3, target: 5, type: "0"}
    ] as Link[]);
}
}
