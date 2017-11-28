import {Component, Vue, Prop} from 'vue-property-decorator';
import {PluginsService} from '../../util/plugins';
import VueMarkdown from 'vue-markdown';


import _ from 'lodash';
import './plugin-info.scss';

@Component({
    template: require('./plugin-info.html'),
    components: {
        VueMarkdown
    }
})
export class PluginInfoComponent extends Vue {

    @Prop()
    path: string;


    icon: string = '';
    plugin: any = null;
    readme: string = '';

    mounted() {
        if (!this.path) {
            this.readme = '### Please select a valid plugin';
            return;
        }
        PluginsService.get(this.path)
            .then((data) => {
                this.icon = _.get(data, 'plugin.icon');
                this.plugin = data.plugin;
                this.readme = data.readme;
            });
    }
}
