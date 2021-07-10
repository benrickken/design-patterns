// シリアライズ=直列化と言います。
// バイナリ（今は文字列と考えても良いです）で保存可能な形に加工するような意味合いです。
class ObjectSerializer {
  #strategy
  constructor(strategy) {
    // 与えられたstrategyを動作の詳細とします
    this.#strategy = strategy;
  }

  serialize(object) {
    return this.#strategy.serialize(object);
  }
}

class JSONSerializeStrategy {
  serialize(object) {
    return JSON.stringify(object);
  }
}

class CsvSerializeStrategy {
  serialize(object) {
    let keys = Object.getOwnPropertyNames(object);
    let ret = `${keys.join(',')}\n`;
    ret += keys.map(key => { return object[key] }).join(',')
    return ret;
  }
}

//大抵Strategyはコンストラクタで指定するので、それに合わせました。
let serializer = new ObjectSerializer(new JSONSerializeStrategy);
console.log(serializer.serialize({ title: "坊ちゃん", pageSize: 520 }));

let serializer2 = new ObjectSerializer(new CsvSerializeStrategy);
// 同じ利用方法で、同じデータを違う形に加工できます。
console.log(serializer2.serialize({ title: "坊ちゃん", pageSize: 520 }));

//////////////////////////////////////////////////////////////
// Q1. 下記のencode 関数を利用して EncodeSerializeStrategyを作成しましょう。
function encode(object) {
  return encodeURIComponent(JSON.stringify(object));
}

class EncodeSerializeStrategy {
  serialize(object) {
    return encode(object);
  }
}

let serializer3 = new ObjectSerializer(new EncodeSerializeStrategy);
// 同じ利用方法で、同じデータを違う形に加工できます。
console.log(serializer3.serialize({ title: "坊ちゃん", pageSize: 520 }));

//////////////////////////////////////////////////////////////
// Q2. クラスの構造がほとんど同じになるStateとStrategyの違いについて
// 「それぞれの目的を中心にして」記述してみましょう。

// Stateパターンではオブジェクトが内部状態に基づいて振る舞いを変更できることを目的にしていることに対して、
// Strategyパターンでは交換可能な振る舞いをカプセル化することで、使用すべき振る舞いを決められるようにすることを目的にしている。
