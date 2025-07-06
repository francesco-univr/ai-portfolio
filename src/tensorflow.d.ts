declare module '@tensorflow/tfjs' {
  export type Tensor = any;

  /* ---------------------------------- Layers ---------------------------------- */
  export interface LayersModel {
    add(layer: any): void;
    compile(config: any): void;
    predict(input: Tensor | Tensor[]): Tensor;
  }

  export namespace layers {
    function dense(config: any): any;
  }

  /* --------------------------------- Factory ---------------------------------- */
  export function sequential(config?: any): LayersModel;

  /* -------------------------------- Tensor Ops -------------------------------- */
  export function tensor(values: number[][]): Tensor;

  /* ------------------------------ Model Loading ------------------------------- */
  export function loadLayersModel(path: string): Promise<LayersModel>;
}