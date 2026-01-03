module.exports = {
    // Or 'jejolare/backend' for Node.js app
    extends: ['jejolare/backend'],

    // This is needed only if you use TypeScript
    settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
    },
};
