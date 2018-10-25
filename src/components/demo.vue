<template>
  <div>
    <h1>测试Demo</h1>

  </div>
</template>

<script>
  export default {
    name: "demo",
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
        })

        new Promise(function(resolve,reject){
          console.log(2)
          resolve(3)
        }).then(function(val){
          console.log(val);
        })

        console.log(0);

        console.log('-----end-----');



      }
    },
    mounted(){
      this.init()
    }

  }
</script>

<style scoped>

</style>
