import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import {PluginsService, PluginPreview} from '../../util/plugins';

import './list.scss';

@Component({
    template: require('./list.html')
})
export class ListComponent extends Vue {

    items: PluginPreview[] = [];

    @Prop()
    query: string;

    constructor() {
        super();
    }

    mounted() {
        this.loadItems();
    }

    @Watch('query')
    private loadItems() {
        PluginsService.query(this.query).then(list => this.items = list);
    }
}
