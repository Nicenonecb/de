const { getRelatedPackages, findOrder } = require('./dependencyResolver');

describe('Dependency Resolver Tests', () => {
  it('should correctly resolve related packages and find their load order', () => {
    // 定义包（modules）和它们的依赖
    const packages = [
      {
        name: '@noic/1',
        dependencies: {
          "@noic/2": "7.0.1",
          "@noic/3": "7.0.1"
        }
      },
      {
        name: '@noic/2',
        dependencies: {
          "@noic/3": "7.0.1"
        }
      },
      {
        name: '@noic/3'
      },
      {
        name: '@noic/4' // 注意这个包没有被其他包依赖，也没有依赖其他包
      }
    ];

    // 测试getRelatedPackages函数
    const dependencies = getRelatedPackages(packages);
    expect(dependencies).toStrictEqual([
      ['@noic/2', '@noic/1'],
      ['@noic/3', '@noic/1'],
      ['@noic/3', '@noic/2']
    ]);

    // 测试findOrder函数
    const order = findOrder(dependencies);
    // 期望的加载顺序包括所有有依赖关系的包，未包括独立的'@noic/4'包
    expect(order).toStrictEqual(['@noic/3', '@noic/2', '@noic/1']);

  });
});
