//#region react custom props types
/**
 * Indicates that the component does not have props
 */
declare interface WithoutProps {
  [key: never]: never
}
declare type WithParams<
  Params extends Record<string, string>,
  Props extends object = WithoutProps,
> = {
  params: Params
} & Props
//endregion