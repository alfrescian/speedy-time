<template>
  <div class="main-container">
    <b-card
      v-for="event in $store.state.events.list"
      :key="event._id"
      :title="event.name"
      class="mb-2">
      <div
        class="card-text"
        v-html="$md.render(event.headline)"/>
      <b-button
        :to="{ name: 'events-id', params: { id: event._id }}"
        variant="primary">Anmeldung
      </b-button>
    </b-card>
  </div>
</template>

<style>
  .main-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>

<script>
  import {mapState} from 'vuex';

  export default {
    computed: {
      ...mapState('events', ['list'])
    }
  }
</script>


