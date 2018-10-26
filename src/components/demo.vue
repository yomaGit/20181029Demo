<template>
  <div>

    <h1>测试Demo</h1>

    <button @click="testMin_m">点击调用mixin methods testMixin</button>

    <hr >

    <input type="text" v-autoFocus>

    <hr >

    <testRender :list="forTest"></testRender>

    <hr >

    <button v-stat="{type:'i am type',fun:'i am fun'}">点击调用埋点directive stat</button>

  </div>
</template>

<script>
  import {test,test1} from '../other/exports'
  import testd from '../other/exportDefault'

  import mixint from '../mixins/testM0'

  import autoFocus from '../directives/autoFocus'
  import stat from '../directives/stat'

  export default {
    name: "demo",
    mixins:[ mixint ],
    directives:{autoFocus,stat},
    components:{
      testRender: {
        props: ['list'],
        render(h) {
          let _this=this;
          return h('div',{
            'class': {
              foo: true,
              bar: false
            },
            style: {
              border:'1px solid red',
              textAlign:'left'
            },
            attrs: {
              id: 'foo'
            }
          },[
            h('ul',_this.list.map((v)=>{
              return h('li',`${v.name} ${v.age}`)
            }))
          ])
        }
      }
    },
    data() {
      return {
        forTest:[
          {
            name:'john',
            age:10
          },
          {
            name:'marry',
            age:11
          },
          {
            name:'xiaoming',
            age:12
          }
        ]
      }
    },
    methods:{
      init(){
        let _this=this;

        console.log('-----实例0 测试map、forEach、for遍历100000数组的时间-----');
        let arr = [], max = 100000;
        for (let i = 1; arr.push(i++) < max;);

        let mapArr = [],forEachArr = [],forArr = [];

        console.time('map');
        arr.map(function (val) {
          mapArr.push(val);
        })
        console.timeEnd('map');

        console.time('forEach');
        arr.forEach(function (val) {
          forEachArr.push(val);
        })
        console.timeEnd('forEach');

        console.time('for');
        for (let i = 0; i < arr.length; i++) {
          forArr.push(arr[i]);
        }
        console.timeEnd('for');

        console.log('-----end-----');

        console.log('-----实例1 map reduce-----');
        let priArr=[1,2,3,4,5],newArr=[],count=0;
        newArr=priArr.map((v)=>{
          return v*2;
        })

        count=priArr.reduce((total,v)=>{
          return total+v;
        })

        console.log(`原数组：${JSON.stringify(priArr)}`)
        console.log(`map:${JSON.stringify(newArr)}`);
        console.log(`reduce:${count}`);

        console.log('-----end-----');

        console.log('-----实例2 深拷贝和浅拷贝-----');

        let testObject={
          aval:{
            key:'xiaoming'
          }
        }
        console.log(`元对象key:${testObject.aval.key}`);

        let testObject_b=testObject;
        testObject.aval.key='xiaoming0';
        console.log(`testObject_b的key:${testObject_b.aval.key}`);

        testObject_b.aval.key='xiaoming2';
        console.log(`testObject的key:${testObject.aval.key}`);

        console.log('-----end-----');

        console.log('-----实例3 深拷贝实现-----');

        //- javascript实现 方式1
        function copy(arr){
          let obj=arr.constructor==Array ? [] : {};
          //第二种方法 var obj=arr instanceof Array?[]:{}
          for(let item in arr){
            if(typeof arr[item]==="object"){
              obj[item]=copy(arr[item]);
            }else{
              obj[item]=arr[item];
            }
          }
          return obj;
        }

        let testCopy_deep={
          key:{
            key:'xiaoming'
          },
          key_es:'xiaoming_es'
        }
        let testCopy_deep_n=copy(testCopy_deep);
        testCopy_deep.key.key='xiaoming1';
        console.log(`深拷贝testCopy_deep_n key:${testCopy_deep_n.key.key}`);

        //- javascript实现 方式2
        function copy1(arr){
          let narr=JSON.stringify(arr);
          return JSON.parse(narr);
        }
        let testCopy_deep_n1=copy1(testCopy_deep);
        testCopy_deep.key.key='xiaoming2';
        console.log(`深拷贝testCopy_deep_n1 key:${testCopy_deep_n1.key.key}`);

        console.log('-----end-----');

        console.log('-----实例4 es6 Object.assign-----');

        //- es6实现
        function copy2(arr) {
          return Object.assign({}, arr);
        }
        let testCopy_deep_n2=copy2(testCopy_deep);
        testCopy_deep.key.key='xiaoming3';
        testCopy_deep.key_es='xiaoming_es1';
        console.log(`深拷贝testCopy_deep_n2 key:${testCopy_deep_n2.key.key}`);
        console.log(`浅拷贝testCopy_deep_n2 key_es:${testCopy_deep_n2.key_es}`);

        console.log('-----end-----');

        console.log('-----实例5 javascript宏任务和微任务-----');

        setTimeout(function () {
          console.log(1);

          console.log('-----javascript宏任务和微任务 end-----');
          console.log('-----end-----');
        })

        new Promise(function(resolve,reject){
          console.log(2)
          resolve(3)
        }).then(function(val){
          console.log(val);
        })

        console.log(0);

        //- 上面存在异步，下面实例延时1ms
        setTimeout(()=>{

          console.log('-----实例6 let和const-----')

          var a = [];
          for (var i = 0; i < 10; i++) {
            a[i] = function () {
              console.log(i);
            }
          }
          a[6](); // 10

          for (let i = 0; i < 10; i++) {
            a[i] = function () {
              console.log(i);
            }
          }
          a[6](); // 6

          console.log('-----end-----')

          console.log('-----实例7 (){}和（)=>{ }）-----')

          let testObj={
            test(){
              console.log('(){}');
            }
          }

          let testFun=()=>{
            return '()=>{}';
          }

          testObj.test()
          console.log(testFun());

          console.log('vue单文件的data、methods、mounted简写');

          console.log('-----end-----')

          console.log('-----实例8 export和export default-----')

          console.log(test);
          console.log(test1);
          console.log(testd);

          console.log('-----end-----')

          console.log('-----实例9 find、findIndex、includes-----')

          let testArr_f = [
            'marry',
            'john',
            'xiaoming',
            'xiaoqi',
          ]

          console.log(testArr_f.indexOf('xiaoming'));
          console.log(testArr_f.includes('xiaoming'));

          let filter_v=testArr_f.filter((v)=>{
            console.log(v);
            return v=='john'
          })

          console.log('--')
          console.log(filter_v);
          console.log('----')

          let filter_f=testArr_f.find((v)=>{
            console.log(v);
            return v=='john'
          })

          console.log('--')
          console.log(filter_f);
          console.log('----')

          let filter_s=testArr_f.some((v)=>{
            console.log(v);
            return v=='john'
          })
          console.log('--')
          console.log(filter_s);

          console.log('-----end-----')

          console.log('-----实例10 async await-----')

          _this.testAsync()

        },1)

      },
      async testAsync(){
        await new Promise((resolve,reject)=>{
          setTimeout(()=>{
            resolve();
          },500)
        })
        console.log('i am async 1s')
        await new Promise((resolve,reject)=>{
          setTimeout(()=>{
            resolve();
          },500)
        })
        console.log('i am async 2s')
        console.log('-----end-----')
      },
      testMin_m(){
        this.testMixin();
      },

    },
    mounted(){
      this.init()
    }

  }
</script>

<style scoped>

</style>
