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
      <q-input v-model="program" label="Standard" />
      <q-btn @click="inputLexeme" label="Анализировать"/>

    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LabSecond",
  data: () => ({
    program: 'if 3>=moloko then a++ --koks else a-2 end',
    structure: null,
    language: {
      keywords: ['if','then','else','end'],
      characters: ['<','<=','<>','>','>=','=','==','+','-','--','++'],
    },
    output: {
      keywords: [],
      characters: [],
      variable: [],
      numbers: [],
    }

  }),
  methods: {
    isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    inputLexeme(){
      this.structure = this.program.split(' ')
      console.log(this.structure)
      this.structure.forEach(element => {
        this.analyse(element)
      })
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
          if(wordReg.test(element) && !this.language.keywords.includes(element) && !this.output.variable.includes(element) && !this.isNumeric(element)){
            // console.log(element)
            this.output.variable.push(element)
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
          if(specReg.test(element) && !this.output.characters.includes(element)){
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
