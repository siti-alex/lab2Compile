<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Анализатор
        </q-toolbar-title>
        <div>Лабораторная работа 3</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-input v-model="program" label="Введите условный оператор" style="padding: 20px;"/>
      <div style="padding-left: 20px; padding-right: 20px; padding-bottom: 20px">
        <q-btn @click="inputLexeme" class="full-width" label="Анализировать"/>
      </div>

<!--      <q-btn @click="letStruct" label="Тест"/>-->

      <q-card v-if="error" class="my-card bg-negative text-white text-center">
        <q-card-section>
          <div class="text-h6" >Синтаксическая ошибка</div>
        </q-card-section>
      </q-card>
      <q-card v-if="success" class="my-card bg-positive text-white text-center">
        <q-card-section>
          <div class="text-h6" >Синтаксис верен</div>
        </q-card-section>
      </q-card>

      <div class="q-pa-md" v-if="success && !error">
        <q-table
          title="Таблица терминальных символов"
          dense
          :rows="rows"
          :columns="columns"
          row-key="name"
          :pagination="pagination"
        />
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
    program: 'if penis<3 then a++ --koks else a-2 end',
    structure: null,
    language: {
      keywords: ['if','then','else','end'],
      characters: ['<','<=','<>','>','>=','==','+','-','--','++'],
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
    success: false


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
          category: 'Переменная',
          comment: 'Просто переменная'
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
        }
      })
      console.log(this.rows)
    },
    isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    validation(){
      let test = this.program.split(' ');
      if(test[0] == 'if' && test[2] == 'then' && test[test.length-1] == 'end'){
        this.error = false
        this.success = true
      }
      else {
        this.error = true
        this.success = false
      }
      console.log(test)
    },
    async inputLexeme(){
      this.structure = null
      this.output.characters = []
      this.output.numbers = []
      this.output.variable = []
      this.output.keywords = []
      this.rows = []
      this.structure = this.program.split(' ')
      // console.log(this.structure)
      this.validation()
      this.structure.forEach(element => {
        this.analyse(element)
      })
      this.letStruct()
      console.log(this.output)
    },

    analyse(lexeme){
      let wordReg = new RegExp('\\b\\w+\\b', 'g')
      let digReg = new RegExp('\\d+', 'gm')
      // let specReg = new RegExp('(\\++|\\--|\\>|\\<|\\>=|\\<=|\\<>|\\=|\\==|\\+|\\-)','g')
      let specReg = new RegExp('((<|>|=)(>|=)?)|(\\+|\\-)+','g')
      let buffer = null

      if(this.language.keywords.includes(lexeme)){
        this.output.keywords.push(lexeme)
      }
      if(wordReg.test(lexeme) && !this.language.keywords.includes(lexeme)){
        lexeme.match(wordReg).forEach(element => {
          // console.log(element)
          if(wordReg.test(element) && !this.language.keywords.includes(element) && !this.output.variable.includes(element) && !this.isNumeric(element)){
            console.log(element)
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
          // console.log(element)
          // if(specReg.test(element) && !this.output.characters.includes(element)){
          //   this.output.characters.push(element)
          // }
          if(this.language.characters.includes(element) && !this.output.characters.includes(element)){
            this.output.characters.push(element)
          }
        })
      }
    },

  }
}
</script>

<style scoped>

</style>
