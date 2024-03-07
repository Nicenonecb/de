
const getRelatedPackages = (pkgs) => {
  const dependenciesMap = new Map();
  pkgs.forEach(({ name, dependencies = {} }) => {
    Object.keys(dependencies).forEach(dep => {
      if (pkgs.some(pkg => pkg.name === dep)) {
        if (!dependenciesMap.has(name)) {
          dependenciesMap.set(name, []);
        }
        dependenciesMap.get(name).push(dep);
      }
    });
  });

  const relatedPackages = [];
  dependenciesMap.forEach((deps, name) => {
    deps.forEach(dep => {
      relatedPackages.push([dep, name]);
    });
  });

  return relatedPackages;
};


function EdgeNode(id) {
  this.id = id;
  this.afters = [];
  this.indegree = 0;
}


const findOrder = (edges) => {
  const nodes = new Map();
  const result = [];
  const queue = [];

  // 构建图的节点和边
  edges.forEach(([from, to]) => {
    if (!nodes.has(from)) {
      nodes.set(from, new EdgeNode(from));
    }
    if (!nodes.has(to)) {
      nodes.set(to, new EdgeNode(to));
    }
    nodes.get(from).afters.push(to);
    nodes.get(to).indegree++;
  });

  // 初始化队列
  nodes.forEach(node => {
    if (node.indegree === 0) {
      queue.push(node.id);
    }
  });

  // 检测循环依赖
  if (queue.length === 0) {
    console.error('存在循环依赖，请检查配置');
    return []; // 返回空数组表示无法进行排序
  }

  // 执行拓扑排序
  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);
    nodes.get(current).afters.forEach(next => {
      if (--nodes.get(next).indegree === 0) {
        queue.push(next);
      }
    });
  }

  // 检查是否所有节点都被处理，以确认没有循环依赖
  if (result.length !== nodes.size) {
    console.error('检测到循环依赖，无法完成排序');
    return [];
  }

  return result;
};

module.exports = {
  getRelatedPackages,
  findOrder
}
