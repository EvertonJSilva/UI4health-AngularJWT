const PROXY_CONFIG = [      {
    context: [
        "/api",
        "/ohmioapi"
    ],

    target: "http://localhost:56655",        
    changeOrigin: true,
    logLevel: "debug"

 }    ]

module.exports = PROXY_CONFIG;