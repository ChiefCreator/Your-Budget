const config = {
    mode: "production",
    entry: {
        index: "./src/js/index.js",
        pageOperations: "./src/js/page-operations.js",
        pageAccounts: "./src/js/page-accounts.js",
    },
    output: {
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};

module.exports = config;