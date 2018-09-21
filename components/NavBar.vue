<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="primary">

    <b-navbar-toggle target="nav_collapse"/>

    <b-navbar-brand to="/">Speedy Time</b-navbar-brand>

    <b-collapse
      id="nav_collapse"
      is-nav>

      <b-navbar-nav>
        <b-nav-item
          v-for="event in $store.state.events.list"
          :key="event._id"
          :to="{ name: 'events-id', params: { id: event._id }}">
          {{ event.name }}
        </b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

