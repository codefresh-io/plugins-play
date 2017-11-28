import { Vue } from 'vue-property-decorator';
import './plugin-info.scss';
export declare class PluginInfoComponent extends Vue {
    path: string;
    icon: string;
    plugin: any;
    readme: string;
    mounted(): void;
}
