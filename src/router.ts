import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import {makeHot, reload} from './util/hot-reload';

const listComponent = () => import('./components/list').then(({ListComponent}) => ListComponent);

if (process.env.ENV === 'development' && module.hot) {
    const homeModuleId = './components/list';

    // first arguments for `module.hot.accept` and `require` methods have to be static strings
    // see https://github.com/webpack/webpack/issues/5668
    makeHot('./components/list', listComponent,
        module.hot.accept('./components/list', () => reload('./components/list', (<any>require('./components/list')).ListComponent)));
}

export function createRoutes(prefix: string = ''): RouteConfig[] {
    return [{
        name: 'list',
        path: prefix + '/',
        component: listComponent,
        props: (route) => ({ query: route.query.q })
    }];
}

export const createRouter = () => {
    Vue.use(VueRouter);
    return new VueRouter({mode: 'history', routes: createRoutes()});
};
