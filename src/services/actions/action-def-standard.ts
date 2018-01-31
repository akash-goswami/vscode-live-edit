export default interface ActionDef {
    (endpoints: Object, payload: Object): Promise<Object>;
}