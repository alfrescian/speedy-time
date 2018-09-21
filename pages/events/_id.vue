<template>
  <div
    v-if="event"
    class="container-fluid">
    <b-jumbotron
      bg-variant="transparent"
      header-tag="h3"
      lead-tag="div"
      fluid>
      <template
        slot="header">
        {{ event.name }}
      </template>
      <hr class="my-4">
      <template
        slot="lead">
        <div
          v-html="$md.render(event.headline)"/>
      </template>
      <b-form
        novalidate
        @submit="onSubmit">

        <b-row>
          <b-col
            sm="12"
            md="8"
            xl="6">
            <b-form-group
              :invalid-feedback="errors.first('firstName')"
              horizontal
              label-cols="3"
              breakpoint="md"
              label-class="required"
              label="Vorname:"
              label-for="firstName">
              <b-form-input
                v-validate="'required'"
                id="firstName"
                :state="submitted ? !errors.has('firstName'): null"
                v-model="formModel.firstName"
                data-vv-as="Vorname"
                name="firstName"
                type="text"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            sm="12"
            md="8"
            xl="6">
            <b-form-group
              :invalid-feedback="errors.first('lastName')"
              horizontal
              label-cols="3"
              breakpoint="md"
              label-class="required"
              label="Nachname:"
              label-for="lastName">
              <b-form-input
                v-validate="'required'"
                id="lastName"
                :state="submitted ? !errors.has('lastName'): null"
                v-model="formModel.lastName"
                data-vv-as="Nachname"
                name="lastName"
                type="text"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            sm="12"
            md="8"
            xl="6">
            <b-form-group
              :invalid-feedback="errors.first('yearOfBirth')"
              horizontal
              label-cols="3"
              breakpoint="md"
              label-class="required"
              label="Jahrgang:"
              label-for="yearOfBirth">
              <b-form-input
                v-validate="'required|min_value:1900|max_value:2018'"
                id="yearOfBirth"
                :state="submitted ? !errors.has('yearOfBirth'): null"
                v-model="formModel.yearOfBirth"
                data-vv-as="Jahrgang"
                name="yearOfBirth"
                type="number"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            sm="12"
            md="8"
            xl="6">
            <b-form-group
              :invalid-feedback="errors.first('gender')"
              horizontal
              label-cols="3"
              breakpoint="md"
              label-class="required"
              label="Geschlecht:"
              label-for="gender">
              <b-form-select
                v-validate="'required'"
                id="gender"
                v-model="formModel.gender"
                :state="submitted ? !errors.has('gender'): null"
                :options="genders"
                data-vv-as="Geschlecht"
                name="gender"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            sm="12"
            md="8"
            xl="6">
            <b-form-group
              :invalid-feedback="errors.first('contest')"
              horizontal
              label-cols="3"
              breakpoint="md"
              label-class="required"
              label="Wettkampf:"
              label-for="contest">
              <b-form-select
                v-validate="'required'"
                id="contest"
                v-model="formModel.contest"
                :state="submitted ? !errors.has('contest'): null"
                :options="contests"
                data-vv-as="Wettkampf"
                name="context"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            sm="12"
            md="8"
            xl="6">
            <b-form-group
              :invalid-feedback="errors.first('streetName')"
              horizontal
              label-cols="3"
              breakpoint="md"
              label-class="required"
              label="Straße:"
              label-for="streetName">
              <b-form-input
                v-validate="'required'"
                id="streetName"
                :state="submitted ? !errors.has('streetName'): null"
                v-model="formModel.streetName"
                data-vv-as="Straße"
                name="streetName"
                type="text"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            sm="12"
            md="8"
            xl="6">
            <b-form-group
              :invalid-feedback="errors.first('streetNumber')"
              horizontal
              label-cols="3"
              breakpoint="md"
              label-class="required"
              label="Hausnummer:"
              label-for="streetNumber">
              <b-form-input
                v-validate="'required'"
                id="streetNumber"
                :state="submitted ? !errors.has('streetNumber'): null"
                v-model="formModel.streetNumber"
                data-vv-as="Hausnummer"
                name="streetNumber"
                type="text"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            sm="12"
            md="8"
            xl="6">
            <b-form-group
              :invalid-feedback="errors.first('zip')"
              horizontal
              label-cols="3"
              breakpoint="md"
              label-class="required"
              label="PLZ:"
              label-for="zip">
              <b-form-input
                v-validate="'required'"
                id="zip"
                :state="submitted ? !errors.has('zip'): null"
                v-model="formModel.zip"
                data-vv-as="PLZ"
                name="zip"
                type="text"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            sm="12"
            md="8"
            xl="6">
            <b-form-group
              :invalid-feedback="errors.first('city')"
              horizontal
              label-cols="3"
              breakpoint="md"
              label-class="required"
              label="Stadt:"
              label-for="city">
              <b-form-input
                v-validate="'required'"
                id="city"
                :state="submitted ? !errors.has('city'): null"
                v-model="formModel.city"
                data-vv-as="Stadt"
                name="city"
                type="text"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            sm="12"
            md="8"
            xl="6">
            <b-form-group
              :invalid-feedback="errors.first('country')"
              horizontal
              label-cols="3"
              breakpoint="md"
              label-class="required"
              label="Land:"
              label-for="country">
              <b-form-select
                v-validate="'required'"
                id="country"
                v-model="formModel.country"
                :state="submitted ? !errors.has('country'): null"
                :options="countries"
                data-vv-as="Land"
                name="country"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            sm="12"
            md="8"
            xl="6">
            <b-form-group
              :invalid-feedback="errors.first('email')"
              horizontal
              label-cols="3"
              breakpoint="md"
              label-class="required"
              label="E-Mail:"
              label-for="email">
              <b-form-input
                v-validate="'required|email'"
                id="email"
                :state="submitted ? !errors.has('email'): null"
                v-model="formModel.email"
                data-vv-as="E-Mail"
                name="email"
                type="text"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            sm="12"
            md="8"
            xl="6">
            <b-form-group
              :invalid-feedback="errors.first('mobile')"
              horizontal
              label-cols="3"
              breakpoint="md"
              label-class="required"
              label="Telefon(mobil):"
              label-for="mobile">
              <b-form-input
                v-validate="'required|numeric'"
                id="mobile"
                :state="submitted ? !errors.has('mobile'): null"
                v-model="formModel.mobile"
                data-vv-as="E-Telefon(mobil)"
                name="mobile"
                type="text"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-button
          type="submit"
          variant="primary">Anmelden
        </b-button>
      </b-form>
    </b-jumbotron>

  </div>
</template>

<style>
  .form-group label.required:after {
    content: "*";
  }
</style>

<script>
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        submitted: false,
        genders: [
          {text: 'Weiblich', value: 'female'},
          {text: 'Männlich', value: 'male'},
        ],
        countries: [
          {text: 'Deutschland', value: 'de'},
        ],
      };
    },
    computed: {
      ...mapGetters('events', ['getById']),
      event() {
        return this.getById(this.$nuxt.$route.params.id)
      },
      contests() {
        return this.event.contests.map(c => ({value: c._id, text: c.name}))
      },
      formModel() {
        return {
          firstName: '',
          lastName: '',
          yearOfBirth: '',
          gender: '',
          streetName: '',
          streetNumber: '',
          zip: '',
          city: '',
          country: '',
          email: '',
          mobile: '',
          contest: this.event.contests && this.event.contests[0]._id || null
        }
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        this.submitted = true;
        this.$validator.validate().then((valid)=>{
          valid && this.$store.dispatch('participants/create', this.formModel);
        });
      }
    }
  }
</script>
