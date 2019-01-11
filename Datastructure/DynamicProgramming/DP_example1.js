/**
 * @author D-lyw
 * @description Dynamic Programming 动态规划
 * 
 * 
 * 动态规划（Dynamic Programming，DP）是一种将复杂问题分解成更小的子问题来解决的优化技术
 * 
 * 
        用动态规划解决问题时，要遵循三个重要步骤：
        (1) 定义子问题；
        (2) 实现要反复执行而解决子问题的部分（这一步要参考前一节讨论的递归的步骤）；
        (3) 识别并求解出边界条件。
        能用动态规划解决的一些著名的问题如下。
         背包问题：给出一组项目，各自有值和容量，目标是找出总值最大的项目的集合。这个
        问题的限制是，总容量必须小于等于“背包”的容量。
         最长公共子序列：找出一组序列的最长公共子序列（可由另一序列删除元素但不改变余
        下元素的顺序而得到）。
         矩阵链相乘：给出一系列矩阵，目标是找到这些矩阵相乘的最高效办法（计算次数尽可
        能少）。相乘操作不会进行，解决方案是找到这些矩阵各自相乘的顺序。
         硬币找零：给出面额为d 1 …d n 的一定数量的硬币和要找零的钱数，找出有多少种找零的
        方法。
         图的全源最短路径：对所有顶点对(u, v)，找出从顶点u到顶点v的最短路径。
 */

// 最少硬币找零问题
function MinCoinChange(coins) { 
    var coins = coins;
    var cache = {};

    this.makeChange = function (amount) {
        var me = this;
        if (!amount) {
            return [];
        }
        if (cache[amount]) {
            return cache[amount];
        }
        var min = [], newMin, newAmount;
        for (var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            newAmount = amount - coin;
            if (newAmount >= 0){
                newMin = me.makeChange(newAmount);
            }
            if (
                newAmount >= 0 &&
                (newMin.length < min.length - 1 || !min.length)
                && (newMin.length || !newAmount) 
            ){
                min = [coin].concat(newMin);
                console.log("new Min " + min + " for " + amount);
            }
        }
        return (cache[amount] = min)
    }
}

var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
console.log(minCoinChange.makeChange(36));