use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct GraphProcessor {
    nodes: Vec<f64>, // flat array [x1, y1, z1, x2, y2, z2, ...]
    edges: Vec<u32>, // flat array [source, target, source, target, ...]
}

#[wasm_bindgen]
impl GraphProcessor {
    #[wasm_bindgen(constructor)]
    pub fn new() -> GraphProcessor {
        GraphProcessor {
            nodes: Vec::new(),
            edges: Vec::new(),
        }
    }

    #[wasm_bindgen]
    pub fn load_graph(&mut self, nodes: Box<[f64]>, edges: Box<[u32]>) {
        self.nodes = nodes.into_vec();
        self.edges = edges.into_vec();
    }

    /// Very naive force-directed layout – single iteration
    #[wasm_bindgen]
    pub fn step_layout(&mut self) -> Box<[f64]> {
        let n = self.nodes.len() / 3;
        for i in 0..n {
            let idx = i * 3;
            self.nodes[idx] += 0.1; // dummy movement
        }
        self.nodes.clone().into_boxed_slice()
    }

    /// Dummy Louvain community detection – assigns random community id
    #[wasm_bindgen]
    pub fn detect_communities(&self) -> Box<[u32]> {
        let n = self.nodes.len() as u32 / 3;
        let mut res = Vec::with_capacity(n as usize);
        for i in 0..n {
            res.push(i % 5);
        }
        res.into_boxed_slice()
    }
}