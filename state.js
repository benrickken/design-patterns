class Calculator {
  #status;
  #value = 0;

  constructor() {
    this.modeDisplay();
  }

  modeDisplay() {
    console.debug("\n> ディスプレイモードです")
    this.#status = new DisplayStatus(this);
  }

  modeAdd() {
    console.debug("\n> 足し算モードです")
    this.#status = new AddStatus(this);
  }

  modeSubtract() {
    console.debug("\n> 引き算モードです")
    this.#status = new SubtractStatus(this);
  }

  input(value) {
    this.#value = this.#status.input(value);
  }

  display() {
    this.#status.display();
  }

  getValue() {
    return this.#value;
  }
}

class BasicStatus {
  #calculator = null
  constructor(calculator) {
    this.#calculator = calculator;
  }

  getValue() { return this.#calculator.getValue(); }

  display() { throw new Error('この機能は使えません') }

  input(_value) { throw new Error('この機能は使えません') }
}

class DisplayStatus extends BasicStatus {
  display() {
    console.log(`今の値は ${this.getValue()} です`);
  }
}

class AddStatus extends BasicStatus {
  display() {
    console.log('足し算をします。数値を入力してください');
  }

  input(value) {
    return this.getValue() + value;
  }
}

class SubtractStatus extends BasicStatus {
  display() {
    console.log('引き算をします。数値を入力してください');
  }

  input(value) {
    return this.getValue() - value;
  }
}

let calc = new Calculator();
calc.display();

// 足し算
calc.modeAdd();
calc.display();
calc.input(10);

// 表示状態に変更して結果の確認
calc.modeDisplay();
calc.display();

// 足し算
calc.modeAdd();
calc.display();
calc.input(20);

// 今の結果の確認
calc.modeDisplay();
calc.display();

// 引き算
calc.modeSubtract();
calc.display();
calc.input(15);

// 今の結果の確認
calc.modeDisplay();
calc.display();

try {
  calc.input(11);
} catch {
  console.log('ディスプレイモードでinputは対応していないので例外です')
}


// Calculatorは今の状態を変数で持っていて、モードの切り替えによって
// displayやinputの動作が変わります。
// 「状態を持つ」と言うと、if文で状態を判断して動きを変えそうですね。
// このコードでif文はどこにあるでしょうか。

//////////////////////////////////////////////////////////////
// Q1. 引き算のモードSubtractStatusも作成しましょう。動作確認コードも書いてください。

//////////////////////////////////////////////////////////////
// Q2. もしもStatusクラスを作成せずに、Calculatorが#statusを文字列で持っていた場合
// このコードとどのような違いが生まれるか考察しましょう。
// （Calculatorの使い方は変わらずに、実装のみ変更とします）。

// Statusクラスがない場合、各メソッド内で#statusの文字列に応じた分岐の処理を書く必要があり、
// 変化する部分がカプセル化されていないコードとなってしまう。
