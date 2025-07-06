let wasmPromise: Promise<any> | null = null;

export const loadGraphWasm = async () => {
  if (!wasmPromise) {
    wasmPromise = import('../wasm/graph_algorithms.rs?init');
  }
  return wasmPromise;
};