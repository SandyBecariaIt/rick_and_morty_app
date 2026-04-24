<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <div class="skeleton skeleton-image"></div>
      </figure>
    </div>

    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-subtitle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton {
  cursor: progress;
  border-radius: 4px;
  background: linear-gradient(90deg, #ddd 40%, #efefef, #ddd 60%) right / 300% 100%;
  animation: skeleton-loading 1.5s linear infinite;
}

.skeleton-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.skeleton-title {
  width: 150px;
  height: 20px;
  margin-bottom: 10px;
}

.skeleton-subtitle {
  width: 100px;
  height: 15px;
}

@keyframes skeleton-loading {
  to {
    background-position: left;
  }
}
</style>