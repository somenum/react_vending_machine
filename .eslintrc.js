module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            "jsx": true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["mobx"],
    extends: ["plugin:mobx/recommended", "react-app", "react-app/jest"],
    rules: {
        "mobx/missing-observer": "off",
        "import/prefer-default-export": "off",
        "react/function-component-definition": [
            2,
            {
                "namedComponents": "arrow-function",
                "unnamedComponents": "arrow-function"
            }
        ],
        "react/prop-types": 0,
        "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }],
        "react/jsx-props-no-spreading": "off",
        "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
    },

    /*
        rules: {
            // these values are the same as recommended
            "mobx/exhaustive-make-observable": "warn",
            "mobx/unconditional-make-observable": "error",
            "mobx/missing-make-observable": "error",
            "mobx/missing-observer": "warn",
            "mobx/no-anonymous-observer": "warn"
        }
        */
};
