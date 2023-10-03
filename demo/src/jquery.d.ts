// 全局变量声明
// declare var $: (params: () => void) => void;

// 全局函数声明 重载
interface JqueryInstance {
  html: (html: string) => void
}

declare function $(params: () => void): void;
declare function $(seletor: string): JqueryInstance

