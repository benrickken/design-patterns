// decoratorのサンプルと同一です。
class NumberHolder {
  getNumber() {
    return 4
  }
}

// 二倍演算するデコレーター
class DoubleNumberHolder {
  constructor(numberHolder) {
    this.numberHolder = numberHolder
  }

  // コンポジションしている対象と同じインターフェースを持つ。
  getNumber() {
    // コンポジションして、元の動きに変化を加える！
    // これがデコレータの基本概念。
    // 場合によっては変化を加えないで移譲するだけの時もあります（ログ出しだけとか）
    return this.numberHolder.getNumber() * 2
  }
}

class HalfNumberHolder {
  constructor(numberHolder) {
    this.numberHolder = numberHolder
  }

  getNumber() {
    return this.numberHolder.getNumber() / 2
  }
}

function showAnswer(numberHolder) {
  console.log(`今の値は ${numberHolder.getNumber()} です`)
}

// オブジェクトを作っているところの詳細を隠すためにFactoryを作成します。
// クラスにメソッドを書いても良いですが、今回はシンプルな関数にします。
function numberHolderFactory(type) {
  let numberHolder = new NumberHolder()

  if (type === 'ダブル') {
    return new DoubleNumberHolder(numberHolder)
  }

  if (type === 'ハーフ') {
    return new HalfNumberHolder(numberHolder)
  }

  return numberHolder // typeがダブルでなければ通常オブジェクト
}

numberHolder = numberHolderFactory()
showAnswer(numberHolder)

numberHolder = numberHolderFactory('ダブル')
showAnswer(numberHolder)

numberHolder = numberHolderFactory('ハーフ')
showAnswer(numberHolder)

//////////////////////////////////////////////////////////////
// Q1. デコレータの時に作った HalfNumberHolder も numberHolderFactoryで作成できるようにしましょう。
// 「ハーフ」の文字列を渡すと HalfNumberHolder でデコレートされる実装にします。
