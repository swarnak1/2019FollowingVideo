require("@babel/polyfill")
import config from './config'
import App from './app'

const app = new App({ config })
app.run()