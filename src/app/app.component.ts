import {Component} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Todo {
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todoCollectionRef: AngularFirestoreCollection<Todo>;
  todo$: Observable<Todo[]>;
  description = '';
  isChecked = false;
  constructor(public db: AngularFirestore) {
    this.todoCollectionRef = this.db.collection<Todo>('todos');
    this.todo$ = this.todo$ = this.todoCollectionRef.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Todo;
        const id = action.payload.doc.id;
       // console.log('Todo data: ' + stringify(data));
        return {id, ...data};
      });
    }));

  }
    onSubmit() {
   // console.log('description:' + this.description + this.isChecked);

      // tslint:disable-next-line:only-arrow-functions
    this.db.collection<Todo>('todos').add({description: this.description, completed: this.isChecked}).then(function(docRef) {
     // console.log('Document written with ID: ', docRef.id);
    })
    // tslint:disable-next-line:only-arrow-functions
      .catch(function(error) {
       // console.error('Error adding document: ', error);
      });
    this.description = '';
    this.isChecked = false;
  }

  onUpdate() {
    /*const alovelaceDocumentRef = this.db.collection('todos').doc('7ucnl8Xnekr1zcVhsscB');
    console.log(`Path of document is ${alovelaceDocumentRef}`);*/
    console.log('On Update Invoked');

  }
}
