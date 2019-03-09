# Boiler Plate Front End Using WebPack

##Criar uma nova página
`newFile = nome do arquivo` <br />
1. Criar o arguivo `newFile.pug` dentro da pasta `src/build/pug/newFile.pug`
1. Criar o arquivo `newFile.css` dentro da pasta `src/build/scss/newFile.scss`
1. Criar o arquivo `newfile.bundle.js` dentro da pasta `src/build/js/newFile.bundle.js`

### dentro das pasta: `config/`
#### configurações dentro do arquivo `webpack.dev.js`
adicionar dentro do entry point `entry:` o `newFile` <br />
    
    ...
    entry: {
      newFile: [
        'webpack-hot-middleware/client?reload=true',
        './src/build/js/newFile.bundle'
        ],
      otherFile: [
        'webpack-hot-middleware/client?reload=true',
        './src/build/js/otherFile.bundle'
        ],
    }
    ...

dentro da propriedade plugins adicionar: <br />
    
    plugins: [
      ...
        new htmlWebpackPlugin({
          filename: 'newFile.html',
          template: './src/build/pug/newFile.pug',
          chunks: ['newFile', 'vendors']
        }),
        new htmlWebpackIncludeAssetsPlugin({
          files: ['newFile.html'],
          assets: [
            'assets/css/newFile.css'        
          ],
          append: true
        }),
        new htmlWebpackPlugin({
          filename: 'otherFile.html',
          template: './src/build/pug/otherFile.pug',
          chunks: ['otherFile', 'vendors']
        }),
        new htmlWebpackIncludeAssetsPlugin({
          files: ['otherFile.html'],
          assets: [
            'assets/css/otherFile.css'        
          ],
          append: true
        }),
      ...
    ]

#### configurações dentro do arquivo `webpack.prod.js`

adicionar dentro do arquivo `webpack.prod.js` <br />
adicionar dentro do entry point `entry:` o `newFile` <br />   

    ...
    entry: {
      newFile: ['./src/build/js/newFile.bundle'],
      otherFile: ['./src/build/js/otherFile.bundle'],
    }
    ...

dentro da propriedade plugins adicionar: <br />

     plugins: [
      ...
        new htmlWebpackPlugin({
          filename: 'newFile.html',
          template: './src/build/pug/newFile.pug',
          chunks: ['newFile', 'vendors']
        }),
        new htmlWebpackIncludeAssetsPlugin({
          files: ['newFile.html'],
          assets: [
            'assets/css/newFile.css'        
          ],
          append: true
        }),
        new htmlWebpackPlugin({
          filename: 'otherFile.html',
          template: './src/build/pug/otherFile.pug',
          chunks: ['otherFile', 'vendors']
        }),
        new htmlWebpackIncludeAssetsPlugin({
          files: ['otherFile.html'],
          assets: [
            'assets/css/otherFile.css'        
          ],
          append: true
        }),
      ...
    ]

#third-parties (libraries externas)

#feramentas disponiveis

* **bundle-analizer**
  * Ferramenta esta commentada no arquivo `webpack.dev.js` _desabilitada por default_

* **modernizr**
  * Ferramenta esta _ativa_ por default no arquivo `webpack.dev.js` <br />
  ative as opções encontradas em [modernizr-webpack-plugin](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json), isso analiza se seu browser suporta uma determinada **feature**
* **páginas comprimidas** com extensões: br, gz

# como utilizar
###modo de desenvolvimento (development)
na linha de comando:
    
    npm run heroku:dev

###modo de produção (production)
na linha de comando:
    
    npm run prod

