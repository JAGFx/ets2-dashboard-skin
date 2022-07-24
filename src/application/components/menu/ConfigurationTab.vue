<template>
  <div>
    <div class="row my-2 configuration-tab">
      <div class="col-12">
        <div class="d-flex-center-center">
          <input
            type="search"
            class="form-control form-control-sm w-100 bg-acrylic"
            placeholder="Type to search..."
          />
          <div class="dropdown dropdown-acrylic mx-1">
            <button
              type="button"
              class="btn btn-acrylic dropdown-toggle d-flex-center-center"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="icon-rest_stop"></i>
            </button>
            <ul class="dropdown-menu">
              <li class="d-flex-center-center">
                <Tag class="dropdown-item">#jagfx</Tag>
              </li>
              <li class="d-flex-center-center">
                <Tag class="dropdown-item">#unit</Tag>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-2 h-100 configuration-tab">
      <div class="col">
        <div class="card bg-transparent">
          <div class="card-body p-0">
            <div class="list-group">
              <div class="list-group-item bg-acrylic light text-white">
                <div class="d-flex-center-center">
                  <div
                    class="d-flex justify-content-center align-items-start flex-column w-100"
                  >
                    <div
                      class="d-flex justify-content-start align-items-center"
                    >
                      <Tag class="ms-0">#jagfx</Tag>
                      <span class="mx-1">Lorem ipsum dolor sit amet.</span>
                    </div>
                    <small class="text-muted">Lorem ipsum dolor.</small>
                  </div>
                  <div>
                    <Switch />
                  </div>
                </div>
              </div>
              <div class="list-group-item bg-acrylic light text-white">
                <div class="d-flex-center-center">
                  <div
                    class="d-flex justify-content-center align-items-start flex-column w-100"
                  >
                    <div
                      class="d-flex justify-content-start align-items-center"
                    >
                      <Tag class="ms-0">#unit</Tag>
                      <span class="mx-1">Lorem ipsum dolor sit amet.</span>
                    </div>
                    <small class="text-muted">Lorem ipsum dolor.</small>
                  </div>
                  <div>
                    <select
                      class="form-select form-select-sm"
                      aria-label="Default select example"
                    >
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Switch from '@/application/ui/Switch/Switch.vue';
import Tag from '@/application/ui/Tag/Tag.vue';
</script>

<style scoped lang="scss"></style>
