# Webpack configuration builder

The purpose of this package is to simplify tedious and complex process of configuring Webpack.
It contains typical build pipeline features with default configuration that required in wide range of projects.
At the same time it is possible to override or extend existing functionality.

## Table of contents

## Getting Started

### Prerequisites
Webpack

Additionally, every feature has its own prerequisites. More about it in [Features](#features)

### Installation
To install config builder run:
```
npm install webpack-config-builder --save-dev
```
Note that it should be installed as development dependency.

## Features <a name="features"></a>
List of supported features and their description

| Feature     | Description    |
| --------|---------|
| [AutoPrefix](#features_autoprefix)  | Automatically add browser prefixes to CSS styles based on the list of supported browsers |
| [Babel](#features_babel) | Add babel transpiler to building pipeline |
| [CleanOutputDir](#features_cleanOutputDir) | Clean output directory before outputting builded assets                            |
| CssModules                | Enable CSS Modules support for styles                                              |
| DevServer                 | Enable development server                                                          |
| ExtractVendorDependencies | Extract vendor packages to separate bundle                                         |
| GenerateIndex             | Generate index.html file based on provided template                                |
| Json                      | Add support for .json files                                                        |
| MinifyScripts             |                                                                                    |
| MinifyStyles              |                                                                                    |
| Notify                    |                                                                                    |
| RuntimeDependencies       |                                                                                    |
| SCSS                      |                                                                                    |
| Statistics                |                                                                                    |
| StyleLint                 |                                                                                    |
| TypeScript                |                                                                                    |
| TypeScriptLint            |                                                                                    |

<a name="features_autoprefix"></a>
### Autoprefix
Automatically add browser prefixes to CSS styles based on provided list of supported browsers.
Should be applied after all of the project's style features that require autoprefix (SCSS, CSS etc.)

#### Prerequisites
* autoprefixer [Link](https://github.com/postcss/autoprefixer)
* postcss-loader [Link](https://github.com/postcss/postcss-loader)

#### Usage
```
builder.autoprefix({
    supportedBrowsers: [
        'last 4 versions',
        'Safari >=10',
        'ie >= 10'
    ]
});
```

#### Arguments
| Name | Description |
| --------------|-------------|
| supportedBrowsers | List of supported browsers. [More](https://github.com/ai/browserslist) |
| postcssLoaderOptions | Any additional configuration to pass to postcss-loader |

<a name="features_babel"></a>
### Babel
Apply Babel JavaScript transpiler to code.
Should be applied after all of the project's script feature that require transpiling (TypeScript, JavaScript etc)

#### Prerequisites
* babel-loader [Link](https://github.com/babel/babel-loader)

#### Usage
```
builder.babel({
    presets: [
        ["babel-preset-es2015", { "modules": false }],
        "babel-preset-stage-2",
        "babel-preset-react"
    ],
    plugins: [
        "babel-plugin-transform-react-constant-elements",
        "babel-plugin-transform-react-inline-elements"
    ]
});
```

#### Arguments
| Name | Description |
| --------------|-------------|
| presets | Array of babel presets. Note that babel-preset-* prefix is required |
| plugins | Array of babel plugins. Note that babel-plugin-* prefix is required |
| babelLoaderOptions | Any additional configuration to pass to babel-loader |

### Clean output directory <a name="features_cleanOutputDir"></a>
Clean output directory before the build.
Should not be used with [DevServer](#features_devServer) feature as it does not output files to the disk.

#### Prerequisites
* clean-webpack-plugin [Link](https://github.com/johnagan/clean-webpack-plugin)

#### Usage
```
builder.cleanOutputDir();
```

#### Arguments
| Name | Description |
| --------------|-------------|
| cleanPluginOptions | Any additional configuration to pass to clean-webpack-plugin |

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).