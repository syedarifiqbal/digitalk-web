<template>

<div class="pagination d-flex" v-if="data">

    <p>Rows per page</p>
    <select v-model="per_page">
        <option value="2">2</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
    </select>

    <p>{{ data.from }} - {{ data.to }} of {{ data.total }}</p>

    <a href="#" @click.prevent="prevPage">
        <i class="fa fa-arrow-left"></i>
    </a>

    <a href="#" @click.prevent="nextPage">
        <i class="fa fa-arrow-right"></i>
    </a>

</div>

</template>
<script>
export default {
    props: { data: { required: true, } },
    data(){
        return {
            per_page: 10,
            page: 1,
        };
    },
    methods: {
        nextPage(){
            if(this.data.current_page === this.data.last_page) return;

            this.$emit('pageChagne', this.data.current_page + 1);
        },
        prevPage(){
            if(this.data.current_page === 1) return;

            this.$emit('pageChagne', this.data.current_page - 1);
        }
    },
    watch: {
        'per_page': function(){
            this.$emit('pagePageChange', this.per_page);
        }
    }
}
</script>
<style scoped>
.pagination {
    justify-content: end;
    padding: 15px 15px 5px;
    align-items: center;
/*     align-content: center; */
}

.pagination * {
    margin-bottom: 0;
}

.pagination p:first-child {
    margin-right: 10px;
}

.pagination select {
    margin-right: 10px;
    border: blanchedalmond;
}

.pagination a {
    display: inline-block;
    padding: 10px;
    margin-left: 10px;
}
</style>