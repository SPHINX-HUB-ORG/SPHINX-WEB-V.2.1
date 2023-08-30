import { ReactElement } from 'react';
import { AsProps, Children, Component, Props } from '../types/index';
/**
 * Creates a type-safe component with the `as` prop and `React.forwardRef`.
 *
 * @example
 * import { createComponent } from "ariakit-react-utils/system";
 *
 * type Props = {
 *   as?: "div";
 *   customProp?: boolean;
 * };
 *
 * const Component = createComponent<Props>(({ customProp, ...props }) => {
 *   return <div {...props} />;
 * });
 *
 * <Component as="button" customProp />
 */
export declare const createComponentAs: <O extends AsProps<any>>(render: (props: Props<O>) => ReactElement | Children | null) => Component<O>;
//# sourceMappingURL=createComponentAs.d.ts.map