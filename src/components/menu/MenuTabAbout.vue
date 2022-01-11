<template>
  <div class="menu-tab-about">
    <aside class="author card">
      <img
        alt=""
        class="background"
        src="https://www.emmanuel-smith.me/build/images/bg.home4.7af46a47.jpg"
      />
      <img
        class="profile img-fluid"
        src="https://avatars3.githubusercontent.com/u/12508080?s=460&u=f59ce1bde619fa0e6c226e92ab97945c4561eea5&v=4"
      />
      <div class="card-content">
        <h2>
          <small class="m-0 mb-2 badge badge-success badge-author">{{
            $t('Author')
          }}</small>
          <span class="d-block">{{ author.name }}</span>
          <small class="font-italic">{{ author.email }}</small>
        </h2>
        <div class="icons">
          <a :href="author.url" target="_blank">
            <i class="fas fa-globe-europe" />
          </a>
          <a href="https://twitter.com/d_jagfx" target="_blank">
            <i class="fab fa-twitter" />
          </a>
          <a href="https://github.com/JAGFx" target="_blank">
            <i class="fab fa-github" />
          </a>
        </div>
      </div>
    </aside>
    <aside class="project p-0 h-100 card">
      <div class="card-content p-3">
        <h2>
          <small class="m-0 mb-2 badge badge-danger badge-author"
            >v{{ version }}</small
          >
          <span class="d-block">{{ description }}</span>
        </h2>
      </div>
      <div class="card-footer w-100 icons m-0">
        <a :href="bugs.url" class="mx-1 text-danger" target="_blank">
          <i class="fas fa-bug" />
        </a>
        <a :href="repository.url" class="mx-1" target="_blank">
          <i class="fas fa-code-branch" />
        </a>
        <a :href="homepage" class="mx-1" target="_blank">
          <i class="fas fa-book" />
        </a>
        <a
          class="mx-1"
          href="https://github.com/JAGFx/ets2-dashboard-skin/blob/master/LICENSE"
          target="_blank"
        >
          <i class="fab fa-creative-commons" />
        </a>
      </div>
    </aside>
  </div>
</template>

<script>
import pkg from '../../../package.json';

export default {
  name: 'MenuTabAbout',
  data() {
    return pkg;
  }
};
</script>
