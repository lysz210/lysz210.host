<template>
  <v-app>
    <v-app-bar app color="blue-grey" dark>
      <v-toolbar-title>Lysz210</v-toolbar-title>
      <v-spacer></v-spacer>
      <transition-group name="fade">
        <v-btn
        v-for="social in socials"
        :key="social.name"
        :href="social.url"
        icon
        small
        target="_blank"
        style="background-color: white; margin: .3rem"
      >
        <v-icon
          :style="{ color: social.color || 'black' }"
        >{{ social.icon }}</v-icon>
      </v-btn>
      </transition-group>
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            icon
            small
            style="background-color: white; margin: .3rem"
            v-bind="props"
          >
            <v-icon><img :src="currentLocale?.flag" /></v-icon>
          </v-btn>
        </template>
        <v-list
          density="compact"
          nav
        >
          <v-list-item
            :key="locale.code"
            v-for="locale in locales"
            :prepend-avatar="locale.flag"
            :to="{ name: 'lang', params: { lang: locale.code }}"
          >
            <v-list-item-title>{{ locale.name.toUpperCase() }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>
    <v-footer app color="blue-grey">
      <v-row justify="center">
        <v-col class="py-4 text-center white--text">
          &copy;2019 —
          <strong>Lingyong Sun</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<style>
html {
  overflow-y: auto;
}
</style>

<script setup lang="ts">
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { mergeMap, concatMap, delay, filter } from 'rxjs/operators'
import italian from 'flag-icons/flags/1x1/it.svg?url'
import english from 'flag-icons/flags/1x1/gb.svg?url'

const {
  public: {
    cvBasePath: basePath,
    meSocialAccounts: socialAccounts
  }
} = useRuntimeConfig()

const locales = [
  { code: 'en', name: 'English', flag: english },
  { code: 'it', name: 'Italian', flag: italian }
]

const currentLocale = computed(() => {
  const lang = useRoute()?.params?.lang || 'en'
  return locales.find(locale => locale.code === lang)
})
const socials = ref<Array<any>>([])
console.log(useRoute())

onMounted(() => {
  ajax({
    url: `${basePath}/api/${useRoute()?.params?.lang || 'en'}${socialAccounts}`,
    method: 'GET',
    crossDomain: true,
    withCredentials: false
  })
  .pipe(
    filter(response => !!response?.response),
    mergeMap((response: any) => response.response),
    concatMap(element => of(element).pipe(delay(700)))
  )
  .subscribe({
    next: (element) => {
      socials.value.push(element)
    }
  })
})
</script>
