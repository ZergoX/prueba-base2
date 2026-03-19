declare module 'yamljs' {
  const YAML: {
    load: (filePath: string) => any
    parse: (yamlString: string) => any
    stringify: (data: any, replacer?: any, space?: string | number) => string
  }
  export default YAML
}