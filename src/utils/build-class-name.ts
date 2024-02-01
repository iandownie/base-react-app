export const classNameBuilder = (styles: { [key: string]: string }) => {
  return (...classes: string[]) => {
    return ([...classes] as string[])
      .map((currentClass: string) => styles[currentClass] || currentClass)
      .join(' ')
  }
}

export const getSeleniumHelper = (
  Component: React.FC<any> | React.Component
) => {
  const name =
    typeof Component === 'function'
      ? Component.name
      : Component.constructor.name
  return `component-${name}`
}
