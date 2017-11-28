import {Component, Vue} from 'vue-property-decorator';
import {SearchBoxComponent} from '../search-box';

@Component({
    template: require('./navbar.html'),
    components: {
        SearchBox: SearchBoxComponent
    }
})
export class NavbarComponent extends Vue {

}
