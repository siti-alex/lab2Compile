<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title @click="toHome">
          Лексический анализатор
        </q-toolbar-title>
        <div>Лабораторная работа 3</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div style="width: 40%; margin: auto">
        <q-input v-model="program" label="Введите условный оператор" placeholder="Ожидается ввод" hint="Конструкция: if <условие> then <оператор> else <оператор> end" style="padding: 20px;"/>
      </div>
      <div style="padding: 20px;">
        <q-btn @click="inputLexeme" class="full-width" :disable="program" outline label="Анализировать"/>
      </div>

<!--      <q-btn @click="letStruct" label="Тест"/>-->

      <q-card v-if="error" class="my-card bg-negative text-white text-center">
        <q-card-section>
          <div class="text-h6" >Синтаксическая ошибка</div>
          <div class="text-subtitle2" v-if="message">{{message}}</div>
        </q-card-section>
      </q-card>
      <q-card  v-if="error2" class="my-card bg-negative text-white text-center">
        <q-card-section>
          <div class="text-h6">Лексическая ошибка</div>
          <div class="text-subtitle2" v-if="message">{{message}}</div>
        </q-card-section>
      </q-card>
      <q-card v-if="success" class="my-card bg-positive text-white text-center">
        <q-card-section>
          <div class="text-h6" >Синтаксис и лексика верна</div>
        </q-card-section>
      </q-card>

      <div class="q-pa-md" v-if="success && !error">
        <q-table
          style="width: 50%; margin: auto"
          title="Таблица терминальных символов"
          :rows-per-page-options="[0]"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :pagination="pagination"
          separator="vertical"
        ></q-table>
      </div>

    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LabSecond",
  data: () => ({
    pagination: {
      rowsPerPage: 100
    },
    program: 'if a>b then a-- else b++ end',
    structure: null,
    language: {
      keywords: ['if','then','else','end'],
      characters: ['<','<=','<>','>','>=','==','+','-','--','++','*','/'],
    },
    output: {
      keywords: [],
      characters: [],
      variable: [],
      numbers: [],
    },
    rows: [],
    columns: [
      {name: 'symbol', label: 'Символ', field: 'symbol'},
      {name: 'category', label: 'Категория', field: 'category'},
      {name: 'comment', label: 'Описание', field: 'comment'},
    ],
    error: false,
    error2: false,
    success: false,
    message: '',


  }),
  methods: {
    letStruct(){
      this.output.keywords.forEach(element => {
        this.rows.push({
          symbol: element,
          category: 'Ключевое слово',
          comment: 'Составная часть условного оператора'
        })
      })
      this.output.variable.forEach(element => {
        this.rows.push({
          symbol: element,
          category: 'Идентификатор',
          comment: 'Переменная'
        })
      })
      this.output.numbers.forEach(element => {
        this.rows.push({
          symbol: element,
          category: 'Число',
          comment: 'Некоторое число'
        })
      })
      this.output.characters.forEach(element => {
        switch (element) {
          case '++':
            this.rows.push({
              symbol: element,
              category: 'Специальный символ',
              comment: 'Инкремент'
            })
            break;
          case '--':
            this.rows.push({
              symbol: element,
              category: 'Специальный символ',
              comment: 'Декремент'
            })
            break;
          case '+':
            this.rows.push({
              symbol: element,
              category: 'Специальный символ',
              comment: 'Сложение'
            })
            break;
          case '-':
            this.rows.push({
              symbol: element,
              category: 'Специальный символ',
              comment: 'Вычитание'
            })
            break;
          case '<>':
            this.rows.push({
              symbol: element,
              category: 'Специальный символ',
              comment: 'Не равно'
            })
            break;
          case '>=':
            this.rows.push({
              symbol: element,
              category: 'Специальный символ',
              comment: 'Больше или равно'
            })
            break;
          case '<=':
            this.rows.push({
              symbol: element,
              category: 'Специальный символ',
              comment: 'Меньше или равно'
            })
            break;
          case '>':
            this.rows.push({
              symbol: element,
              category: 'Специальный символ',
              comment: 'Больше'
            })
            break;
          case '<':
            this.rows.push({
              symbol: element,
              category: 'Специальный символ',
              comment: 'Меньше'
            })
            break;
          case '==':
            this.rows.push({
              symbol: element,
              category: 'Специальный символ',
              comment: 'Сравнение'
            })
            break;
          case '*':
            this.rows.push({
              symbol: element,
              category: 'Специальный символ',
              comment: 'Умножение'
            })
            break;
          case '/':
            this.rows.push({
              symbol: element,
              category: 'Специальный символ',
              comment: 'Деление'
            })
            break;
        }
      })
      // console.log(this.rows)
    },
    isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    validation(){
      let thenReg = new RegExp('..en|t..n|th..|.hen|t.en|th.n|the.|ten|thn|the|hen|th|en|he|tn')
      let ifReg = new RegExp('.f|i.|f|i')
      let endReg = new RegExp('.nd|e.d|en.|nd|en|ed')
      let compReg = new RegExp('<>|<|>|=|<=|>=')
      let test = this.program.split(' ');
      if(test[0] !== 'if') {
        if(ifReg.test(test[0])){
          this.message = 'Ошибка в написании ключевого слова if'
          this.error = false
          this.error2 = true
          this.success = false
        }
        else {
          this.message = 'Пропущен if'
          this.error = true
          this.error2 = false
          this.success = false
        }

      }
      else if(!compReg.test(test[1])){
        this.message = 'Ошибка оператора сравнения'
        this.error = true
        this.error2 = false
        this.success = false
      }
      else if(test[2] !== 'then') {
          if(thenReg.test(test[2])){
            this.message = 'Ошибка в написании ключевого слова then'
            this.error = false
            this.error2 = true
            this.success = false
          }
          else {
            this.message = 'Пропущен then'
            this.error = true
            this.error2 = false
            this.success = false
          }
      }
      else if(test[test.length-1] !== 'end') {
        if(endReg.test(test[test.length-1])){
          this.message = 'Ошибка в написании ключевого слова end'
          this.error = false
          this.error2 = true
          this.success = false
        }
        else {
          this.message = 'Пропущен end'
          this.error = true
          this.error2 = false
          this.success = false
        }
      }
      else {
        this.error = false
        this.error2 = false
        this.success = true
        this.message = ''
      }
      let buffer = test.reduce((acc,item)=>{
        acc[item] = acc[item] ? acc[item] +1 : 1;
        return acc;
      },{})
      let result = Object.keys(buffer).filter((item) => buffer[item] > 1);
      if(result.length !== 0) {
        this.error = true;
        this.success = false;
        this.message = `Неверное расположение ${result.join()}`
      }

      // console.log(thenReg.test(test[2]))
    },
    async inputLexeme(){
      this.error = false
      this.error2 = false
      this.success = false
      this.message = ''
      this.structure = null
      this.output.characters = []
      this.output.numbers = []
      this.output.variable = []
      this.output.keywords = []
      this.rows = []
      this.structure = this.program.split(' ')
      // console.log(this.structure)
      this.validation()
      if(this.success){
        this.structure.forEach(element => {
          this.analyse(element)
        })
        this.letStruct()
        // console.log(this.output)
      }

    },

    analyse(lexeme){
      let wordReg = new RegExp('\\b\\w+\\b', 'g')
      let digReg = new RegExp('\\d+', 'gm')
      // let specReg = new RegExp('((<|>|=)(>|=)?)|(\\+|\\-)+','g')
      // let specReg = new RegExp('((<|>|=)(>|=)?)|(\\+|\\-)+|\\*|\\/','g')
      let specReg = new RegExp('((<|>|=)(>|=)?)|(\\+|\\-)+|\\)|\\(|\\*|\\&|\\^|\\%|\\#|\\@|\\!','g')

      if(this.language.keywords.includes(lexeme)){
        this.output.keywords.push(lexeme)
      }
      if(wordReg.test(lexeme) && !this.language.keywords.includes(lexeme)){
        lexeme.match(wordReg).forEach(element => {
          // console.log(element)
          if(wordReg.test(element) && !this.language.keywords.includes(element) && !this.output.variable.includes(element) && !this.isNumeric(element)){
            // console.log(element)
            this.output.variable.push(element)
          }
          if(wordReg.test(element) && !this.language.keywords.includes(element) && !this.output.variable.includes(element) && !this.isNumeric(element)){
            // console.log(element)
            // this.output.variable.push(element)
          }
          // console.log(this.isNumeric(element))
          if(!this.output.numbers.includes(element) && this.isNumeric(element)){
            // console.log(element)
            this.output.numbers.push(element)
          }
        })
      }
      if(specReg.test(lexeme)){
        lexeme.match(specReg).forEach(element => {
          console.log(element)
          // if(specReg.test(element) && !this.output.characters.includes(element)){
          //   this.output.characters.push(element)
          // }
          if(this.language.characters.includes(element) ){
              if(!this.output.characters.includes(element)){
                this.output.characters.push(element)
              }


          }
          else {//Тут баг
            console.log(element)
            this.error = false
            this.error2 = true
            this.success = false
            this.message = `Неопознанный символ ${element}`
          }
        })
      }
      // else if(specReg.test(lexeme)){
      //   lexeme.match(specReg).forEach(element => {
      //     console.log(element)
      //   })
      // }
    },
    toHome(){
      location.href = `/`;
    }
  }
}
</script>

<style scoped>

</style>
