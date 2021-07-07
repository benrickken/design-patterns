class OtogiWriter {
  preProcess() {
    //処理がない場合も、とりあえずの処理が入っている場合もあります
    console.log("昔々あるところに、おじいさんとおばあさんがいました")
  }

  postProcess() {
    //処理がない場合も、とりあえずの処理が入っている場合もあります
    console.log("幸せに暮らしましたとさ。めでたしめでたし。")
  }

  writeContent() {
    //処理がない場合も、とりあえずの処理が入っている場合もあります
  }

  write() {
    // 親クラスで手順を決めている
    this.preProcess()
    this.writeContent()
    this.postProcess()
  }
}

class MomotaroTextWriter extends OtogiWriter {
  writeContent () {
    // 親クラスで足らなかったところを実装しています。
    console.log("桃太郎は犬猿きじと鬼ヶ島へ行き、鬼を退治しました。")
  }

  postProcess() {
    console.log("皆でお祝いにお酒を飲みました。めでたしめでたし。")
  }
}

let momotaro = new MomotaroTextWriter
momotaro.write()
// 実行結果
// 昔々あるところに、おじいさんとおばあさんがいました
// 桃太郎は犬猿きじと鬼ヶ島へ行き鬼を退治しました
// 皆でお祝いにお酒を飲みました。めでたしめでたし。

//////////////////////////////////////////////////////////////
// Q1. 桃太郎と同じように金太郎の話を作りましょう。
// 金太郎は 2行目に「金太郎は熊にまたがりお馬の稽古をしました。」と出力します。
// 1行目と3行目は元の動作です。

class KintaroTextWriter extends OtogiWriter {
  writeContent () {
    console.log("金太郎は熊にまたがりお馬の稽古をしました。")
  }
}

let kintaro = new KintaroTextWriter
kintaro.write()

//////////////////////////////////////////////////////////////
// Q2. 桃太郎と同じように浦島太郎の話を作りましょう。
// 1行目に「昔々、浦島太郎という若者がいました。」と出力します。
// 2行目に「浦島太郎は亀を助けたお礼に竜宮城へ行きました」と出力します。
// 3行目は元の動作です。

class UrashimataroTextWriter extends OtogiWriter {
  preProcess() {
    console.log("昔々、浦島太郎という若者がいました。")
  }

  writeContent () {
    console.log("浦島太郎は亀を助けたお礼に竜宮城へ行きました。")
  }
}

let urashimataro = new UrashimataroTextWriter
urashimataro.write()
