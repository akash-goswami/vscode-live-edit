export default interface ActionDef {
    (client: Object, payload: Object): Promise<Object>;
}