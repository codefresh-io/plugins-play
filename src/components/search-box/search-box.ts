import {Component, Vue} from 'vue-property-decorator';

@Component({
    template: require('./search-box.html')
})
export class SearchBoxComponent extends Vue {

    query: string = '';

    search() {
        this.$router.replace({
            query: {q: this.query}
        });
    }

    mounted() {
    }
}
