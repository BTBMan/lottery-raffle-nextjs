import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    react: true,
  },
).prepend(compat.config({
  extends: 'plugin:@next/next/core-web-vitals',
}))
