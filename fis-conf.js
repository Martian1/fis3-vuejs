// 压缩css
fis.match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});
// 压缩js
fis.match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});
// 压缩图片
fis.match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});

// 加hash
fis.match('*.{js,css,png,jpg}', {
    useHash: true
});

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
    spriter: fis.plugin('csssprites')
})

// 对 CSS 进行图片合并
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
});

fis.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: true
    })
});

// 构建vue文件
fis.match('*.vue', {
    isMod: true,
    rExt: '.js',
    useSameNameRequire: true,
    parser: fis.plugin('vue-component', {
        runtimeOnly: true, // vue@2.x 有润timeOnly模式，为ture时，template会在构建时转为render方法， 这里开启后paths中无需指定

        // styleNameJoin
        styleNameJoin: '', // 样式文件命名连接符 `component-xx-a.css`

        extractCSS: true, // 是否将css生成新的文件, 如果为false, 则会内联到js中

        // css scoped
        cssScopedIdPrefix: '_v-', // hash前缀：_v-23j232jj
        cssScopedHashType: 'sum', // hash生成模式，num：使用`hash-sum`, md5: 使用`fis.util.md5`
        cssScopedHashLength: 8 // hash 长度，cssScopedHashType为md5时有效
    })
}).match('{*.less, *.vue:less}', {
    parser: fis.plugin('less'),
    postprocessor: fis.plugin('autoprefixer'),
    rExt: '.css'
}).match('{api/**.js, store/**.js, src/**.js, config/**.js, *.vue:js, dep/d3.js}', {
    parser: fis.plugin('babel-6.x', {
        presets: ['es2015', 'stage-3'],
        plugins: ['add-module-exports']
    }),
    rExt: '.js'
});

// 禁用fis3默认的fis-hook-src
fis.unhook('components');
fis.hook('node_modules');

fis.set('project.md5Connector ', '.');

// 添加commonjs支持 (需要先安装fis3-hook-commonjs)
fis.hook('commonjs', {
    baseUrl: './',
    paths: {
        'component': 'src/component',
        'page': 'src/page'
    },
    extList: ['.js', '.jsx', '.es']
});

// 为node_modules文件添加针对mod.js的转换
fis.match('/node_modules/**.js', {
    useSameNameRequire: true,
    isMod: true
});

fis.match('/src/**.js', {
    useSameNameRequire: true,
    isMod: true
});

fis.match('{/static/js/mod.js,fis-conf.js}', {
    isMod: false
});

// 指定文件输出位置，将HTML文件的输出到根目录下
fis.match('src/page/(*.html)', {
    release: '/$1'
});
