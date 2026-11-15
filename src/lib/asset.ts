export function asset(src: string) {
  return `${import.meta.env.BASE_URL}${src.replace(/^\//, "")}`
}
