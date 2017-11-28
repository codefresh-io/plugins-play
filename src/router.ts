import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import {makeHot, reload} from './util/hot-reload';

const listComponent = () => import('./components/list').then(({ListComponent}) => ListComponent);
const pluginInfoComponent = () => import('./components/plugin-info').then(({PluginInfoComponent}) => PluginInfoComponent);

if (process.env.ENV === 'development' && module.hot) {
    const homeModuleId = './components/list';

    // first arguments for `module.hot.accept` and `require` methods have to be static strings
    // see https://github.com/webpack/webpack/issues/5668
    makeHot('./components/list', listComponent,
        module.hot.accept('./components/list', () => reload('./components/list', (<any>require('./components/list')).ListComponent)));

    makeHot('./components/plugin-info', pluginInfoComponent,
        module.hot.accept('./components/plugin-info', () => reload('./components/plugin-info', (<any>require('./components/plugin-info')).PluginInfoComponent)));

}

export function createRoutes(prefix: string = ''): RouteConfig[] {
    return [
        {
            name: 'list',
            path: prefix + '/',
            component: listComponent,
            props: (route) => ({query: route.query.q})
        },
        {
            name: 'plugin',
            path: prefix + '/plugin',
            component: pluginInfoComponent,
            props: (route) => ({path: route.query.path})
        }
    ];
}

export const createRouter = () => {
    Vue.use(VueRouter);
    return new VueRouter({mode: 'history', routes: createRoutes()});
};
