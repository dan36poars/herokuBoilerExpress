# Boiler Plate Front End Using WebPack

# como utilizar
### modo de desenvolvimento (development)
na linha de comando:
    
    npm run heroku:dev

### modo de produção (production)
na linha de comando:
    
    npm run prod

> Após executar o comando `npm run prod` a pasta `dist` irá ser criada no root do projeto. :+1:

## Criar uma nova página
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
            'css/newFile.css'        
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
            'css/otherFile.css'        
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

> **Mudanças feitas no arquivo `webpack.dev.js` deve ser replicada no arquivo `webpack.prod.js`. Mas de maneira adequada para cada arquivo. Principalmente, na adição de assets ao projeto. O primeiro não precisa da palavra `assets`. O segundo precisa dessa palavra.**

# Third-parties (libraries externas)

# Feramentas disponiveis

* **bundle-analizer**
  * Ferramenta esta commentada no arquivo `webpack.dev.js` **_desabilitada por default_**

* **modernizr**
  * Ferramenta esta _ativa_ por default no arquivo `webpack.dev.js` <br />
  ative as opções encontradas em [modernizr-webpack-plugin](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json), isso analiza se seu browser suporta uma determinada **feature**
* **páginas comprimidas** com extensões: br, gz

* **Bootstrap 4**

* **Jquery**

* **Font-awesome 4.7**

* **Sass**

* **Pug**

* **Pronto para deploy no Heroku**

# Adicionando Assets

quando você cria assets. E este não é incluido pelo Webpack, então pode-se adiciona-lo da seguinte maneira:

**No arquivo webpack.dev.js**

    ...
    , 
    new htmlWebpackIncludeAssetsPlugin({
      files: ['index.html'],
      assets: ['css/font-awesome.css'],
      append: true
    }),
    ...

> no arquivo `webpack.prod.js` apenas adiciona-se a saida compilada pelo webpack no modo de development.

**No arquivo webpack.prod.js**

    ...
    , 
    new htmlWebpackIncludeAssetsPlugin({
      files: ['index.html'],
      assets: ['assets/css/font-awesome.css'],
      append: true
    }),
    ...

> no arquivo `webpack.prod.js` sempre adiciona-se a plalava `assets`, pois indica a pasta de saida do projeto.

Veja que adicionamos o asset `css/font-awesome.css` para a página `index.html`. Isso ocorreu devido a inserção no arquivo index.bundle.js do sequinte código:

    ...    
    import '../../../node_modules/font-awesome/css/font-awesome.css';
    ...

A inserção dessa linha fez com que o webpack cria-se um asset na compilação do código, mas não o incluiu diretamente na página `index.html`. Devido a isso tem-se que inclui-lá com ajuda do plugin `html-webpack-include-assets-plugin`. Toda vez que criar-se um asset no código compilado, pode-se ser adicionado por meio desse plugin a uma específica página.

# Instalando fonts customizadas

**A pasta build/fonts**

- Esta pasta serve para ser colocada as fontes
  customizadas.

**A pasta build/style-fonts**

- Esta pasta é onde se coloca os estilos de suas fontes
customizadas.

**Como utilizar fontes customizadas**

Os arquivos de entry point ex: `index.bundle.js` no qual voce deseja que
a página enxergue essas fontes basta importar seus arquivos fonts `scss` nesse entry point.
por padrão todas as fontes que você colocar serão carregadas de modo global.
O arquivo `commons.bundle.js` instala as fontes do projeto. 

depois dentro do arquivo `scss` da página desejada, importe o estilo
da font customizada. Dentro da pasta `build/scss/_components` a um arquivo `_custom-fonts.scss`
esse arquivo chama as fonts que estão na pasta `build/style-fonts` que existe um arquivo no qual onde você
carrega suas fonts customizadas para o projeto.

a página de estilo `scss` que importar o arquivo `build/style-fonts/font-custom.css` customizada é
que irá enxergar os icones da font customizada.

você pode muito bem criar outro arquivo dentro desta pasta e carregar ele num outro arquivo `scss`, mas
esse arquivo deve ser chamado por um arquivo entry point válido `ex: index.bundle.js`.

**instalar uma font para uma determinada página**

- copie os arquivos da fonte para a pasta `build/fonts`

- crie um arquivo dentro da pasta `build/style-fonts` o nome que você desejar.
  O código font-face fica dentro desse arquivo. Crie uma classe para manipular esse font-face.

- chame esse arquivo dentro da página que você quer que essa fonte seja enxergada pelo arquivo. neste caso quero que a página contato.html enxergue essa font. portanto instalo ela dentro de ex: `build/scss/_components/_contato.scss`. Código: `@import '../../build/style-fonts/new-font.css';`

- para terminar faça o import das fontes dentro do entry point do arquivo `build/js/contato.bundle.js`. 

Ex:

        ...
        import '../fonts/Ubuntu-BoldItalic.ttf';
        import '../fonts/Ubuntu-Italic.ttf';
        import '../fonts/Ubuntu-Light.ttf';
        import '../fonts/Ubuntu-LightItalic.ttf';
        import '../fonts/Ubuntu-Medium.ttf';
        import '../fonts/Ubuntu-MediumItalic.ttf';
        import '../fonts/Ubuntu-Regular.ttf';        
        ...

Caso você queira que a font seja instalada globalmente, em vez de instalar a fonte dentro do arquivo `build/scss/_components/_contato.scss` basta chamar
o arquivo `build/style-fonts/new-fonts.css` dentro do arquivo `build/scss/_components/_custom-fonts.scss` desta maneira sua
font customizada será enxergada por todas as páginas. e chamar as fontes dentro do entry point `build/js/commons.bundle.js`

  



