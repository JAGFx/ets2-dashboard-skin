<template>
  <div class="menu d-flex flex-column h-100">
    <div class="row my-2">
      <div class="col">
        <nav class="nav nav-pills d-flex-center-center my-2">
          <Navlink :active="true">
            <template #icon>
              <i class="icon-route mx-1"></i>
            </template>
            <template #default> Skin </template>
          </Navlink>
          <Navlink>
            <template #icon>
              <i class="icon-route mx-1"></i>
            </template>
            <template #default> Config </template>
          </Navlink>
          <Navlink>
            <template #icon>
              <i class="icon-route mx-1"></i>
            </template>
            <template #default> About </template>
          </Navlink>
        </nav>
      </div>
    </div>
    <div class="row my-2 h-100">
      <div class="col-6 d-flex">
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
                <span class="text">Author</span>
              </div>
            </div>
            <div
              class="d-flex justify-content-center align-items-start flex-column mx-4 my-2 w-100"
            >
              <Button :as-link="true">
                <template #icon>
                  <font-awesome-icon icon="fa-solid fa-earth-europe" />
                </template>
                Website
              </Button>
              <Button :as-link="true">
                <template #icon>
                  <font-awesome-icon icon="fa-brands fa-twitter" />
                </template>
                Twitter
              </Button>
              <Button :as-link="true">
                <template #icon>
                  <font-awesome-icon icon="fa-brands fa-github" />
                </template>
                Github
              </Button>
            </div>
          </div>
        </div>
        <!--        <div class="d-flex-center-center flex-column">-->
        <!--          <div class="card bg-acrylic my-2">-->
        <!--            <div class="card-body">-->
        <!--              #1-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="card bg-dark my-2">-->
        <!--            <div class="card-body">-->
        <!--              #1-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <div class="col-6">
        <!--        <div class="card bg-gradient-accent my-2 h-100">-->
        <!--          <div class="card-body">-->
        <!--            #1-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup>
import Navlink from '@/application/ui/Navlink/Navlink.vue';
import Button from '@/application/ui/Button/Button.vue';
</script>

<style lang="scss" scoped>
@import 'menu';
</style>
