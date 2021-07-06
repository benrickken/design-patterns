class NumberHolder {
  getNumber() {
    return 4;
  }
}

// 二倍演算するデコレーター
class DoubleNumberHolder {
  constructor(numberHolder) {
    this.numberHolder = numberHolder;
  }

  // コンポジションしている対象と同じインターフェースを持つ。
  getNumber() {
    // コンポジションして、元の動きに変化を加える！
    // これがデコレータの基本概念。
    // 場合によっては変化を加えないで移譲するだけの時もあります（ログ出しだけとか）
    return this.numberHolder.getNumber() * 2;
  }
}

function showAnswer(numberHolder) {
  console.log(`今の値は ${numberHolder.getNumber()} です`);
}

let numberHolder = new NumberHolder();
showAnswer(numberHolder);

let doubleNumberHolder = new DoubleNumberHolder(numberHolder);
showAnswer(doubleNumberHolder); // デコレートしても使い方は元のものと一緒


//////////////////////////////////////////////////////////////
// Q1. 2で割るデコレーター を書いてみましょう。

class HalfNumberHolder {
  constructor(numberHolder) {
    this.numberHolder = numberHolder;
  }

  getNumber() {
    return this.numberHolder.getNumber() / 2;
  }
}

// Q1 の確認コードをここから
// showAnswer したら 2 が戻ってくるはずです。
// デコレートしても使い方は元のものと一緒

let halfNumberHolder = new HalfNumberHolder(numberHolder);
showAnswer(halfNumberHolder);

//////////////////////////////////////////////////////////////
// Q2. コンストラクタで与えた数を加算できるデコレーター を書いてみましょう。

class AddNumberHolder {
  constructor(numberHolder, numberToAdd) {
    this.numberHolder = numberHolder;
    this.numberToAdd = numberToAdd;
  }

  getNumber() {
    return this.numberHolder.getNumber() + this.numberToAdd;
  }
}

// Q2 の確認コードをここから
// コンストラクタで元のnumberHolderと一緒に3を渡してください。
// showAnswer したら 7 が戻ってくるはずです。

let addNumberHolder = new AddNumberHolder(numberHolder, 3);
showAnswer(addNumberHolder);
