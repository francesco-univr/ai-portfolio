declare module '@tensorflow/tfjs' {
  export type Tensor = any;
  export namespace layers {
    function dense(config: any): any;
  }
  export function sequential(): any;
  export function tensor(values: number[][]): Tensor;
  export function loadLayersModel(path: string): Promise<any>;
}