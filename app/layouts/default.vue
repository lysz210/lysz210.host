<template>
  <v-app>
    <v-app-bar app color="blue-grey" dark>
      <v-toolbar-title>{{ personalData.name }} {{ personalData.surname }}</v-toolbar-title>
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
            :to="switchLocalePath(locale.code)"
          >
            <v-list-item-title>{{ locale.name.toUpperCase() }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <template v-slot:extension>
        <v-tabs grow align-tabs="center">
          <v-tab :to="localPath({ name: 'education' })">{{ $t('istruzione.title') }}</v-tab>
          <v-tab :to="localPath({ name: 'experience' })">{{ $t('lavoro.title') }}</v-tab>
          <v-tab :to="localPath({ name: 'personal-skills' })">{{ $t('competenze.title') }}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <slot></slot>

    </v-main>
    <v-footer app color="blue-grey">

      <v-btn v-if="pdfSrc" :href="pdfSrc" target="_blank" icon="fas fa-print" dark color="green" position="absolute" elevation="12"
        class="print-btn"></v-btn>
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
.print-btn {
  position: fixed;
  right: calc(1.5rem + env(safe-area-inset-right));
  bottom: calc(1.5rem + env(safe-area-inset-bottom));
  z-index: 50;
}
</style>

<script setup lang="ts">
import italian from 'flag-icons/flags/1x1/it.svg?url'
import english from 'flag-icons/flags/1x1/gb.svg?url'
const { locale } = useI18n()
const localPath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const {
  socials,
  personalData,
  pdfSrc,
} = storeToRefs(useMeStore())

const locales: {code: string, name: string, flag: any}[] = [
  { code: 'en', name: 'English', flag: english },
  { code: 'it', name: 'Italian', flag: italian }
]

const currentLocale = computed(() => {
  const lang = locale.value|| 'en'
  return locales.find(locale => locale.code === lang)
})

</script>
