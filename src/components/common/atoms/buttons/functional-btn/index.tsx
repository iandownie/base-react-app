import * as React from 'react'

export interface IFunctionalBtn
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  keyRef?: string
  buttonRef?: React.Ref<HTMLButtonElement>
  'data-locator'?: string | never
  value?: never
  id: string
  ariaLabel?: string
}

// Provides all of the functionality we want in all of our buttons, but it style agnostic.
export const FunctionalBtn = (props: IFunctionalBtn) => {
  const {
    type = 'button',
    ariaLabel,
    children,
    tabIndex = 0,
    title = typeof children === 'string' && children.length > 10
      ? children
      : null,
    id,
    keyRef,
    buttonRef,
    ...rest
  } = props
  return (
    <button
      type={type}
      tabIndex={tabIndex}
      id={id}
      data-locator={id}
      key={keyRef || id}
      title={title || undefined}
      ref={buttonRef}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  )
}
;(FunctionalBtn as any).displayName = 'FunctionalBtn'
