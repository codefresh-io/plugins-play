export interface PluginPreview {
    name: string;
    path: string;
    author: string;
    description: string;
    tags: [string];
}

export class Plugins {

    private _plugins: PluginPreview[];
    private error;
    private PLUGINS_URI: string;

    constructor() {
        this.PLUGINS_URI = 'https://raw.githubusercontent.com/codefresh-io/plugins/master/';
    }

    private getPlugins(): Promise<PluginPreview[]> {
        return this._plugins ? Promise.resolve(this._plugins) : <Promise<any>>(fetch(`${this.PLUGINS_URI}CATALOG.md`))
            .then(res => <Promise<string>>res.text())
            .then(this.parsePluginsReadmeFile)
            .then(plugins => {
                this._plugins = plugins;
                return plugins;
            })
            .catch(e => {
                this.error = e;
            });
    }

    private parsePluginsReadmeFile(content: string): PluginPreview[] {
        return content
            .split('\n')
            .map((line: string) => line.split('|'))
            .filter(line => line.length === 6)
            .slice(2)
            .map(plugin => {
                const nameAndLink = plugin[1];
                const name = nameAndLink.slice(nameAndLink.indexOf('[') + 1, nameAndLink.indexOf(']')).trim();
                const path = nameAndLink.slice(nameAndLink.indexOf('(') + 1, nameAndLink.indexOf('/README.md')).trim();
                if (name.replace(/-/g, '') === '') return null;
                return <PluginPreview>{
                    name,
                    author: plugin[2].trim(),
                    path,
                    description: plugin[3].trim(),
                    tags: plugin[4].slice(1, -1).split(` `)
                };
            })
            .filter(Boolean);
    }

    query(search: string) {
        return this.getPlugins()
            .then(plugins => {
                if (search) {
                    const regex = new RegExp(search.toLowerCase(), 'i');
                    return plugins.filter(plugin => (
                        regex.test(plugin.name) ||
                        regex.test(plugin.description))
                    );
                } else {
                    return [].concat(plugins);
                }
            });
    }

    get(path) {
        return Promise.all([
            fetch(`${this.PLUGINS_URI}${path}/plugin.yaml`).then(res => res.text()),
            fetch(`${this.PLUGINS_URI}${path}/README.md`).then(res => res.text()),
        ]).then(res => {
            return {
                readme: res[0],
                plugin: res[1]
            };
        });
    }

}

export const PluginsService = new Plugins();
