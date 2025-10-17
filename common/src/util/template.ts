import type { StringRecord } from "@/types/extra-utility-types"
import { isFunction } from "@/util/type-guards"

type Props = StringRecord<unknown>
type PropGetter = (props: Props) => unknown

export function templateProp(propKey: string): PropGetter {
  return (props: Props) => props[propKey]
}

/**
 * @param props - a record object containing named values to populate the template with
 * @returns the rendered string
 */
export type StringTemplate = (props: Props) => string

/**
 * a [template literal tag function]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates}
 * which functions exa
 * @see [MDN]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates} - the original source of this function.
 * Ctrl-F for "identity".
 */
export function identity(strings: TemplateStringsArray, ...substitutions: unknown[]): string {
  return String.raw({ raw: strings }, ...substitutions)
}

/**
 * a [template literal tag function]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates}
 * which takes an interpolated string template, and returns a {@linkcode StringTemplate} which can be invoked to render the template.
 *
 * When an expression in the template is of <code>function</code> type, it is assumed its signature is {@linkcode PropGetter}.
 * When rendering the template, such functions will be invoked with the render {@linkcode Props} as the only argument,
 * and their return value will be interpolated into the template.
 *
 * @see {@link String.raw} - example template literal tag function
 */
export function template(strings: TemplateStringsArray, ...substitutions: unknown[]): StringTemplate {
  function expandSubstitution(props: Props, expression: unknown): unknown {
    if (!isFunction(expression)) return expression
    const propGetter = expression as PropGetter
    return propGetter(props)
  }

  function render(props: Props): string {
    const expandedSubstitutions = substitutions.map((value) => expandSubstitution(props, value))
    return identity(strings, ...expandedSubstitutions)
  }

  return render
}
