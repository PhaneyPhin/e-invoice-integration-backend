module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "ignorePatterns": ["**/enums/**"],
    "rules": {
        "@typescript-eslint/no-unused-vars":  [
            "warn",
            {
                "args": "all",
                "argsIgnorePattern": "^_",
                "ignoreRestSiblings": true
            }
        ],
        "no-unused-vars": [
            "warn",
            {
                "args": "all",
                "argsIgnorePattern": "^_",
                "ignoreRestSiblings": true
            }
        ],
        "@typescript-eslint/no-explicit-any": "off"
    }
}
