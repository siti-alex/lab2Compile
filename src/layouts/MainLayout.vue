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
        <hr>
        <router-link to="/lab3">
          <h6>Лабораторная работа 3, 4</h6>
        </router-link>
      </div>

    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'



export default defineComponent({
  name: 'MainLayout',


})
</script>
