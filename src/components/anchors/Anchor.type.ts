export type NavLinkProps = {
  children: string;
  path?: string;
  trigger?: (props: any) => Promise<void>
  isActive?: boolean;
}

export type NavLinkElement = {
  $isActive?: boolean
}