export const getDisplayName = (component: any) => {
  return component.displayName || component.name || 'Component';
}