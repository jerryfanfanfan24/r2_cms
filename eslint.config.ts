import { globalIgnores } from 'eslint/config'
import {
  defineConfigWithVueTs,
  vueTsConfigs
} from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import pluginPrettier from 'eslint-plugin-prettier'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // Vue 官方推荐规则
  pluginVue.configs['flat/essential'],

  // TypeScript 推荐规则
  vueTsConfigs.recommended,

  // 关掉与 Prettier 冲突的 ESLint 规则（等价 eslint-config-prettier）
  skipFormatting,

  // 启用 eslint-plugin-prettier + 规则
  {
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off'
    }
  }
)
