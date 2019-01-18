module.exports = {
  lintOnSave: false,
  // chainWebpack: (config) => {
  //     config
  //       .module
  //       .rule('vue')
  //       .uses
  //       .get('vue-loader')
  //       .tap(({ loaders, loaders: { scss }, ...options }) => ({
  //         ...options,
  //         loaders: {
  //           ...loaders,
  //           scss: [
  //             ...scss,
  //             {
  //               loader: 'sass-resources-loader',
  //               options: {
  //                 resources: [
  //                   './src/styles/shared.scss',
  //                 ],
  //               },
  //             },
  //           ],
  //         },
  //       }
  //     )
  //   );
  // }
}
