export declare type EventResize = {
    target: Window | null;
};
declare const _default: (maxMediaWidth: number) => (e: Event | EventResize) => boolean;
export default _default;
