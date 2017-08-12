import { ProverbsProvider } from './../../providers/proverbs/proverbs';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-sayings',
  templateUrl: 'sayings.html',
})
export class SayingsPage {
  @ViewChild(Slides) slides: Slides;
  title : string = "أقوال"
  proverbs : any[] = []
  data : any[] = []
  index : number
  currentActive : number
  item : any = {text : "" , author : ""}

  firstLoad = true;

  constructor(public navCtrl : NavController, 
              public navParams : NavParams, 
              private provProvider : ProverbsProvider,
              private viewCtrl : ViewController) {
    
    this.provProvider.getData("sayings").subscribe(res => {
      this.proverbs = res.json().items
      this.proverbs = this.shuffleArray(this.proverbs)
      console.table(this.proverbs)

      console.table(this.proverbs)

      this.index = 0;

      this.item = this.proverbs[this.index]


    })

    // this.proverbs = [  
    //     {  
    //         "text":"الثقافة هي ما يبقى بعد أن تنسى كل ما تعلمته في المدرسة.",
    //         "author":"آينشتاين"
    //     },
    //     {  
    //         "text":"لا راحة لمن تعجل الراحة بكسله.",
    //         "author":"سقراط"
    //     },
    //     {  
    //         "text":"خلق الله لنا أذنين ولساناً واحداً .. لنسمع أكثر مما نقول !",
    //         "author":"سقراط"
    //     },
    //     {  
    //         "text":"أين يتواجد الحب تتواجد الحياة.",
    //         "author":"غاندي"
    //     },
    //     {  
    //         "text":"أنا مستعد لان أموت، ولكن ليس هنالك أي داعي لأكون مستعدا للقتل.",
    //         "author":"غاندي"
    //     },
    //     {  
    //         "text":"دائماً هناك طريقة أفضل.",
    //         "author":"أديسون"
    //     },
    //     {  
    //         "text":"كن شجاعاً! تحلى بالايمان! وانطلق.",
    //         "author":"أديسون"
    //     },
    //     {  
    //         "text":"لكي تخترع انت بحاجة الى مخيلة جيدة وكومة خردة.",
    //         "author":"أديسون"
    //     }]

    //   this.proverbs = this.shuffleArray(this.proverbs)
    //   console.table(this.proverbs)

    //   let i = 0
    //   this.proverbs.forEach(element => {
    //     element['index'] = i++
    //   });
      
    //   this.index = 0;

    //   this.item = this.proverbs[this.index]
      
      

  }


  ionViewDidLoad() {
    //

  }

  loadPrev1() {
    this.currentActive = (this.currentActive + 2) % 3


        console.log('Prev1');

        let x = this.data[this.currentActive].index - 1
        if(x == -1)
          x = this.proverbs.length - 1
        this.data[(this.currentActive + 2) % 3] = this.proverbs[x]

        
      
      this.slides.slideTo(this.currentActive, 0, false);
      console.table(this.data);
    }

    loadNext1() {
        // if(this.firstLoad) {
        //   // Since the initial slide is 1, prevent the first 
        //   // movement to modify the slides
        //   this.firstLoad = false;
        //   return;
        // }
        let tmp = this.slides.getActiveIndex()
        this.currentActive += 1
        this.currentActive = this.currentActive % 3


        console.log('Next');

        
        let x = (this.data[this.currentActive].index + 1 ) % this.proverbs.length
        this.data[(this.currentActive + 4) % 3] = this.proverbs[x]

        console.table(this.data);
        this.slides.slideTo(this.currentActive + 1, 0, false);
        
        console.log("was in: " + tmp + " moved to: " + this.slides.getActiveIndex())
        
        
    }




  loadPrev() {
        console.log('Prev');
        console.log('Active : ' + this.slides.getActiveIndex());
        let newIndex = this.slides.getActiveIndex();

        newIndex++;
        let x = this.data[0].index - 1
        if(x == -1)
          x = this.proverbs.length - 1
        this.data.unshift(this.proverbs[x]);
        this.data.pop();

        // Workaround to make it work: breaks the animation
        this.slides.slideTo(newIndex, 0, false);

        console.table(this.data);
    }

    loadNext() {
        if(this.firstLoad) {
          // Since the initial slide is 1, prevent the first 
          // movement to modify the slides
          this.firstLoad = false;
          return;
        }

        console.log('Next');
        console.log('Active : ' + this.slides.getActiveIndex());
        let newIndex = this.slides.getActiveIndex();

        newIndex--;
        let x = (this.data[this.data.length - 1].index + 1 ) % this.proverbs.length
        this.data.push(this.proverbs[x]);
        this.data.shift();

        // Workaround to make it work: breaks the animation
        this.slides.slideTo(newIndex, 0, false);

        console.table(this.data);
    }


    next(){
      console.log("next")
      this.index = (this.index + 1) % this.proverbs.length

      this.item = this.proverbs[this.index]
    }

    prev(){
      console.log("prev")
      this.index = this.index - 1
      if(this.index < 0){
        this.index = this.proverbs.length - 1
      }

      this.item = this.proverbs[this.index]
    }

    random(){
      console.log("random")
      this.index = Math.floor(Math.random()*this.proverbs.length)
      this.item = this.proverbs[this.index]
    }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

}
