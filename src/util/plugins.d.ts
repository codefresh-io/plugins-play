export interface PluginPreview {
    name: string;
    path: string;
    author: string;
    description: string;
    tags: [string];
}
export declare class Plugins {
    private _plugins;
    private error;
    private PLUGINS_URI;
    constructor();
    private getPlugins();
    private parsePluginsReadmeFile(content);
    query(search: string): Promise<any[]>;
    get(path: any): Promise<{
        plugin: any;
        readme: any;
    }>;
}
export declare const PluginsService: Plugins;
