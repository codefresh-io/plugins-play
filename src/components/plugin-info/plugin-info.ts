import { Component, Vue } from 'vue-property-decorator';

import './plugin-info.scss';

@Component({
    template: require('./plugin-info.html')
})
export class PluginInfoComponent extends Vue {

    package: string = 'vue-webpack-typescript';
    repo: string = 'https://github.com/ducksoupdev/vue-webpack-typescript';
    mode: string = process.env.ENV;

}
