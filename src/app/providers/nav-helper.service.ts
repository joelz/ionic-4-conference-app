// 部分代码参考自这里：
// [Pop Multiple Pages in Ionic 4 | Damir's Corner]
// (https://www.damirscorner.com/blog/posts/20191220-PopMultiplePagesInIonic4.html)
// 
// 既然navigate時沒有destroy，那就應該存在一個stack來存放這些頁面，只要想辦法找到stack中的上一個頁面就好了
// stackCtrl存放在ion-router-outlet中，而要获得ion-router-outlet的引用，只能在AppComponent中写，
// 其他page要拿到这个引用，还是要通过services来共享，这样做还不如直接在list和detail上共享一个service来放callback的引用
// 找ion-router-outlet还有另一个问题：如果app中ion-tab，ion-tab有自己的ion-router-outlet，和AppComponent中的ion-router-outlet
// 不是同一个。要获取ion-tab中的ion-router-outlet，暂时没找到方法。
import { Injectable } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NavHelperService {
  routerOutlet: IonRouterOutlet;

  constructor() { }

  async popToRoot() {
    if (!this.routerOutlet) {
      throw new Error('IonRouterOutlet not initialized.');
    }

    const stackCtrl = (this.routerOutlet as any).stackCtrl;
    const stackId = this.routerOutlet.getActiveStackId();
    const depth = stackCtrl.getStack(stackId).length;
    if (depth > 1) {
      this.routerOutlet.pop(depth - 1, stackId);
    }
  }

  public showRouterOutletInfo() {
    console.log(this.routerOutlet);
  }
}