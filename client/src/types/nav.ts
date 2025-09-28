export type NavItem = Readonly<{
  slug: string
  title: string
  href?: string
  /**
   * if `true`, render this item as a non-interactive `<span>`, instead of a `<Link>`
   */
  disabled?: boolean
  /**
   * if `true`, open this link in a new tab
   */
  external?: boolean
}>

export type NavItemWithChildren<ChildType extends NavItem = NavItem> = NavItem &
  Readonly<{
    items: readonly ChildType[]
  }>
