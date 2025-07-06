declare module '*.rs?init' {
  const init: () => Promise<any>;
  export default init;
}