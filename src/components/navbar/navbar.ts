import {Component, Vue} from 'vue-property-decorator';
import {SearchBox} from '../search-box';

@Component({
    template: require('./navbar.html'),
    components: {
        SearchBox
    }
})
export class NavbarComponent extends Vue {

}
