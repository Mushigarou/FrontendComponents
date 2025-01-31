# Prettier Configuration

```json
{
  "printWidth": 90,
  "tabWidth": 2,
  "trailingComma": "all",
  "singleQuote": true,
  "bracketSameLine": true,
  "semi": true,
  "singleAttributePerLine": true,
  "importOrder": [
    "^@/lib/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@core/(.*)$",
    "^@server/(.*)$",
    "^@ui/(.*)$",
    "^[./]"
  ],
  "importOrderSeparation": true,
  "plugins": ["@trivago/prettier-plugin-sort-imports"]
}
```

# Change path to config file

- File --> Prettier --> Settings --> search for prettier
- update path : `path_to_directory/.prettierrc`

## Command To run

`npx prettier --write .`
