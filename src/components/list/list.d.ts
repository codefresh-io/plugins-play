import { Vue } from 'vue-property-decorator';
import { PluginPreview } from '../../util/plugins';
export declare class ListComponent extends Vue {
    items: PluginPreview[];
    query: string;
    constructor();
    mounted(): void;
    private loadItems();
}
