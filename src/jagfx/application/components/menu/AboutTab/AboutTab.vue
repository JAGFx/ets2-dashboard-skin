<template>
  <div class="row my-2 h-100 about-tab">
    <div class="col-6 d-flex-center-center">
      <div class="d-flex-center-center flex-column w-100">
        <div class="my-2 d-flex-center-center w-100">
          <div class="d-flex justify-content-end align-items-center w-100">
            <div class="avatar mx-4 my-2">
              <img
                src="https://avatars3.githubusercontent.com/u/12508080?s=460&u=f59ce1bde619fa0e6c226e92ab97945c4561eea5&v=4"
                alt=""
                class="img-fluid rounded-circle"
              />
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center flex-column w-100"
          >
            <h2 class="m-0 mt-2 w-100 text-center">JAGFx</h2>
            <div class="author m-0 mb-2">
              <span class="text-gradient">{{ $t('Author') }}</span>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-start flex-column mx-4 my-2 w-100"
          >
            <Button :as-link="true">
              <template #icon>
                <font-awesome-icon icon="fa-solid fa-earth-europe" />
              </template>
              {{ $t('Website') }}
            </Button>
            <Button :as-link="true">
              <template #icon>
                <font-awesome-icon icon="fa-brands fa-twitter" />
              </template>
              {{ $t('Twitter') }}
            </Button>
            <Button :as-link="true">
              <template #icon>
                <font-awesome-icon icon="fa-brands fa-github" />
              </template>
              {{ $t('Github') }}
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 d-flex-center-center flex-column">
      <h1 class="version bg-black-light-5 px-5 py-3 new-version">
        v1.7.2
        <a class="message btn bg-gradient-accent text-white badge px-3 py-2">{{
          $t('New version available')
        }}</a>
      </h1>
      <div class="d-flex-center-center">
        <Button :as-link="true">
          <template #icon>
            <font-awesome-icon icon="fa-brands fa-github" />
          </template>
          {{ $t('Report bug') }}
        </Button>
        <Button :as-link="true">
          <template #icon>
            <font-awesome-icon icon="fa-brands fa-github" />
          </template>
          {{ $t("Read doc'") }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '@/jagfx/application/components/shared/ui/Button/Button.vue';
</script>

<style lang="scss">
@import 'aboutTab';
</style>
