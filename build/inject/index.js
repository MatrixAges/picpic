const fs = require('fs-extra')
const injectData = require('./injectData')
const injectStyles = require('./injectStyles')
const injectTemplates = require('./injectTemplates')
const injectJs = require('./injectJs')

function Inject() {
      this.html = ''

      this.getSource = () => {
            this.html = fs.readFileSync('src/source.html').toString()

            return new Promise(resolve => resolve(this.html))
      }

      this.injectData = async () => {
            this.html = await injectData(this.html)

            return new Promise(resolve => resolve(this.html))
      }

      this.injectStyles = async () => {
            this.html = await injectStyles(this.html)

            return new Promise(resolve => resolve(this.html))
      }

      this.injectTemplates = async () => {
            this.html = await injectTemplates(this.html)

            return new Promise(resolve => resolve(this.html))
      }
}

const inject = async () => {
      return await new Inject()
            .getSource()
            .then(res => injectData(res))
            .then(res => injectStyles(res))
            .then(res => injectTemplates(res))
            .then(res => injectJs(res))
}

module.exports = inject