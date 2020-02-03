<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
        <div class="navbar-brand">
            <router-link class="navbar-item" :to="{ name: 'home' }">
                <img src="../assets/rispar_logo.jpg" alt="Logo" width="112" height="40">
            </router-link>
        </div>
        <div class="navbar-menu">
            <div class="navbar-item navbar-center">
                <span class="has-text-black has-text-weight-bold">Olá, solicite seu crédito Rispar =)</span>
            </div>
        </div>
    </div>
</nav>
</template>

<style lang="scss">
.navbar-item.navbar-center {
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
}
</style>