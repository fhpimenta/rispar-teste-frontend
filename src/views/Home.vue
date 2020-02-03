<template>
  <form-wizard>
      <template v-slot="{formData, warrantyData}">
          <!-- Cadastro -->
          <tab name="Cadastro" description="Dados Pessoais" :selected="true" :formData="formData">
              <h2 class="title">Cadastro</h2>
              <h3 class="subtitle">Informe seus dados e vamos criar sua conta</h3>
              <div id="form-step-1">
                  <div class="field is-horizontal">
                      <div class="field-label is-normal">
                          <label class="label">Nome</label>
                      </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input
                                        type="text"
                                        name="name"
                                        class="input"
                                        :class="{ 'is-danger': errors.has('step1.name') }"
                                        v-model="formData.name"
                                        data-vv-scope="step1"
                                        data-vv-as="Nome"
                                        v-validate="'required|min:3'"
                                    >
                                    <p class="help is-danger" v-if="errors.has('step1.name')">
                                        {{ errors.first('step1.name') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                  </div>
                  <div class="field is-horizontal">
                      <div class="field-label is-normal">
                          <label class="label">Email</label>
                      </div>
                      <div class="field-body">
                          <div class="field">
                              <div class="control">
                                  <input
                                    type="email"
                                    name="email"
                                    class="input"
                                    :class="{ 'is-danger': errors.has('step1.email') }"
                                    v-model="formData.email"
                                    data-vv-scope="step1"
                                    data-vv-as="Email"
                                    v-validate="'required|email'"
                                  >
                                  <p class="help is-danger" v-if="errors.has('step1.email')">
                                      {{ errors.first('step1.email') }}
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="field is-horizontal">
                      <div class="field-label is-normal">
                          <label class="label">Sexo</label>
                      </div>
                      <div class="field-body">
                          <div class="field is-narrow">
                              <div class="control">
                                  <label class="radio">
                                      <input
                                        type="radio"
                                        name="gender"
                                        v-validate="'required|included:male,female'"
                                        data-vv-scope="step1"
                                        data-vv-as="Sexo"
                                        value="male"
                                        v-model="formData.gender"
                                      > Masculino
                                  </label>
                                  <label class="radio">
                                      <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        v-model="formData.gender"
                                      > Feminino
                                  </label>
                                  <p class="help is-danger" v-if="errors.has('step1.gender')">
                                      {{ errors.first('step1.gender') }}
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="field is-horizontal">
                      <div class="field-label is-normal">
                          <label class="label">Data de Nascimento</label>
                      </div>
                      <div class="field-body">
                          <div class="field">
                              <div class="control">
                                  <input
                                    type="date"
                                    name="birthdate"
                                    v-validate="'required'"
                                    data-vv-scope="step1"
                                    data-vv-as="Data de Nascimento"
                                    class="input"
                                    :class="{ 'is-danger': errors.has('step1.birthdate') }"
                                    v-model="formData.birthdate"
                                  >
                                  <p class="help is-danger" v-if="errors.has('step1.birthdate')">
                                      {{ errors.first('step1.birthdate') }}
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </tab>
          <!-- Pedido de Emprestimo -->
          <tab name="Pedido" description="Detalhes do Empréstimo" :formData="formData">
              <h2 class="title">Pedido</h2>
              <h3 class="subtitle">De quanto precisa?</h3>
              <div id="form-step-2">
                  <div class="field">
                      <div class="control">
                          <input
                            type="range"
                            class="slider is-fullwidth is-info"
                            :step="step"
                            :min="min"
                            :max="max"
                            v-model="formData.amount"
                          >
                      </div>
                  </div>
                  <div class="is-pulled-left">{{ min | currency }}</div>
                  <div class="is-pulled-right">{{ max | currency }}</div>
                  <nav class="level">
                      <div class="level-item has-text-centered">
                          <div>
                              <p class="heading">Valor Liquido</p>
                              <p class="title">{{ formData.amount | currency }}</p>
                          </div>
                      </div>
                      <div class="level-item has-text-centered">
                          <div>
                              <p class="heading">Valor do Contrato</p>
                              <p class="title">{{ formData.amount | currency }}</p>
                          </div>
                      </div>
                      <div class="level-item has-text-centered">
                          <div>
                              <p class="heading">Valor da Parcela</p>
                              <p class="title">{{ formData.installment | currency }}</p>
                          </div>
                      </div>
                      <div class="level-item has-text-centered">
                          <div>
                              <p class="heading">Prazo</p>
                              <p class="title">{{ formData.terms }} meses</p>
                          </div>
                      </div>
                  </nav>
              </div>
          </tab>
          <!-- Transferência -->
          <tab name="Transferência" description="Garantia em Bitcoin" :warrantyData="warrantyData">
              <h2 class="title">Transferência</h2>
              <h3 class="subtitle">Última etapa, transferência de garantia</h3>
              <div class="card">
                  <div class="card-content has-text-centered">
                      <p class="title is-4">Valor da Garantia</p>
                      <span class="icon is-large">
                          <i class="fab fa-bitcoin fa-5x"></i>
                      </span>
                      <p v-if="!warrantyData.btc">
                        <span class="icon is-large">
                          <i class="fas fa-circle-notch fa-spin fa-2x"></i>
                      </span>
                      </p>
                      <p class="title is-5">{{ warrantyData.btc }}</p>
                  </div>
              </div>
              <div class="card" v-if="warrantyData.wallet">
                  <div class="card-content has-text-centered">
                      <p class="title is-4">Endereço da Garantia</p>
                      <qrcode :value="warrantyData.wallet" :options="{ width: 200 }"></qrcode>
                      <div class="column is-half is-offset-one-quarter">
                          <div class="field">
                              <div class="control">
                                  <input type="text" class="input" :value="warrantyData.wallet" disabled>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </tab>
      </template>
  </form-wizard>
</template>

<script>
import FormWizard from "../components/FormWizard";
import Tab from "../components/Tab";

export default {
    name: 'home',
    components: {
        FormWizard, Tab
    },
    data() {
      return {
          min: 5000,
          max: 50000,
          step: 1000
      }
    }
}
</script>

<style lang="scss" scoped>
.field-label {
    text-align: left;
}
.level {
    margin-top: 4em;
}
.card {
    margin-bottom: 2em;
}
</style>
