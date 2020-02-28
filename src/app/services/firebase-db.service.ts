import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { Task } from '../model/Task';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDBService {

  private taskCollection:AngularFirestoreCollection<Task>;
  private tasks: Observable<Task[]>;
  constructor(private db: AngularFirestore) { }


  async setProfile(profile:string){
    this.taskCollection=this.db.collection<Task>(profile);
    this.tasks=this.taskCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    );
  }

  async getTasks(profile:string):Promise<Observable<Task[]>> {
    await this.setProfile(profile);
    return this.tasks;
  }
  async getTask(id,profile:string):Promise<Observable<Task>> {
    await this.setProfile(profile);
    return this.taskCollection.doc<Task>(id).valueChanges();
  }
  async updateTask(task: Task, id: string,profile:string):Promise<void> {
    await this.setProfile(profile);
    return this.taskCollection.doc(id).update(task);
  }
  async addTask(task: Task,profile:string):Promise<DocumentReference> {
    await this.setProfile(profile);
    return this.taskCollection.add(task);
  }
  async removeTask(id,profile:string):Promise<void> {
    await this.setProfile(profile);
    return this.taskCollection.doc(id).delete();
  }

}
