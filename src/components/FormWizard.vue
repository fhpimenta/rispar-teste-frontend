<template>
    <div class="columns">
        <div class="column is-one-quarter">
            <ul class="steps is-vertical">
                <li class="steps-segment" v-for="(tab, index) in tabs" :class="{'is-active': tab.isActive}" :key="tab.name">
                    <span class="steps-marker">{{ index + 1 }}</span>
                    <div class="steps-content">
                        <p class="is-size-4">{{ tab.name }}</p>
                        <p>{{ tab.description }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="column">
            <slot :formData="form" :warrantyData="warranty"></slot>
            <hr>
            <div class="field is-grouped is-pulled-right">
                <div class="control" v-if="currentActive > 0 && currentActive < (totalTabs - 1)">
                    <button @click="previousTab()" class="button">Voltar</button>
                </div>
                <div class="control" v-if="currentActive < totalTabs - 1">
                    <button @click="nextTab()" class="button is-info">Próximo</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'form-wizard',
    data() {
        return {
            tabs: [],
            currentActive: 0,
            totalTabs: 0,
            form: {
                name: '',
                email: '',
                gender: '',
                birthdate: '',
                amount: 10000,
                terms: 12,
                installment: 0
            },
            warranty: {
                btc: '',
                wallet: ''
            }
        }
    },
    watch: {
        'form.amount': function (newValue) {
            this.form.installment =  this.round(newValue / this.form.terms)
        }
    },

    created() {
        this.tabs = this.$children
        this.form.installment = this.round(this.form.amount / this.form.terms)
    },

    mounted() {
        this.totalTabs = this.tabs.length
    },

    methods: {
        previousTab(){
            this.currentActive--
            this.activeTab(this.currentActive)
        },
        nextTab(){
            this.$root.$validator.validate('step'+(this.currentActive+1)+'.*').then(valid => {
                if (valid) {
                    this.currentActive++
                    this.activeTab(this.currentActive)

                    if (this.currentActive === this.totalTabs - 1) {
                        this.getWarranty()
                    }
                }
            })
        },
        getWarranty() {
            var app = this
            axios.post('/Prod/wallet', this.form)
            .then(response => {
                app.warranty = response.data
            })
        },
        activeTab(index) {
            this.tabs.forEach(tab => {
                tab.isActive = false;
            })

            this.tabs[index].isActive = true
        },
        round(num, places = 2) {
            return +(parseFloat(num).toFixed(places))
        }
    }
}
</script>
