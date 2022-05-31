<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Главная страница
        </q-toolbar-title>
        <div>Выбор лабораторной работы</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div style="padding: 20px">
        <router-link to="/lab2">
          <h6>Лабораторная работа 2</h6>
        </router-link>
        <router-link to="/lab3">
          <h6>Лабораторная работа 3</h6>
        </router-link>
      </div>

    </q-page-container>
  </q-layout>
<!--  <q-layout view="lHh Lpr lFf">-->
<!--    <q-header elevated>-->
<!--      <q-toolbar>-->
<!--        <q-toolbar-title>-->
<!--          Моделирование работы ДКА-->
<!--        </q-toolbar-title>-->
<!--        <div>Лабораторная работа 2</div>-->
<!--      </q-toolbar>-->
<!--    </q-header>-->

<!--    <q-page-container>-->
<!--      <div class="row">-->
<!--        <div v-for="inp in inputs" :key="inp" class="col" style="padding: 20px">-->
<!--          <q-input v-model="inp.value" v-on:keyup.enter="addInput" autofocus label="Введите элемент алфавита">-->
<!--            <template v-slot:append >-->
<!--              <q-icon name="delete" disabled="inputs.indexOf(inp) == 0" v-if="inputs.indexOf(inp) == 0" class="cursor-pointer"/>-->
<!--              <q-icon name="delete" v-if="inputs.indexOf(inp) !== 0" @click="inputs.splice(inputs.indexOf(inp),1)" class="cursor-pointer"/>-->
<!--            </template>-->
<!--          </q-input>-->
<!--        </div>-->
<!--      </div>-->
<!--      <q-btn @click="check" flat class="full-width" style="padding: 10px" label="Проверить"/>-->

<!--      <q-card v-if="end" class="my-card bg-positive text-white text-center">-->
<!--        <q-card-section>-->
<!--          <div class="text-h6" >Цепочка принадлежит исходной грамматике</div>-->
<!--        </q-card-section>-->
<!--      </q-card>-->
<!--      <q-card v-if="error" class="my-card bg-negative text-white text-center">-->
<!--        <q-card-section>-->
<!--          <div class="text-h6" >Цепочка не принадлежит исходной грамматике</div>-->
<!--          <div class="text-subtitle2">Отсутствует путь по указанной цепочке</div>-->
<!--        </q-card-section>-->
<!--      </q-card>-->
<!--      <q-card v-if="error2" class="my-card bg-negative text-white text-center">-->
<!--        <q-card-section>-->
<!--          <div class="text-h6" >Цепочка не принадлежит исходной грамматике</div>-->
<!--          <div class="text-subtitle2">Автомат не пришёл в конечное значение</div>-->
<!--        </q-card-section>-->
<!--      </q-card>-->
<!--      <div class="col-12 text-center self-center" style="padding: 10px">-->
<!--        <q-img-->
<!--          width="40%"-->
<!--          src="~assets/graph.png"-->
<!--        />-->
<!--      </div>-->

<!--    </q-page-container>-->
<!--  </q-layout>-->
</template>

<script>
import { defineComponent, ref } from 'vue'



export default defineComponent({
  name: 'MainLayout',
  data: () => ({
    end: false,
    error: false,
    error2: false,
    inputs: [
      {value: null}
    ],
    // pathArray: ['(','*','{','a','*',')'],
    pathArray: [],
    path: {
      H: {
        name: 'H',
        isFinish: false,
        next: {
          '{': 'K',
          '(': 'C1'
        }
      },

      C1: {
        name: 'C1',
        isFinish: false,
        next: {
          '*': 'C'
        }
      },

      K: {
        name: 'K',
        isFinish: false,
        next: {
          'a': 'K',
          '(': 'K',
          '*': 'K',
          ')': 'K',
          '{': 'K',
          '}': 'S'
        }
      },

      C: {
        name: 'C',
        isFinish: false,
        next: {
          'a': 'C',
          '(': 'C',
          ')': 'C',
          '{': 'C',
          '}': 'C',
          '*': 'S1',
        }
      },

      S1: {
        name: 'S1',
        isFinish: false,
        next: {
          ')': 'S'
        }
      },
      S: {
        name: 'S',
        isFinish: true,
        next: {}
      }
    },
    current: null

  }),
  methods: {
    input(symbol){
      if (!this.current.next[symbol]) {
        console.log('Ошибка')
        this.error = true;
        this.error2 = false;
        this.end = false;
      }
      this.current = this.path[this.current.next[symbol]];
      console.log(this.current);
    },
    async start(){
      this.current = this.path.H;
      this.pathArray.forEach(element => {
        this.input(element);
      })
      if (this.current.isFinish) {
        console.log('Принадлежит')
        this.end = true;
        this.error = false;
        this.error2 = false;
      }
    },
    test(){
      if(this.end == false && this.error == false) {this.error2 = true; this.pathArray = []}
    },
    addInput(){
      this.inputs.push({value: null});
    },
    check(){
      this.pathArray = []
      for (var i = 0; i <= this.inputs.length - 1; i++) {
        this.pathArray.push(this.inputs[i].value)
      }
      console.log(this.pathArray)
      this.start().then(this.test);
    }
  },
  mounted() {

    // this.start();
  }

})
</script>
