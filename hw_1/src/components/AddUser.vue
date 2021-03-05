<template>
  <div>
    <Error />
    <form @submit.prevent="userRegister(users)" novalidate>

      <div class="row g-3">
        <div class="col-sm-5">
          <input @blur="$v.formReg.name.$touch()"
          :class="status($v.formReg.name)"
          v-model.trim="formReg.name" type="text" class="form-control" id="name" placeholder="Your Name">
          <div class="invalid-feedback" v-if="!$v.formReg.name.required">{{ reqText }}</div>
          <div class="invalid-feedback" v-if="!$v.formReg.name.alpha">{{ alphaText }}</div>
          <div class="invalid-feedback" v-if="!$v.formReg.name.maxLength">{{ maxLengthText}}</div>
        </div>


        <div class="col-sm-5">
          <input   @blur="$v.formReg.email.$touch()"
                   :class="status($v.formReg.email)"
                   v-model.trim="formReg.email" type="text" class="form-control" placeholder="Your Email">
          <div class="invalid-feedback" v-if="!$v.formReg.email.required">{{ reqText }}</div>
          <div class="invalid-feedback" v-if="!$v.formReg.email.email">Please enter your Email address</div>

      </div>

        <div class="col-sm">
          <input  @blur="$v.formReg.age.$touch()"
                  :class="status($v.formReg.age)"
                  v-model.number.trim="formReg.age" type="number" class="form-control" placeholder="Your Age">
          <div class="invalid-feedback" v-if="!$v.formReg.age.required">{{ reqText }}</div>
          <div class="invalid-feedback" v-if="!$v.formReg.age.between">{{ largeNumber }}</div>
        </div>

      </div>
      <br>
      <div class="col">
        <button :disabled="disabledBtn" type="submit" class="btn btn-primary">Add User</button>
      </div>

    </form>
  </div>

</template>

<script>
import Error from "@/components/Error";
import { email, required,maxLength, helpers,between} from 'vuelidate/lib/validators'
const alpha = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/)
export default {
  name: "AddUser",
  components: {Error, email, required, maxLength, helpers, between},
  props: ['users'],
  data() {
    return {
      regMessage: false,
      reqText: 'Required field.',
      alphaText: 'Numbers, spaces and other characters are not allowed',
      maxLengthText: 'Maximum length 20 characters!',
      largeNumber: 'This is a large number.',
      formReg: {
        name: '',
        email: '',
        age: 0

      }
    }
  },
  computed: {
    disabledBtn() {
      return this.$v.formReg.name.$invalid ||
          this.$v.formReg.email.$invalid ||
          this.$v.formReg.age.$invalid
    }
  },
  methods: {
    status(validation) {
      return {
        'is-invalid': validation.$error,
        'error': validation.$error
      }
    },
    userRegister(users) {
    users.push({name: this.formReg.name, email:this.formReg.email, age: this.formReg.age} );
      this.reset()

    },
    reset() {

      this.regMessage = true;

      setTimeout(() => {
        this.regMessage = false
      }, 3000)

      for (let input in this.formReg) {
        this.formReg[input] = ''
      }

      this.$v.$reset()
    }
  },
  validations: {
    formReg: {
      name: {
        required,
        alpha,
        maxLength: maxLength(20)
      },
      email: {
        email,
        required
      },
      age: {
        between: between(1, 999)
      },
    }
  }
};
</script>

<style scoped>

</style>
