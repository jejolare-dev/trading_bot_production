module.exports = {
    // Or 'jejolare/backend' for Node.js app
    extends: ['jejolare/frontend'],

    // This is needed only if you use TypeScript
    settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
    },
    rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
        'no-unused-vars': 'off',
    },
};
