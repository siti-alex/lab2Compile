<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title @click="toHome">
          Генерация цепочек языка
        </q-toolbar-title>
        <div>Лабораторная работа 1</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div v-for="element in outFront" :key="element" class="out">
        <p v-if="outFront.indexOf(element)!== outFront.length-1">
          {{element}}=>
        </p>
        <p v-if="outFront.indexOf(element) === outFront.length-1">
          {{element}}
        </p>
      </div>

    </q-page-container>
  </q-layout>
</template>

<script>
export default {
name: "LabOne",
  data: () => ({
    language: ['(',')'],
    input: '((()))(())()',
    start: 's',
    out: [],
    outFront: [],
    success: false,
  }),
  methods: {
    generate(){
      this.validate();
      this.analyse();
    },
    validate(){
      let struct = this.input.split('');
      let a = 0
      struct.forEach(element => {
        if(element === '(') {
            a++
        }
        if(element === ')') {
            a--
        }
      })
      if(a === 0){
        this.success = true;
      }
      else {
        this.success = false;
      }
    },
    analyse(){
      if(this.success){
        let struct = this.input.split('');
        let a = 0
        let b = ''
        let test = []
        struct.forEach(element => {
          if(element === '(') {
            a++
            b+=element
          }
          if(element === ')') {
            a--
            b+=element
          }
          if(a === 0) {
            test.push(b)
            b = ''
          }
        })
        let xz = []
        let xz2 = ''
        let xz3 = []
        let xz4 = []
        test.forEach(element => {
          while(this.start.replace('s','') !== element){
            this.start = this.start.replace('s','(s)')
            // console.log(this.start)
            // xz.push(this.start)

            if(test.indexOf(element) === 0){
              xz.push(this.start)
            }
            else {
              // xz3 = this.start.replace('s','')
              xz.push(xz2+this.start)
            }

          }

          // this.out.push(this.start.replace('s',''))
          this.start = 's'
          // console.log(xz.join())
          // xz2 += xz.join()
          // xz3.push(xz2)
          // xz = []
          // console.log(xz3)
          // xz.push('щёлк')
          xz.forEach(el => {
            if(xz.indexOf(el) === xz.length-1){
              xz2 = el.replace('s','')
            }
          })
          // xz.push(xz2)
          // console.log(xz)
          this.outFront = xz;

        })
        this.outFront.unshift('s')
        this.outFront.push(this.outFront[this.outFront.length-1].replace('s',''))
        console.log(this.outFront)
        // this.out.forEach(element => {
        //   this.outFront += element
        // })
        // console.log(this.outFront)
      }

    },
    toHome(){
      location.href = `/`;
    }
  },
  mounted() {
  this.generate()
  }
}
</script>

<style scoped>
.out {
  float: left; /*Задаем обтекание*/
  /*line-height: 120px;!*Высота строки +  верт. центрирования текста*!*/
  font-size: 40px;
  /*color: white;*/
  /*margin-top: 60px;*/
  /*width: 320px; !*Фиксируем ширину блока*!*/
  /*margin-right: 10px;*/
  text-align: center; /*Центрируем текст по горизонтали*/
}
</style>
