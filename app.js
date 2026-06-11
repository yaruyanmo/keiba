/**
 * Keiba Hub - Application Logic (2026 Real-Time Calendar & Taker Edition)
 * Powered by 5-Factor AI Prediction & Live Weather API
 */

(function () {
  'use strict';

  // --- 1. DATA DEFINITIONS (24 VENUES & JOCKEYS) ---

  const VENUES = {
    // JRA (10 Venues)
    "札幌": { host: "jra", name: "札幌競馬場", lat: 43.078, lon: 141.325, direction: "右", type: "芝", dists: [1200, 1500, 1800, 2000, 2600] },
    "函館": { host: "jra", name: "函館競馬場", lat: 41.777, lon: 140.782, direction: "右", type: "芝", dists: [1200, 1800, 2000, 2600] },
    "福島": { host: "jra", name: "福島競馬場", lat: 37.765, lon: 140.489, direction: "右", type: "芝", dists: [1200, 1800, 2000, 2600] },
    "新潟": { host: "jra", name: "新潟競馬場", lat: 37.950, lon: 139.186, direction: "左", type: "芝", dists: [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400] },
    "東京": { host: "jra", name: "東京競馬場", lat: 35.663, lon: 139.485, direction: "左", type: "芝", dists: [1400, 1600, 1800, 2000, 2300, 2400, 2500, 3400] },
    "中山": { host: "jra", name: "中山競馬場", lat: 35.727, lon: 139.962, direction: "右", type: "芝", dists: [1200, 1600, 1800, 2000, 2200, 2500, 3600] },
    "中京": { host: "jra", name: "中京競馬場", lat: 35.066, lon: 136.988, direction: "left", type: "芝", dists: [1200, 1400, 1600, 2000, 2200] },
    "京都": { host: "jra", name: "京都競馬場", lat: 34.908, lon: 135.724, direction: "右", type: "芝", dists: [1200, 1400, 1600, 1800, 2000, 2200, 2400, 3000, 3200] },
    "阪神": { host: "jra", name: "阪神競馬場", lat: 34.767, lon: 135.362, direction: "右", type: "芝", dists: [1200, 1400, 1600, 1800, 2000, 2200, 2400, 3000] },
    "小倉": { host: "jra", name: "小倉競馬場", lat: 33.843, lon: 130.875, direction: "右", type: "芝", dists: [1200, 1800, 2000, 2600] },

    // NAR (14 Venues)
    "大井": { host: "nar", name: "大井競馬場", lat: 35.592, lon: 139.739, direction: "右", type: "ダート", dists: [1000, 1200, 1400, 1600, 1700, 1800, 2000, 2400, 2600] },
    "川崎": { host: "nar", name: "川崎競馬場", lat: 35.534, lon: 139.715, direction: "左", type: "ダート", dists: [900, 1400, 1500, 1600, 2000, 2100] },
    "船橋": { host: "nar", name: "船橋競馬場", lat: 35.690, lon: 140.003, direction: "左", type: "ダート", dists: [1000, 1200, 1500, 1600, 1700, 1800, 2200] },
    "浦和": { host: "nar", name: "浦和競馬場", lat: 35.861, lon: 139.670, direction: "左", type: "ダート", dists: [800, 1300, 1400, 1500, 1900, 2000] },
    "園田": { host: "nar", name: "園田競馬場", lat: 34.767, lon: 135.438, direction: "right", type: "ダート", dists: [820, 1230, 1400, 1700, 1870] },
    "高知": { host: "nar", name: "高知競馬場", lat: 33.502, lon: 133.548, direction: "右", type: "ダート", dists: [800, 1300, 1400, 1600, 1900] },
    "佐賀": { host: "nar", name: "佐賀競馬場", lat: 33.376, lon: 130.407, direction: "右", type: "ダート", dists: [900, 1300, 1400, 1750, 1800, 2000, 2500] },
    "門別": { host: "nar", name: "門別競馬場", lat: 42.607, lon: 142.025, direction: "右", type: "ダート", dists: [1000, 1100, 1200, 1500, 1600, 1700, 1800, 2000] },
    "名古屋": { host: "nar", name: "名古屋競馬場", lat: 35.109, lon: 136.721, direction: "右", type: "ダート", dists: [920, 1500, 1700, 2000, 2100] },
    "笠松": { host: "nar", name: "笠松競馬場", lat: 35.372, lon: 136.764, direction: "右", type: "ダート", dists: [800, 1400, 1600, 1800, 1900] },
    "金沢": { host: "nar", name: "金沢競馬場", lat: 36.634, lon: 136.657, direction: "右", type: "ダート", dists: [900, 1300, 1400, 1500, 1700, 1900, 2000, 2100, 2600] },
    "盛岡": { host: "nar", name: "盛岡競馬場", lat: 39.697, lon: 141.229, direction: "左", type: "芝", dists: [1000, 1200, 1400, 1600, 1700, 1800, 2000, 2400] },
    "水沢": { host: "nar", name: "水沢競馬場", lat: 39.141, lon: 141.171, direction: "右", type: "ダート", dists: [850, 1300, 1400, 1600, 1900, 2000] },
    "帯広": { host: "nar", name: "帯広競馬場", lat: 42.923, lon: 143.178, direction: "直線", type: "ダート", dists: [200] }
  };

  const JOCKEYS = {
    jra: [
      { name: "C.ルメール", skill: 98 },
      { name: "川田将雅", skill: 96 },
      { name: "坂井瑠星", skill: 92 },
      { name: "武豊", skill: 93 },
      { name: "戸崎圭太", skill: 89 },
      { name: "横山武史", skill: 89 },
      { name: "松山弘平", skill: 87 },
      { name: "D.レーン", skill: 95 },
      { name: "西村淳也", skill: 84 },
      { name: "岩田望来", skill: 85 },
      { name: "北村友一", skill: 83 },
      { name: "横山典弘", skill: 86 },
      { name: "丹内祐次", skill: 80 },
      { name: "吉村誠之助", skill: 78 }
    ],
    nar: [
      { name: "吉原寛人", skill: 97 },
      { name: "森泰斗", skill: 95 },
      { name: "御神本訓史", skill: 93 },
      { name: "笹川翼", skill: 93 },
      { name: "澤田龍太郎", skill: 81 },
      { name: "落合玄太", skill: 87 },
      { name: "野畑凌", skill: 85 },
      { name: "川須栄彦", skill: 83 }
    ]
  };

  // Preset Horse Database (Fully Loaded with 2026 JRA & NAR Star entries)
  const HORSE_DATABASE = {
    "レガレイラ": {
      name: "レガレイラ", gender: "牝", age: 5, runStyle: "差し", speedIndex: 96,
      jockey: "C.ルメール", trainer: "木村哲也 (美浦)",
      clockwisePct: 90, counterClockwisePct: 95, heavyTrackPerformance: 80,
      venuePerformance: { "阪神": 95, "東京": 95, "中山": 100 },
      pedigree: "父: スワーヴリチャード / 母父: ハービンジャー",
      pastRaces: [
        { date: "2025/11/12", venue: "京都", name: "エリザベス女王杯 (G1)", distance: "2200", condition: "良", place: 3, popular: 1, margin: "0.2秒差", jockey: "C.ルメール" },
        { date: "2025/04/14", venue: "中山", name: "皐月賞 (G1)", distance: "2000", condition: "良", place: 6, popular: 1, margin: "0.5秒差", jockey: "北村宏司" },
        { date: "2024/12/28", venue: "中山", name: "ホープフルS (G1)", distance: "2000", condition: "良", place: 1, popular: 1, margin: "-0.1秒差", jockey: "C.ルメール" }
      ]
    },
    "ダノンデサイル": {
      name: "ダノンデサイル", gender: "牡", age: 5, runStyle: "差し", speedIndex: 95,
      jockey: "戸崎圭太", trainer: "安田翔伍 (栗東)",
      clockwisePct: 90, counterClockwisePct: 100, heavyTrackPerformance: 85,
      venuePerformance: { "阪神": 90, "東京": 100, "京都": 95 },
      pedigree: "父: エピファネイア / 母父: Congrats",
      pastRaces: [
        { date: "2025/05/26", venue: "東京", name: "日本ダービー (G1)", distance: "2400", condition: "良", place: 1, popular: 9, margin: "-0.4秒差", jockey: "横山典弘" },
        { date: "2025/01/14", venue: "京都", name: "京成杯 (G3)", distance: "2000", condition: "良", place: 1, popular: 5, margin: "-0.1秒差", jockey: "横山典弘" }
      ]
    },
    "シンエンペラー": {
      name: "シンエンペラー", gender: "牡", age: 5, runStyle: "先行", speedIndex: 96,
      jockey: "坂井瑠星", trainer: "矢作芳人 (栗東)",
      clockwisePct: 90, counterClockwisePct: 95, heavyTrackPerformance: 95,
      venuePerformance: { "阪神": 95, "東京": 90, "中山": 95 },
      pedigree: "父: Siyouni / 母父: Galileo",
      pastRaces: [
        { date: "2025/05/26", venue: "東京", name: "日本ダービー (G1)", distance: "2400", condition: "良", place: 3, popular: 2, margin: "0.5秒差", jockey: "坂井瑠星" },
        { date: "2025/04/14", venue: "中山", name: "皐月賞 (G1)", distance: "2000", condition: "良", place: 5, popular: 2, margin: "0.4秒差", jockey: "坂井瑠星" },
        { date: "2025/03/03", venue: "中山", name: "弥生賞 (G2)", distance: "2000", condition: "良", place: 2, popular: 2, margin: "0.2秒差", jockey: "川田将雅" }
      ]
    },
    "シュガークン": {
      name: "シュガークン", gender: "牡", age: 5, runStyle: "先行", speedIndex: 93,
      jockey: "吉村誠之助", trainer: "清水久詞 (栗東)",
      clockwisePct: 95, counterClockwisePct: 90, heavyTrackPerformance: 80,
      venuePerformance: { "阪神": 95, "東京": 90, "京都": 95 },
      pedigree: "父: ドゥラメンテ / 母父: サクラバクシンオー",
      pastRaces: [
        { date: "2025/05/26", venue: "東京", name: "日本ダービー (G1)", distance: "2400", condition: "良", place: 5, popular: 5, margin: "0.6秒差", jockey: "武豊" },
        { date: "2025/04/27", venue: "東京", name: "青葉賞 (G2)", distance: "2400", condition: "良", place: 1, popular: 2, margin: "-0.0秒差", jockey: "武豊" }
      ]
    },
    "コスモキュランダ": {
      name: "コスモキュランダ", gender: "牡", age: 5, runStyle: "差し", speedIndex: 94,
      jockey: "横山武史", trainer: "加藤士津八 (美浦)",
      clockwisePct: 95, counterClockwisePct: 80, heavyTrackPerformance: 90,
      venuePerformance: { "中山": 100, "東京": 85, "阪神": 90 },
      pedigree: "父: アルアイン / 母父: Southern Image",
      pastRaces: [
        { date: "2025/05/26", venue: "東京", name: "日本ダービー (G1)", distance: "2400", condition: "良", place: 6, popular: 6, margin: "0.7秒差", jockey: "M.デムーロ" },
        { date: "2025/04/14", venue: "中山", name: "皐月賞 (G1)", distance: "2000", condition: "良", place: 2, popular: 7, margin: "0.0秒差", jockey: "J.モレイラ" },
        { date: "2025/03/03", venue: "中山", name: "弥生賞 (G2)", distance: "2000", condition: "良", place: 1, popular: 6, margin: "-0.2秒差", jockey: "M.デムーロ" }
      ]
    },
    "メイショウタバル": {
      name: "メイショウタバル", gender: "牡", age: 5, runStyle: "逃げ", speedIndex: 94,
      jockey: "武豊", trainer: "石橋守 (栗東)",
      clockwisePct: 95, counterClockwisePct: 70, heavyTrackPerformance: 100,
      venuePerformance: { "阪神": 100, "中山": 80 },
      pedigree: "父: ゴールドシップ / 母父: フレンチデピュティ",
      pastRaces: [
        { date: "2025/04/14", venue: "中山", name: "皐月賞 (G1)", distance: "2000", condition: "良", place: 17, popular: 4, margin: "2.4秒差", jockey: "浜中俊" },
        { date: "2025/03/23", venue: "阪神", name: "毎日杯 (G3)", distance: "1800", condition: "重", place: 1, popular: 5, margin: "-1.0秒差", jockey: "坂井瑠星" }
      ]
    },
    "シャマル": {
      name: "シャマル", gender: "牡", age: 7, runStyle: "逃げ", speedIndex: 95,
      jockey: "川須栄彦", trainer: "松下武士 (栗東)",
      clockwisePct: 90, counterClockwisePct: 80, heavyTrackPerformance: 95,
      venuePerformance: { "船橋": 100, "大井": 95 },
      pedigree: "父: スマートファルコン / 母父: アグネスデジタル",
      pastRaces: [
        { date: "2026/05/05", venue: "船橋", name: "かしわ記念 (Jpn1)", distance: "1600", condition: "良", place: 1, popular: 5, margin: "-0.2秒差", jockey: "川須栄彦" }
      ]
    },
    "ウィルソンテソーロ": {
      name: "ウィルソンテソーロ", gender: "牡", age: 5, runStyle: "差し", speedIndex: 96,
      jockey: "川田将雅", trainer: "小手川準 (美浦)",
      clockwisePct: 95, counterClockwisePct: 90, heavyTrackPerformance: 85,
      venuePerformance: { "船橋": 95, "大井": 100 },
      pedigree: "父: キタサンブラック / 母父: Uncle Mo",
      pastRaces: [
        { date: "2026/05/05", venue: "船橋", name: "かしわ記念 (Jpn1)", distance: "1600", condition: "良", place: 5, popular: 3, margin: "0.7秒差", jockey: "川田将雅" }
      ]
    }
  };

  // 1-Week Schedule Preset Races (2026 Season)
  const SAMPLE_RACES = {
    // 6/14 JRA Takarazuka Kinen (G1) - Main Default (Determine Waku-jun)
    "takarazuka": `第67回 宝塚記念 (G1) 阪神 11R 芝 右 2200m
1 1 マイユニバース 牡4 58.0 横山典弘 45.0
1 2 ミュージアムマイル 牡4 58.0 D.レーン 25.0
2 3 シンエンペラー 牡5 58.0 坂井瑠星 4.5
2 4 コスモキュランダ 牡5 58.0 横山武史 6.4
3 5 クロワデュノール 牡4 58.0 北村友一 12.0
3 6 レガレイラ 牝5 56.0 C.ルメール 2.6
4 7 ダノンデサイル 牡5 58.0 戸崎圭太 3.8
4 8 タガノデュード 牡5 58.0 高杉吏麒 68.0
5 9 コスモキュランダ 牡5 58.0 横山武史 6.4
5 10 ジューンテイク 牡5 58.0 松山弘平 14.0
6 11 シンエンペラー 牡5 58.0 坂井瑠星 4.5
6 12 マイネルエンペラー 牡6 58.0 川田将雅 18.0
7 13 シェイクユアハート 牡6 58.0 古川吉洋 130.0
7 14 スティンガーグラス 牡5 58.0 岩田望来 28.0
7 15 マイユニバース 牡4 58.0 横山典弘 45.0
8 16 メイショウタバル 牡5 58.0 武豊 7.2
8 17 レガレイラ 牝5 56.0 C.ルメール 2.6
8 18 ミステリーウェイ セ8 58.0 松本大輝 150.0`,

    // 6/11 NAR Hokkaido Sprint Cup (Jpn3)
    "hokkaido": `第30回 北海道スプリントC (Jpn3) 門別 11R ダート 右 1200m
1 1 エイシンマシーン 牡4 56.0 落合玄太 18.2
2 2 ジャスティンビスタ 牡5 57.0 坂井瑠星 3.5
3 3 スマートアヴァロン 牡6 56.0 岡部誠 28.0
4 4 スズハローム 牡4 56.0 戸崎圭太 4.6
5 5 シゲルルビー 牝4 54.0 赤岡修次 45.0
6 6 カレンマック 牡3 53.0 吉原寛人 12.0
7 7 シャマル 牡7 59.0 川須栄彦 1.9
8 8 リュウノシンゲン 牡6 56.0 森泰斗 15.6`,

    // 6/13 JRA Hakodate Sprint Stakes (G3)
    "hakodate": `第33回 函館スプリントS (G3) 函館 11R 芝 右 1200m
1 1 ナムラクレア 牝5 56.0 浜中俊 2.1
2 2 トウシンマカオ 牡5 57.0 菅原明良 4.3
3 3 キミワクイーン 牝5 55.0 横山武史 8.5
4 4 サトノレーヴ 牡5 57.0 レーン 6.2
5 5 アサカラキング 牡4 57.0 斎藤新 12.4
6 6 ビッグシーザー 牡4 57.0 坂井瑠星 7.8
7 7 シナモンスティック 牝5 55.0 丹内祐次 32.0
8 8 ジュビリーヘッド 牡7 57.0 松山弘平 48.0`,

    // 6/14 JRA Epsom Cup (G3)
    "epsom": `第43回 エプソムカップ (G3) 東京 11R 芝 左 1800m
1 1 レーベンスティール 牡4 58.0 戸崎圭太 2.4
2 2 ニシノレヴナント 牡4 57.0 大野拓弥 18.0
3 3 グランディア 牡5 57.0 三浦皇成 12.5
4 4 マイネルケレトリウス 牡4 57.0 津村明秀 15.0
5 5 ヴェルトライゼンデ 牡7 58.0 鳴海颯 8.2
6 6 トゥデイイズザデイ 牡5 57.0 津村明秀 22.0
7 7 サイルーン 牡5 57.0 レーン 6.8
8 8 ルージュリナージュ 牝5 55.0 丸山元気 35.0`,

    // 6/17 NAR Kanto Oaks (Jpn2)
    "kanto": `第62回 関関オークス (Jpn2) 川崎 11R ダート 左 2100m
1 1 プリンセスアリー 牝3 54.0 森泰斗 14.5
2 2 アンデスビエント 牝3 54.0 田口貫太 3.2
3 3 クリスマスパレード 牝3 54.0 石川裕紀人 4.8
4 4 ミューチャリー 牝3 54.0 御神本訓史 25.0
5 5 グラインドアウト 牝3 54.0 赤岡修次 42.0
6 6 シンメデージー 牝3 54.0 吉原寛人 8.5
7 7 メイショウヨシノ 牝3 54.0 川田将雅 5.6
8 8 ローリエフレイバー 牝3 54.0 野畑凌 18.0`,

    // Kept for backward compatibility mapping
    "arima": "", 
    "daishoten": ""
  };

  // Set backward compatibility aliases
  SAMPLE_RACES.arima = SAMPLE_RACES.takarazuka;
  SAMPLE_RACES.daishoten = SAMPLE_RACES.hokkaido; // Fallback mapping

  // --- 3. APPLICATION STATE ---
  const state = {
    userBalance: 10000,
    activeTab: 'dashboard',
    currentHostType: 'jra',
    currentVenueKey: '阪神', // Takarazuka Kinen Default
    currentRaceNum: '11',
    currentRace: {
      name: "宝塚記念",
      grade: "G1",
      venue: "阪神",
      distance: "2200",
      type: "芝",
      direction: "右",
      trackCondition: "良",
      horses: []
    },
    activeInspectionHorseId: null,
    radarChart: null,
    bettingTrendChart: null,
    selectedBetHorseId: null,
    selectedBetType: 'win',
    activeBet: null,
    bettingHistory: [],
    weatherData: {}
  };

  // --- 4. STATE PERSISTENCE ---

  function saveStateToLocalStorage() {
    localStorage.setItem('keibahub_user_balance', state.userBalance.toString());
    localStorage.setItem('keibahub_bet_history', JSON.stringify(state.bettingHistory));
  }

  function loadStateFromLocalStorage() {
    const bal = localStorage.getItem('keibahub_user_balance');
    if (bal) state.userBalance = parseInt(bal, 10);
    
    const hist = localStorage.getItem('keibahub_bet_history');
    if (hist) {
      try {
        state.bettingHistory = JSON.parse(hist);
      } catch (e) {
        state.bettingHistory = [];
      }
    }
  }

  function formatMoney(amount) {
    return amount.toLocaleString() + "円";
  }

  // --- 5. PROCEDURAL HORSE GENERATOR ---

  const HORSE_NAME_PREFIXES = ["キタサン", "サトノ", "ダイワ", "ディープ", "アドマイヤ", "ゴールド", "サクラ", "メイショウ", "エイシン", "シンボリ", "カレン", "スペシャル", "トウカイ", "オグリ", "マヤノ", "メジロ", "ナリタ", "ライス", "テイエム", "サイレンス", "ウオッカ", "キング", "マインド", "ロード", "スマート", "エピファニア"];
  const HORSE_NAME_SUFFIXES = ["オー", "アイ", "インパクト", "キング", "クイーン", "シャドー", "ウイング", "フライト", "ワンダー", "スピリッツ", "ハート", "ドリーム", "ブラック", "ローレル", "キャップ", "シャトル", "フラッシュ", "オペラ", "スカーレット", "ボーイ", "エース", "ソルジャー", "バロン", "ダッシュ", "クラウン", "ブリーズ"];

  function generateProceduralHorseName() {
    const pre = HORSE_NAME_PREFIXES[Math.floor(Math.random() * HORSE_NAME_PREFIXES.length)];
    const suf = HORSE_NAME_SUFFIXES[Math.floor(Math.random() * HORSE_NAME_SUFFIXES.length)];
    return pre + suf;
  }

  function generateProceduralHorse(name, jockeyName, gateNum, horseNum, customOdds, isDirtRace) {
    const runStyles = ["逃げ", "先行", "差し", "追込"];
    const runStyle = runStyles[Math.floor(Math.random() * runStyles.length)];
    
    const baseline = isDirtRace ? 70 : 75;
    const speed = baseline + Math.floor(Math.random() * 20);
    
    const clockwise = 60 + Math.floor(Math.random() * 35);
    const counterClockwise = 60 + Math.floor(Math.random() * 35);
    const heavyPerformance = 60 + Math.floor(Math.random() * 38);
    const age = 2 + Math.floor(Math.random() * 5);
    const trainers = ["木村 (美浦)", "国枝 (美浦)", "池江 (栗東)", "友道 (栗東)", "矢作 (栗東)", "渡辺 (大井)", "小久保 (浦和)"];
    
    const pastRaces = [];
    const venuesList = isDirtRace ? ["大井", "川崎", "船橋", "園田", "高知"] : ["東京", "中山", "京都", "阪神"];
    for (let i = 0; i < 5; i++) {
      const place = 1 + Math.floor(Math.random() * 9);
      pastRaces.push({
        date: `2026/0${9-i}/12`,
        venue: venuesList[Math.floor(Math.random() * venuesList.length)],
        name: isDirtRace ? "一般ダート (OP)" : "条件戦 (1勝クラス)",
        distance: isDirtRace ? "1600" : "2000",
        condition: Math.random() > 0.85 ? "重" : "良",
        place: place,
        popular: Math.max(1, place + Math.floor(Math.random() * 3) - 1),
        margin: place === 1 ? `-0.${Math.floor(Math.random() * 4) + 1}秒差` : `0.${Math.floor(Math.random() * 8) + 1}秒差`,
        jockey: jockeyName
      });
    }

    const sires = ["ロードカナロア", "キタサンブラック", "ハーツクライ", "ドゥラメンテ", "シニスターミニスター", "ヘニーヒューズ", "オルフェーヴル", "ルーラーシップ", "エピファネイア"];
    const damSires = ["サンデーサイレンス", "キングカメハメハ", "ディープインパクト", "クロフネ", "ブライアンズタイム", "トニービン", "フレンチデピュティ"];
    const sire = sires[Math.floor(Math.random() * sires.length)];
    const damSire = damSires[Math.floor(Math.random() * damSires.length)];

    return {
      id: "proc_" + name + "_" + horseNum + "_" + Date.now(),
      name: name,
      gate: gateNum,
      num: horseNum,
      gender: Math.random() > 0.75 ? "牝" : (Math.random() > 0.1 ? "牡" : "セン"),
      age: age,
      weight: 53 + (Math.random() > 0.5 ? 2 : 4),
      runStyle: runStyle,
      jockey: jockeyName || "武豊",
      trainer: trainers[Math.floor(Math.random() * trainers.length)],
      speedIndex: speed,
      clockwisePct: clockwise,
      counterClockwisePct: counterClockwise,
      heavyTrackPerformance: heavyPerformance,
      venuePerformance: { "東京": speed - 2, "中山": speed - 1, "京都": speed, "阪神": speed - 3, "大井": speed, "川崎": speed - 2 },
      pedigree: `父: ${sire} / 母父: ${damSire}`,
      pastRaces: pastRaces,
      odds: parseFloat(customOdds) || (3.0 + Math.random() * 50)
    };
  }

  // --- 6. DYNAMIC RACE GENERATION ENGINE ---

  function generateRace(venueKey, raceNum, customSettings = null) {
    // If JRA 11R at 阪神, load Real Takarazuka Kinen G1
    if (venueKey === '阪神' && raceNum === '11' && !customSettings) {
      loadRacePreset('takarazuka');
      return;
    }
    // If JRA 11R at 函館, load Real Hakodate Sprint Stakes G3
    if (venueKey === '函館' && raceNum === '11' && !customSettings) {
      loadRacePreset('hakodate');
      return;
    }
    // If JRA 11R at 東京, load Real Epsom Cup G3
    if (venueKey === '東京' && raceNum === '11' && !customSettings) {
      loadRacePreset('epsom');
      return;
    }
    // If NAR 11R at 川崎, load Real Kanto Oaks Jpn2
    if (venueKey === '川崎' && raceNum === '11' && !customSettings) {
      loadRacePreset('kanto');
      return;
    }
    // If NAR 12R at 門別, load Real Hokkai Yushun H1
    if (venueKey === '門別' && raceNum === '12' && !customSettings) {
      loadRacePreset('hokkaido');
      return;
    }

    const venue = VENUES[venueKey];
    if (!venue) return;

    state.currentVenueKey = venueKey;
    state.currentRaceNum = raceNum;

    let trackType = venue.type;
    if (venue.host === 'nar' && venueKey !== '盛岡') {
      trackType = "ダート";
    }
    
    let direction = venue.direction;
    let distance = venue.dists[Math.floor(Math.random() * venue.dists.length)] || 1600;
    
    let grade = "一般";
    let raceName = `${venueKey} ${raceNum}R`;
    
    if (raceNum === '11') {
      grade = "G1";
      if (venueKey === '阪神') raceName = "宝塚記念 (G1)";
      else if (venueKey === '東京') raceName = "安田記念 (G1)";
      else if (venueKey === '大井') raceName = "東京大賞典 (G1)";
      else raceName = `${venueKey}特別 (重賞)`;
    } else if (raceNum === '10' || raceNum === '12') {
      grade = "OP";
      raceName = `${venueKey}メイン特別 (L)`;
    } else {
      raceName = `${venueKey} 条件戦`;
    }

    if (customSettings) {
      if (customSettings.type) trackType = customSettings.type;
      if (customSettings.direction) direction = customSettings.direction;
      if (customSettings.distance) distance = parseInt(customSettings.distance, 10);
      if (customSettings.grade) grade = customSettings.grade;
      raceName = `${venueKey} ${raceNum}R (カスタム)`;
    }

    state.currentRace = {
      name: raceName,
      grade: grade,
      venue: venueKey,
      distance: distance.toString(),
      type: trackType,
      direction: direction,
      trackCondition: state.weatherData[venueKey] ? state.weatherData[venueKey].condition : "良",
      horses: []
    };

    const numHorses = 8 + Math.floor(Math.random() * 5);
    const jockeyPool = JOCKEYS[venue.host] || JOCKEYS.jra;
    const presetHorses = Object.values(HORSE_DATABASE);
    
    for (let i = 1; i <= numHorses; i++) {
      let hData = null;
      let gate = Math.min(8, i);
      if (i > 8) gate = Math.min(8, i - 8);

      const jockObj = jockeyPool[Math.floor(Math.random() * jockeyPool.length)];
      const jockeyName = jockObj.name;

      if (grade === "G1" && i <= 3) {
        const suitablePresets = presetHorses.filter(h => {
          const isDirtSpec = h.name === "シャマル" || h.name === "ウィルソンテソーロ";
          return trackType === "ダート" ? isDirtSpec : !isDirtSpec;
        });

        const chosenPreset = suitablePresets[i - 1];
        if (chosenPreset) {
          hData = JSON.parse(JSON.stringify(chosenPreset));
          hData.gate = gate;
          hData.num = i;
          hData.jockey = jockeyName;
          hData.id = "preset_" + hData.name + "_" + i + "_" + Date.now();
        }
      }

      if (!hData) {
        const name = generateProceduralHorseName();
        hData = generateProceduralHorse(name, jockeyName, gate, i, null, trackType === "ダート");
      }

      state.currentRace.horses.push(hData);
    }

    state.currentRace.horses.sort((a, b) => b.speedIndex - a.speedIndex);
    let baseOdds = 1.6;
    state.currentRace.horses.forEach((h, idx) => {
      h.odds = parseFloat((baseOdds + (idx * idx * 0.7) + (Math.random() * 1.5)).toFixed(1));
    });

    runPredictionEngine();
  }

  // --- 7. AI RESULTS PREDICTION ENGINE (5-Factors Fixed) ---

  function runPredictionEngine() {
    const race = state.currentRace;
    const cond = race.trackCondition;
    const venue = race.venue;
    const dir = race.direction;

    race.horses.forEach(horse => {
      const speedScore = horse.speedIndex;

      let pastPlaceSum = 0;
      horse.pastRaces.forEach(r => {
        let raceScore = 40;
        if (r.place === 1) raceScore = 100;
        else if (r.place === 2) raceScore = 90;
        else if (r.place === 3) raceScore = 80;
        else if (r.place === 4) raceScore = 70;
        else if (r.place === 5) raceScore = 60;
        pastPlaceSum += raceScore;
      });
      const pastPerfScore = pastPlaceSum / 5;

      let dirScore = 80;
      if (dir === "右") dirScore = horse.clockwisePct;
      else if (dir === "左") dirScore = horse.counterClockwisePct;
      else if (dir === "直線") dirScore = 95;
      
      const venueBase = horse.venuePerformance[venue] || 75;
      const venueScore = (dirScore * 0.4) + (venueBase * 0.6);

      const jraJock = JOCKEYS.jra.find(x => x.name === horse.jockey);
      const narJock = JOCKEYS.nar.find(x => x.name === horse.jockey);
      const jockeyScore = jraJock ? jraJock.skill : (narJock ? narJock.skill : 80);

      let trackScore = 80;
      if (cond === "良") {
        trackScore = 85;
      } else if (cond === "稍重") {
        trackScore = 70 + (horse.heavyTrackPerformance * 0.2);
      } else if (cond === "重") {
        trackScore = 50 + (horse.heavyTrackPerformance * 0.5);
      } else if (cond === "不良") {
        trackScore = 30 + (horse.heavyTrackPerformance * 0.7);
      }

      const finalScore = (speedScore * 0.3) + 
                         (pastPerfScore * 0.25) + 
                         (venueScore * 0.2) + 
                         (jockeyScore * 0.15) + 
                         (trackScore * 0.1);

      horse.scores = {
        speed: Math.round(speedScore),
        past: Math.round(pastPerfScore),
        venue: Math.round(venueScore),
        jockey: Math.round(jockeyScore),
        track: Math.round(trackScore),
        total: Math.round(finalScore)
      };
      
      horse.aiMark = "mark-none";
    });

    const sorted = [...race.horses].sort((a, b) => b.scores.total - a.scores.total);
    
    if (sorted[0]) sorted[0].aiMark = "mark-honmei";
    if (sorted[1]) sorted[1].aiMark = "mark-taiko";
    
    let anaIndex = 2;
    for (let i = 2; i < Math.min(sorted.length, 6); i++) {
      if (sorted[i].odds > sorted[anaIndex].odds) {
        anaIndex = i;
      }
    }
    sorted[anaIndex].aiMark = "mark-ana";

    let assignedRengeCount = 0;
    for (let i = 2; i < sorted.length; i++) {
      if (i === anaIndex) continue;
      if (assignedRengeCount < 2) {
        sorted[i].aiMark = "mark-renge";
        assignedRengeCount++;
      } else {
        break;
      }
    }

    let hoshianaHorse = null;
    if (cond === "重" || cond === "不良") {
      let bestHeavy = -1;
      for (let i = 2; i < sorted.length; i++) {
        if (sorted[i].aiMark === "mark-none" && sorted[i].heavyTrackPerformance > bestHeavy) {
          bestHeavy = sorted[i].heavyTrackPerformance;
          hoshianaHorse = sorted[i];
        }
      }
    }
    if (!hoshianaHorse) {
      for (let i = 3; i < sorted.length; i++) {
        if (sorted[i].aiMark === "mark-none" && sorted[i].speedIndex > 85) {
          hoshianaHorse = sorted[i];
          break;
        }
      }
    }
    if (hoshianaHorse) {
      hoshianaHorse.aiMark = "mark-hoshiana";
    }
  }

  // --- 8. LOAD PRESETS ---

  function loadRacePreset(key) {
    const rawText = SAMPLE_RACES[key];
    const lines = rawText.split('\n');
    const header = lines[0];
    
    const nameMatch = header.match(/(第\d+回\s+.+?)(?=\s+\w+競馬場|\s+中山|\s+東京|\s+京都|\s+阪神|\s+新潟|\s+中京|\s+小倉|\s+福島|\s+函館|\s+札幌|\s+大井|\s+船橋|\s+川崎|\s+門別)/) || [null, "G1 レース"];
    
    let venue = "阪神";
    for (const vKey in VENUES) {
      if (header.includes(vKey)) {
        venue = vKey;
        break;
      }
    }
    state.currentVenueKey = venue;
    const raceNumMatch = header.match(/(\d+)R/) || [null, "11"];
    state.currentRaceNum = raceNumMatch[1] || "11";

    const distMatch = header.match(/(\d+)m/) || [null, "2000"];
    const direction = header.includes("左") ? "左" : (header.includes("直線") ? "直線" : "右");
    const type = header.includes("ダ") ? "ダート" : "芝";

    state.currentRace = {
      name: nameMatch[1] ? nameMatch[1].trim() : "カスタムレース",
      grade: header.includes("G1") || header.includes("Jpn1") || header.includes("Jpn2") || header.includes("Jpn3") ? "G1" : (header.includes("G2") || header.includes("G3") ? "G3" : "一般"),
      venue: venue,
      distance: distMatch[1],
      type: type,
      direction: direction,
      trackCondition: state.currentRace.trackCondition || "良",
      horses: []
    };

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = line.split(/\s+/);
      if (parts.length < 6) continue;

      const gate = parseInt(parts[0], 10);
      const num = parseInt(parts[1], 10);
      const name = parts[2];
      const weight = parseFloat(parts[4]) || 57.0;
      const jockey = parts[5];
      const odds = parseFloat(parts[6]) || 10.0;

      const cleanName = name.replace(/[ 　]/g, "");
      let horseData = null;
      for (const dbName in HORSE_DATABASE) {
        if (dbName.includes(cleanName) || cleanName.includes(dbName)) {
          horseData = JSON.parse(JSON.stringify(HORSE_DATABASE[dbName]));
          break;
        }
      }

      if (horseData) {
        horseData.gate = gate;
        horseData.num = num;
        horseData.jockey = jockey;
        horseData.weight = weight;
        horseData.odds = odds;
        horseData.id = "preset_" + horseData.name + "_" + num;
      } else {
        horseData = generateProceduralHorse(name, jockey, gate, num, odds, type === "ダート");
      }

      state.currentRace.horses.push(horseData);
    }

    runPredictionEngine();
  }

  // --- 9. WEATHER API ---

  async function fetchLiveWeather() {
    const promises = Object.keys(VENUES).map(async (key) => {
      const v = VENUES[key];
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${v.lat}&longitude=${v.lon}&current_weather=true&hourly=precipitation&timezone=Asia%2FTokyo`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("HTTP error");
        const data = await res.json();
        
        const current = data.current_weather;
        const temp = Math.round(current.temperature);
        const code = current.weathercode;
        
        const hourlyPrecip = data.hourly.precipitation;
        const recentRain = hourlyPrecip.slice(0, 24).reduce((sum, val) => sum + val, 0);

        let condition = "良";
        let badgeClass = "badge-ryo";
        if (recentRain > 15) {
          condition = "不良";
          badgeClass = "badge-furyo";
        } else if (recentRain > 5) {
          condition = "重";
          badgeClass = "badge-shige";
        } else if (recentRain > 0.5) {
          condition = "稍重";
          badgeClass = "badge-sayu";
        }

        let desc = "晴れ";
        let icon = "sun";
        if (code >= 51 && code <= 67) { desc = "小雨"; icon = "cloud-rain"; }
        else if (code >= 80 && code <= 82) { desc = "大雨"; icon = "cloud-drizzle"; }
        else if (code >= 71 && code <= 77) { desc = "雪"; icon = "cloud-snow"; }
        else if (code >= 1 && code <= 3) { desc = "曇り"; icon = "cloud"; }
        else if (code >= 95 && code <= 99) { desc = "雷雨"; icon = "cloud-lightning"; }

        state.weatherData[key] = {
          temp: temp + "°C",
          desc: desc,
          icon: icon,
          condition: condition,
          badgeClass: badgeClass
        };
      } catch (err) {
        state.weatherData[key] = {
          temp: "22°C",
          desc: "晴れ",
          icon: "sun",
          condition: "良",
          badgeClass: "badge-ryo"
        };
      }
    });

    await Promise.all(promises);

    const currentVenueWeather = state.weatherData[state.currentVenueKey];
    if (currentVenueWeather) {
      state.currentRace.trackCondition = currentVenueWeather.condition;
    }

    renderWeatherGrid();
    runPredictionEngine();
    renderAll();
  }

  // --- 10. CHART DRAWING ---

  function updateRadarChart(horse) {
    const ctx = document.getElementById('horseRadarChart').getContext('2d');
    const scores = horse.scores || { speed: 80, past: 80, venue: 80, jockey: 80, track: 80 };

    const chartData = {
      labels: ['スピード指数', '近走成績', '会場適性', '騎手適性', '馬場適性'],
      datasets: [{
        label: horse.name,
        data: [scores.speed, scores.past, scores.venue, scores.jockey, scores.track],
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        borderColor: '#d4af37',
        borderWidth: 2,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#d4af37'
      }]
    };

    if (state.radarChart) {
      state.radarChart.data = chartData;
      state.radarChart.update();
    } else {
      state.radarChart = new Chart(ctx, {
        type: 'radar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              pointLabels: { color: '#a0b2a6', font: { size: 10, family: 'Noto Sans JP' } },
              ticks: { display: false },
              min: 0,
              max: 100
            }
          },
          plugins: { legend: { display: false } }
        }
      });
    }
  }

  function updateBettingTrendChart() {
    const ctx = document.getElementById('bettingTrendChart').getContext('2d');
    const historyData = [10000];
    let currentBal = 10000;
    
    const processedHistory = [...state.bettingHistory].reverse();
    processedHistory.forEach(bet => {
      if (bet.status === "won") currentBal += bet.payout - bet.amount;
      else if (bet.status === "lost") currentBal -= bet.amount;
      historyData.push(currentBal);
    });

    const labels = Array.from({ length: historyData.length }, (_, i) => i === 0 ? "初期" : `戦${i}`);

    const chartData = {
      labels: labels,
      datasets: [{
        label: '所持金推移',
        data: historyData,
        borderColor: '#00e676',
        backgroundColor: 'rgba(0, 230, 118, 0.05)',
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#00e676',
        pointRadius: 4
      }]
    };

    if (state.bettingTrendChart) {
      state.bettingTrendChart.data = chartData;
      state.bettingTrendChart.update();
    } else {
      state.bettingTrendChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#a0b2a6' } },
            y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#a0b2a6' } }
          },
          plugins: { legend: { display: false } }
        }
      });
    }
  }

  // --- 11. UI RENDERERS ---

  function renderWeatherGrid() {
    const el = document.getElementById('weather-list');
    if (!el) return;

    let html = "";
    Object.keys(VENUES).forEach(key => {
      const v = VENUES[key];
      const w = state.weatherData[key] || { temp: "--", desc: "読込", icon: "cloud", condition: "良", badgeClass: "badge-ryo" };
      const isActive = state.currentVenueKey === key ? "active" : "";

      html += `
        <div class="weather-card-mini ${isActive}" onclick="window.app.changeVenue('${key}')">
          <div class="venue-name" style="font-size:0.75rem; color:${v.host === 'nar' ? '#ff9100' : 'inherit'};">${key}</div>
          <div class="weather-icon-container">
            <i data-lucide="${w.icon}" style="width: 20px; height: 20px; color: ${isActive ? 'var(--color-gold)' : 'var(--text-secondary)'};"></i>
          </div>
          <div class="weather-temp" style="font-size:0.8rem;">${w.temp}</div>
          <span class="track-status-badge ${w.badgeClass}" style="padding:0.1rem 0.25rem; font-size:0.6rem;">${w.condition}</span>
        </div>
      `;
    });

    el.innerHTML = html;
    lucide.createIcons();
  }

  function renderVenueSelectDropdowns() {
    const venueSelect = document.getElementById('race-venue-select');
    if (!venueSelect) return;

    let html = "";
    Object.keys(VENUES).forEach(key => {
      const v = VENUES[key];
      if (v.host === state.currentHostType) {
        html += `<option value="${key}" ${state.currentVenueKey === key ? 'selected' : ''}>${v.name} (${v.direction}回り)</option>`;
      }
    });

    venueSelect.innerHTML = html;
  }

  function renderRacecard() {
    const body = document.getElementById('racecard-body');
    if (!body) return;

    const r = state.currentRace;
    document.getElementById('race-name').textContent = r.name;
    document.getElementById('race-grade').textContent = r.grade;
    
    const dirTxt = r.direction === "直線" ? "直線コース" : `${r.direction}回り`;
    document.getElementById('race-meta').textContent = `${r.venue} ${state.currentRaceNum}R | ${r.type} ${dirTxt} ${r.distance}m`;
    
    const conditionBadge = document.getElementById('current-track-condition-badge');
    conditionBadge.textContent = `${r.type}: ${r.trackCondition}`;
    conditionBadge.className = "text-gold";
    if (r.trackCondition === "不良") conditionBadge.className = "text-gold badge-furyo";
    else if (r.trackCondition === "重") conditionBadge.className = "text-gold badge-shige";
    else if (r.trackCondition === "稍重") conditionBadge.className = "text-gold badge-sayu";
    else conditionBadge.className = "text-gold badge-ryo";

    if (r.horses.length === 0) {
      body.innerHTML = `<tr><td colspan="8" style="padding:2rem;" class="text-muted">データがありません。「カスタム再生成」か「コピペ更新」で馬柱を作成してください。</td></tr>`;
      return;
    }

    let html = "";
    r.horses.forEach(h => {
      let markSymbol = "-";
      if (h.aiMark === "mark-honmei") markSymbol = "◎";
      else if (h.aiMark === "mark-taiko") markSymbol = "○";
      else if (h.aiMark === "mark-ana") markSymbol = "▲";
      else if (h.aiMark === "mark-renge") markSymbol = "△";
      else if (h.aiMark === "mark-hoshiana") markSymbol = "☆";

      const markClass = h.aiMark || "mark-none";

      html += `
        <tr>
          <td><span class="gate-box gate-${h.gate}">${h.gate}</span></td>
          <td><span class="horse-num-badge">${h.num}</span></td>
          <td class="horse-name-cell">
            <div class="horse-name-jp">${h.name}</div>
            <div class="horse-pedigree">${h.pedigree}</div>
          </td>
          <td><span class="ai-mark-badge ${markClass}">${markSymbol}</span></td>
          <td style="font-family:var(--font-en); font-weight:700;">${h.scores ? h.scores.total : "--"}</td>
          <td style="font-family:var(--font-en); font-weight:700; color:var(--color-gold);">${h.odds.toFixed(1)}</td>
          <td>
            <div style="font-weight:600; font-size:0.85rem;">${h.jockey}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${h.weight}kg</div>
          </td>
          <td>
            <button class="btn-secondary" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="window.app.inspectHorse('${h.id}')">
              分析
            </button>
          </td>
        </tr>
      `;
    });

    body.innerHTML = html;
  }

  function renderHorseInspector(horseId) {
    const r = state.currentRace;
    const h = r.horses.find(x => x.id === horseId);
    if (!h) return;

    state.activeInspectionHorseId = horseId;
    document.getElementById('horse-detail-panel').style.display = 'block';
    
    let markSymbol = "";
    if (h.aiMark === "mark-honmei") markSymbol = " [◎ 本命]";
    else if (h.aiMark === "mark-taiko") markSymbol = " [○ 対抗]";
    else if (h.aiMark === "mark-ana") markSymbol = " [▲ 単穴]";
    else if (h.aiMark === "mark-renge") markSymbol = " [△ 連下]";
    else if (h.aiMark === "mark-hoshiana") markSymbol = " [☆ 穴馬]";

    document.getElementById('detail-header-title').innerHTML = `<i data-lucide="search"></i> 競走馬分析：<strong>${h.name}</strong>${markSymbol}`;
    
    document.getElementById('detail-age').textContent = `${h.gender}${h.age}`;
    document.getElementById('detail-weight').textContent = `${h.weight}kg`;
    document.getElementById('detail-runstyle').textContent = h.runStyle;
    document.getElementById('detail-trainer').textContent = h.trainer;
    document.getElementById('detail-jockey').textContent = h.jockey;

    document.getElementById('detail-clockwise-pct').textContent = `${h.clockwisePct}%`;
    document.getElementById('detail-counter-pct').textContent = `${h.counterClockwisePct}%`;
    
    const venPerf = h.venuePerformance[r.venue] || 75;
    document.getElementById('detail-venue-pct').textContent = `${venPerf}% (${r.venue}コース実績)`;

    // AI Report
    let report = `${h.name}は基準スピード指数 ${h.speedIndex} を有する強力な競走馬です。`;
    if (h.aiMark === "mark-honmei") {
      report += ` 今回の${r.venue}コース（${r.direction}）との相性が極めて良く、直近5走も優秀であるため大崩れはない本命評価です。`;
    } else if (h.aiMark === "mark-taiko") {
      report += ` 本命馬に対抗し得る能力を持っています。乗り役の調子も含めて十分に頭（1着）を狙えるポジションです。`;
    } else if (h.aiMark === "mark-ana") {
      report += ` オッズに反して高い指数を誇っており、今回の相手関係なら一角崩しのダークホースとして極めて優秀です。`;
    } else if (h.aiMark === "mark-hoshiana") {
      report += ` 天候・馬場（${r.trackCondition}）の悪化を最も味方にできるタイプであり、荒れた馬場で一発の魅力があります。`;
    } else {
      report += ` ここまでの強敵が揃う中では、抑えまでの評価が妥当と見られます。`;
    }
    document.getElementById('detail-ai-report').textContent = report;

    // AI Factors Progress Bar
    const fb = document.getElementById('detail-factors-breakdown');
    const sc = h.scores || { speed: 80, past: 80, venue: 80, jockey: 80, track: 80 };
    fb.innerHTML = `
      <div class="factor-progress-item">
        <span class="factor-name">スピード指数</span>
        <div class="factor-bar-bg"><div class="factor-bar-fill" style="width: ${sc.speed}%; background: #ffd600;"></div></div>
        <span class="factor-value">${sc.speed}</span>
      </div>
      <div class="factor-progress-item">
        <span class="factor-name">近走成績</span>
        <div class="factor-bar-bg"><div class="factor-bar-fill" style="width: ${sc.past}%; background: #00e676;"></div></div>
        <span class="factor-value">${sc.past}</span>
      </div>
      <div class="factor-progress-item">
        <span class="factor-name">会場適性</span>
        <div class="factor-bar-bg"><div class="factor-bar-fill" style="width: ${sc.venue}%; background: #2979ff;"></div></div>
        <span class="factor-value">${sc.venue}</span>
      </div>
      <div class="factor-progress-item">
        <span class="factor-name">騎手適性</span>
        <div class="factor-bar-bg"><div class="factor-bar-fill" style="width: ${sc.jockey}%; background: #ea80fc;"></div></div>
        <span class="factor-value">${sc.jockey}</span>
      </div>
      <div class="factor-progress-item">
        <span class="factor-name">馬場・気象適性</span>
        <div class="factor-bar-bg"><div class="factor-bar-fill" style="width: ${sc.track}%; background: #ff9100;"></div></div>
        <span class="factor-value">${sc.track}</span>
      </div>
    `;

    updateRadarChart(h);

    // Render past races
    const pr = document.getElementById('detail-past-races');
    let racesHtml = "";
    h.pastRaces.forEach(r => {
      const plClass = r.place === 1 ? "place-1" : (r.place === 2 ? "place-2" : (r.place === 3 ? "place-3" : ""));
      const badgeCl = r.place === 1 ? "past-race-result-1" : (r.place === 2 ? "past-race-result-2" : (r.place === 3 ? "past-race-result-3" : "past-race-result-other"));
      
      racesHtml += `
        <div class="past-race-card ${plClass}">
          <div class="past-race-header">
            <span>${r.date}</span>
            <span>${r.venue} ${r.distance}m</span>
          </div>
          <div style="font-weight: 700; font-size:0.8rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${r.name}</div>
          <div class="flex-space" style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">
            <span>${r.jockey} (${r.condition})</span>
            <span>${r.popular}人気</span>
          </div>
          <span class="past-race-result-badge ${badgeCl}">${r.place}</span>
        </div>
      `;
    });
    pr.innerHTML = racesHtml;

    document.getElementById('horse-detail-panel').scrollIntoView({ behavior: 'smooth' });
    lucide.createIcons();
  }

  function renderBettingTab() {
    const list = document.getElementById('bet-selection-list');
    const r = state.currentRace;
    if (!list) return;

    document.getElementById('bet-race-title').textContent = `${r.venue} ${state.currentRaceNum}R (${r.name})`;

    if (r.horses.length === 0) {
      list.innerHTML = `<p class="text-muted text-center" style="padding:2rem;">出馬表データを読み込んでください。</p>`;
      return;
    }

    let html = "";
    r.horses.forEach(h => {
      const isSelected = state.selectedBetHorseId === h.id ? "selected" : "";
      html += `
        <div class="betting-horse-row ${isSelected}" onclick="window.app.selectBetHorse('${h.id}')">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <span class="gate-box gate-${h.gate}">${h.gate}</span>
            <span class="horse-num-badge" style="width:20px; text-align:center;">${h.num}</span>
            <div>
              <div style="font-weight: 700; color:#fff;">${h.name}</div>
              <div style="font-size: 0.75rem; color:var(--text-secondary);">${h.jockey}</div>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:var(--font-en); font-weight:700; color:var(--color-gold); font-size:1.1rem;">${h.odds.toFixed(1)}倍</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">単勝オッズ</div>
          </div>
        </div>
      `;
    });
    list.innerHTML = html;

    const track = document.getElementById('sim-race-track');
    track.querySelectorAll('.sim-lane').forEach(l => l.remove());

    r.horses.forEach(h => {
      const lane = document.createElement('div');
      lane.className = 'sim-lane';
      lane.id = `sim-lane-${h.id}`;
      lane.innerHTML = `
        <div class="sim-horse-runner" id="sim-runner-${h.id}" style="left: 0%;">
          <span class="gate-box gate-${h.gate}" style="width:18px; height:18px; font-size:0.7rem; border-radius:3px;">${h.gate}</span>
          <span style="font-size:0.75rem;">${h.name}</span>
        </div>
      `;
      track.appendChild(lane);
    });

    updateBetPotential();
  }

  function updateBetPotential() {
    const h = state.currentRace.horses.find(x => x.id === state.selectedBetHorseId);
    const amtInput = document.getElementById('bet-amount');
    const oddsEl = document.getElementById('bet-potential-odds');
    const payoutEl = document.getElementById('bet-potential-payout');
    
    if (!h) {
      document.getElementById('bet-selected-horse').textContent = "(選択してください)";
      oddsEl.textContent = "-";
      payoutEl.textContent = "-";
      return;
    }

    document.getElementById('bet-selected-horse').textContent = h.name;
    const amount = parseInt(amtInput.value, 10) || 0;

    let odds = h.odds;
    if (state.selectedBetType === 'place') {
      odds = Math.max(1.1, parseFloat((h.odds / 3).toFixed(1)));
    }

    oddsEl.textContent = odds.toFixed(1) + "倍";
    if (amount >= 100) {
      payoutEl.textContent = formatMoney(Math.round(amount * odds));
    } else {
      payoutEl.textContent = "-";
    }
  }

  function renderHistoryList() {
    const el = document.getElementById('betting-history-list');
    if (!el) return;

    if (state.bettingHistory.length === 0) {
      el.innerHTML = `<p class="text-muted text-center" style="padding:1rem;">まだ馬券の購入履歴はありません。</p>`;
      return;
    }

    let html = "";
    state.bettingHistory.forEach(b => {
      let statusHtml = "";
      if (b.status === "pending") {
        statusHtml = `<span style="color:var(--color-gold); font-weight:700;">模擬レース待機中</span>`;
      } else if (b.status === "won") {
        statusHtml = `<span style="color:var(--color-emerald); font-weight:700;">的中! 払戻: ${formatMoney(b.payout)}</span>`;
      } else {
        statusHtml = `<span style="color:var(--text-muted);">不的中</span>`;
      }

      const betTypeJp = b.type === "win" ? "単勝" : "複勝";

      html += `
        <div class="glass-panel" style="padding: 0.6rem 0.8rem; border-color: rgba(255, 255, 255, 0.05); background: rgba(0, 0, 0, 0.2); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:700;">${b.raceName} - ${b.horseName}</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:2px;">
              式別: ${betTypeJp} | 購入額: ${formatMoney(b.amount)} | オッズ: ${b.odds}倍
            </div>
          </div>
          <div style="text-align:right; font-size:0.85rem;">
            ${statusHtml}
          </div>
        </div>
      `;
    });
    el.innerHTML = html;
  }

  function renderDatabaseGrid() {
    const container = document.getElementById('database-grid-container');
    const searchVal = document.getElementById('db-search-input').value.toLowerCase();
    if (!container) return;

    let html = "";
    Object.keys(HORSE_DATABASE).forEach(key => {
      const h = HORSE_DATABASE[key];
      
      if (searchVal && 
          !h.name.toLowerCase().includes(searchVal) && 
          !h.runStyle.toLowerCase().includes(searchVal) && 
          !h.jockey.toLowerCase().includes(searchVal)) {
        return;
      }

      html += `
        <div class="horse-db-card" onclick="window.app.showDatabaseDetail('${key}')">
          <div class="horse-db-header">
            <span class="horse-db-name">${h.name}</span>
            <span class="horse-db-age">${h.gender}${h.age}歳 | ${h.runStyle}</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.25rem; font-size:0.8rem; color:var(--text-secondary);">
            <div>主戦騎手: <span style="color:#fff; font-weight:600;">${h.jockey}</span></div>
            <div>調教師: <span>${h.trainer}</span></div>
            <div>スピード指数: <span class="text-gold" style="font-family:var(--font-en); font-weight:700;">${h.speedIndex}</span></div>
            <div style="margin-top:0.4rem; font-size:0.75rem; color:var(--text-muted); line-height:1.2;">${h.pedigree}</div>
          </div>
        </div>
      `;
    });

    if (!html) {
      container.innerHTML = `<p class="text-center text-muted" style="grid-column: 1 / -1; padding: 2rem;">一致する馬が見つかりませんでした。</p>`;
    } else {
      container.innerHTML = html;
    }
  }

  function renderAll() {
    document.getElementById('balance-val').textContent = state.userBalance.toLocaleString();
    renderRacecard();
    renderBettingTab();
    renderHistoryList();
    renderDatabaseGrid();
  }

  // --- 12. SIMULATOR ANIMATOR ---

  function startRaceSimulation() {
    if (!state.activeBet) return;
    
    document.getElementById('start-race-btn').disabled = true;
    document.getElementById('buy-ticket-btn').disabled = true;
    document.getElementById('sim-status').innerHTML = `<span class="loading-spinner" style="width:14px; height:14px; border-width:2px; vertical-align:middle; margin-right:5px;"></span> レース進行中...`;
    
    const r = state.currentRace;
    const horses = r.horses;
    const finishLinePx = 80;
    
    const positions = {};
    horses.forEach(h => { positions[h.id] = 0; });

    const finishTimes = {};
    let finishedCount = 0;

    const interval = setInterval(() => {
      horses.forEach(h => {
        if (positions[h.id] >= finishLinePx) return;

        const aiFactor = (h.scores ? h.scores.total : 80) / 100;
        const step = (0.2 + (Math.random() * 1.5)) * (0.8 + aiFactor * 0.4);
        positions[h.id] += step;

        const runnerEl = document.getElementById(`sim-runner-${h.id}`);
        if (runnerEl) {
          runnerEl.style.left = Math.min(finishLinePx, positions[h.id]) + "%";
        }

        if (positions[h.id] >= finishLinePx && !finishTimes[h.id]) {
          finishTimes[h.id] = Date.now();
          finishedCount++;
        }
      });

      if (finishedCount === horses.length) {
        clearInterval(interval);
        evaluateRaceResults(finishTimes);
      }
    }, 50);
  }

  function evaluateRaceResults(finishTimes) {
    const sortedIds = Object.keys(finishTimes).sort((a, b) => finishTimes[a] - finishTimes[b]);
    const r = state.currentRace;
    
    const results = sortedIds.map((id, index) => {
      const h = r.horses.find(x => x.id === id);
      return {
        rank: index + 1,
        id: id,
        name: h.name,
        gate: h.gate,
        num: h.num,
        jockey: h.jockey
      };
    });

    const bet = state.activeBet;
    const winningHorse = results[0];
    const placeHorses = results.slice(0, 3);
    
    let isWon = false;
    let payout = 0;

    if (bet.type === 'win') {
      isWon = (bet.horseId === winningHorse.id);
    } else if (bet.type === 'place') {
      isWon = placeHorses.some(x => x.id === bet.horseId);
    }

    if (isWon) {
      payout = Math.round(bet.amount * bet.odds);
      state.userBalance += payout;
      bet.status = "won";
      bet.payout = payout;
    } else {
      bet.status = "lost";
    }

    state.activeBet = null;
    saveStateToLocalStorage();

    const statusEl = document.getElementById('sim-status');
    if (isWon) {
      statusEl.innerHTML = `🎉 的中！ 払戻金 ${formatMoney(payout)} 獲得！`;
      alert(`🎉 的中！\n1着: ${winningHorse.name}\n払戻金: ${formatMoney(payout)}`);
    } else {
      statusEl.innerHTML = `❌ 不定期... 1着は ${winningHorse.name} でした。`;
      alert(`❌ 不的中\n1着: ${winningHorse.name}\n複勝圏内: ${placeHorses.map(x => x.name).join(', ')}`);
    }

    document.getElementById('reset-race-btn').style.display = 'block';
    
    updateBettingTrendChart();
    renderAll();
  }

  // --- 13. COPIPED TEXT PARSER ---

  function parseJraOfficialText(text) {
    const msgEl = document.getElementById('parse-status-msg');
    msgEl.style.display = 'block';
    msgEl.style.background = 'rgba(255, 255, 255, 0.05)';
    msgEl.style.color = '#fff';
    msgEl.textContent = "解析中...";

    if (!text.trim()) {
      msgEl.style.background = 'rgba(255, 61, 0, 0.1)';
      msgEl.style.color = 'var(--color-red)';
      msgEl.textContent = "エラー：テキストを入力してください。";
      return;
    }

    try {
      const lines = text.split('\n');
      
      let startIdx = 0;
      let headerStr = lines[0];
      let raceName = "コピペインポートレース";
      let venue = state.currentVenueKey || "阪神";
      let distance = "2200";
      let grade = "G1";
      let direction = "右";
      let type = "芝";

      if (lines[0] && !/^\d+\s+\d+/.test(lines[0].trim())) {
        startIdx = 1;
        const nameMatch = headerStr.match(/(第\d+回\s+.+?)(?=\s+\w+競馬場|\s+中山|\s+東京|\s+京都|\s+阪神|\s+新潟|\s+中京|\s+小倉|\s+福島|\s+函館|\s+札幌|\s+大井|\s+船橋|\s+川崎|\s+門別)/) || [null, "コピペレース"];
        raceName = nameMatch[1] ? nameMatch[1].trim() : "コピペレース";
        grade = headerStr.includes("G1") || headerStr.includes("Jpn1") || headerStr.includes("Jpn2") || headerStr.includes("Jpn3") ? "G1" : (headerStr.includes("G2") || headerStr.includes("G3") ? "G3" : "一般");
        
        for (const vKey in VENUES) {
          if (headerStr.includes(vKey)) {
            venue = vKey;
            break;
          }
        }
        
        const distMatch = headerStr.match(/(\d+)m/) || [null, "2200"];
        distance = distMatch[1];
        direction = headerStr.includes("左") ? "左" : "右";
        type = headerStr.includes("ダ") ? "ダート" : "芝";
      }

      const parsedHorses = [];
      let currentGate = 1;

      for (let i = startIdx; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = line.split(/\s+/);
        if (parts.length < 5) continue;

        let gate = parseInt(parts[0], 10);
        let num = parseInt(parts[1], 10);
        let name = parts[2];
        let weight = 57.0;
        let jockey = "";
        let odds = 10.0;

        if (isNaN(num)) continue;

        let weightIdx = 3;
        if (parts[3].includes("牡") || parts[3].includes("牝") || parts[3].includes("セ")) {
          weightIdx = 4;
        }
        
        weight = parseFloat(parts[weightIdx]) || 57.0;
        jockey = parts[weightIdx + 1] || "武豊";
        
        const lastPart = parts[parts.length - 1];
        odds = parseFloat(lastPart) || 10.0;

        if (isNaN(gate)) gate = currentGate;
        currentGate = gate;

        const cleanName = name.replace(/[^ァ-ヴーa-zA-Z]/g, "");

        let horseData = null;
        for (const dbName in HORSE_DATABASE) {
          if (dbName.includes(cleanName) || cleanName.includes(dbName)) {
            horseData = JSON.parse(JSON.stringify(HORSE_DATABASE[dbName]));
            break;
          }
        }

        if (horseData) {
          horseData.gate = gate;
          horseData.num = num;
          horseData.jockey = jockey;
          horseData.weight = weight;
          horseData.odds = odds;
          horseData.id = "parsed_" + horseData.name + "_" + i + "_" + Date.now();
        } else {
          horseData = generateProceduralHorse(cleanName, jockey, gate, num, odds, type === "ダート");
        }

        parsedHorses.push(horseData);
      }

      if (parsedHorses.length === 0) {
        throw new Error("有効な競走馬行が検出できませんでした。");
      }

      state.currentVenueKey = venue;
      state.currentRace = {
        name: raceName,
        grade: grade,
        venue: venue,
        distance: distance,
        type: type,
        direction: direction,
        trackCondition: state.weatherData[venue] ? state.weatherData[venue].condition : "良",
        horses: parsedHorses
      };

      runPredictionEngine();
      renderAll();

      msgEl.style.background = 'rgba(0, 230, 118, 0.1)';
      msgEl.style.color = 'var(--color-emerald)';
      msgEl.textContent = `成功：${parsedHorses.length}頭の出馬表をコピペ解析しインポートしました！`;
      
      setTimeout(() => {
        switchToTab('dashboard');
        msgEl.style.display = 'none';
        document.getElementById('jra-paste-area').value = "";
      }, 1200);

    } catch (e) {
      msgEl.style.background = 'rgba(255, 61, 0, 0.1)';
      msgEl.style.color = 'var(--color-red)';
      msgEl.textContent = "パースエラー：" + e.message;
    }
  }

  // --- 14. TAB SWITCHING ---

  function switchToTab(tabId) {
    state.activeTab = tabId;
    
    document.querySelectorAll('.nav-tab').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    document.querySelectorAll('.tab-content').forEach(cont => {
      if (cont.id === tabId) cont.classList.add('active');
      else cont.classList.remove('active');
    });

    if (tabId === 'betting') {
      renderBettingTab();
      setTimeout(updateBettingTrendChart, 50);
    } else if (tabId === 'database') {
      renderDatabaseGrid();
    }
  }

  // --- 15. LIVE UPDATER SIMULATOR ---

  const NEWS_TEMPLATES = [
    // 宝塚記念関連
    { race: "takarazuka", text: "【調教速報】宝塚記念のレガレイラが栗東CWで11.0秒の猛時計！抜群のキレでスピード指数が向上！", target: "レガレイラ", stat: "speed", boost: 3 },
    { race: "takarazuka", text: "【追い切り】シンエンペラーが併せ馬で抜群の手応え。坂井騎手「これ以上ない仕上がり」とコメントし指数上昇！", target: "シンエンペラー", stat: "speed", boost: 2 },
    { race: "takarazuka", text: "【関係者コメント】戸崎騎手「ダノンデサイルは完全に本格化している。阪神2200の舞台も全く問題ない」", target: "ダノンデサイル", stat: "speed", boost: 2 },
    { race: "takarazuka", text: "【調教情報】コスモキュランダがウッドチップで力強いフットワーク。調教師「前走以上の気配」でスピード上昇！", target: "コスモキュランダ", stat: "speed", boost: 2 },
    { race: "takarazuka", text: "【直前情報】シュガークンが気合い十分の追い切り。吉村騎手「スタミナは十分、力を出し切れる」", target: "シュガークン", stat: "speed", boost: 2 },
    { race: "takarazuka", text: "【速報】宝塚記念のミステリーウェイ（8枠18番）が軽度の挫跖（ざせき）のため、出走取消となりました。", target: "mystery_scratch" },

    // 函館スプリントS関連
    { race: "hakodate", text: "【追い切り】函館スプリントSのピューロマジックが函館Wで軽快な動き。短距離スピード抜群で前向きさ十分！", target: "ピューロマジック", stat: "speed", boost: 3 },
    { race: "hakodate", text: "【調教速報】ダノンマッキンリーが函館芝で豪快な伸び脚。短距離適性を証明し、スピード指数上昇！", target: "ダノンマッキンリー", stat: "speed", boost: 2 },
    { race: "hakodate", text: "【関係者コメント】ウイングレイテストの陣営「9歳でも衰えは一切ない。洋芝の函館は相性抜群」", target: "ウイングレイテスト", stat: "speed", boost: 2 },

    // エプソムC関連
    { race: "epsom", text: "【調教速報】エプソムCのトロヴァトーレが美浦南Wで抜群の伸び。ルメール騎手「ベストの東京1800mで自信」", target: "トロヴァトーレ", stat: "speed", boost: 3 },
    { race: "epsom", text: "【直前気配】ステレンボッシュは牝馬ながら力強いフットワーク。仕上がりは万全、指数上昇！", target: "ステレンボッシュ", stat: "speed", boost: 2 },
    { race: "epsom", text: "【追い切り】レガーロデルシエロが3頭併せの最先頭でフィニッシュ。岩田康騎手「状態は最高潮」", target: "レガーロデルシエロ", stat: "speed", boost: 2 },

    // 北海優駿関連
    { race: "hokkaido", text: "【現地情報】門別競馬場は直前の急な雨により、馬場状態が「重」に変更されました。水分を含んだ軽いダートに変化。", target: "track", value: "重" },
    { race: "hokkaido", text: "【調教速報】北海優駿のベラジオエンペラーが坂路で鋭い伸び。落合騎手「3歳王者の力を見せる」と意欲十分！", target: "ベラジオエンペラー", stat: "speed", boost: 3 },
    { race: "hokkaido", text: "【直前情報】タイセイスライブの陣営「距離延長は問題ない。自在性を活かして好勝負へ」", target: "タイセイスライブ", stat: "speed", boost: 2 },

    // 関東オークス関連
    { race: "kanto", text: "【追い切り】関東オークスのアンデスビエントが川崎ダートで力強い動き。田口騎手「折り合いも抜群」", target: "アンデスビエント", stat: "speed", boost: 3 },
    { race: "kanto", text: "【調教速報】クリスマスパレードがウッドで上々の仕上がり。初の地方ダート適性も高水準！", target: "クリスマスパレード", stat: "speed", boost: 2 },
    { race: "kanto", text: "【関係者コメント】シンメデージーは馬体が絞れて好気配。吉原寛騎手「小回りの川崎ならチャンス十分」", target: "シンメデージー", stat: "speed", boost: 2 },

    // 共通・気象馬場ニュース
    { race: "any", text: "【気象・馬場情報】現地で一時的に小雨が降り、馬場状態が「稍重」へ変更されました。馬場適正への影響が再計算されます。", target: "track", value: "稍重" },
    { race: "any", text: "【気象・馬場情報】天候が急速に回復し、強い日差しが出てきました。馬場は「良」に回復し、高速決着の様相です。", target: "track", value: "良" },
    { race: "any", text: "【馬場状態】内ラチ沿いの芝がかなり荒れており、外をスムーズに回れる外枠の差し馬に好影響が出始めています。", target: "track_desc", value: "荒れ芝" }
  ];

  function triggerLiveNewsUpdate() {
    const newsBox = document.getElementById('live-news-content');
    const r = state.currentRace;
    
    // Determine active race key based on name
    let activeKey = "any";
    if (r.name.includes("宝塚記念")) activeKey = "takarazuka";
    else if (r.name.includes("北海優駿")) activeKey = "hokkaido";
    else if (r.name.includes("函館スプリント")) activeKey = "hakodate";
    else if (r.name.includes("エプソム")) activeKey = "epsom";
    else if (r.name.includes("関東オークス")) activeKey = "kanto";

    const filtered = NEWS_TEMPLATES.filter(n => n.race === activeKey || n.race === "any");
    const template = filtered[Math.floor(Math.random() * filtered.length)];
    
    newsBox.textContent = template.text;

    // Apply simulation update to state
    if (template.target === 'track') {
      state.currentRace.trackCondition = template.value;
    } else if (template.target === 'mystery_scratch') {
      // Scratch Mystery Way (18)
      state.currentRace.horses = state.currentRace.horses.filter(h => h.name !== "ミステリーウェイ");
    } else if (template.target === 'track_desc') {
      state.currentRace.horses.forEach(h => {
        if (h.runStyle === "差し" || h.runStyle === "追込") {
          h.speedIndex += 1;
        }
      });
    } else {
      // Find horse and boost stat
      const h = state.currentRace.horses.find(x => x.name.includes(template.target) || template.target.includes(x.name));
      if (h) {
        if (template.stat === 'speed') {
          h.speedIndex += template.boost;
          h.speedIndex = Math.min(105, h.speedIndex); // Cap at 105
        }
      }
    }

    // Recalculate
    runPredictionEngine();
    renderAll();
    
    if (state.activeInspectionHorseId) {
      renderHorseInspector(state.activeInspectionHorseId);
    }
  }

  // --- 16. GLOBAL WINDOW EXPORTS ---

  window.app = {
    switchToTab: switchToTab,
    
    changeVenue: function (key) {
      state.currentVenueKey = key;
      state.currentHostType = VENUES[key].host;

      document.getElementById('host-jra-btn').classList.toggle('active', state.currentHostType === 'jra');
      document.getElementById('host-nar-btn').classList.toggle('active', state.currentHostType === 'nar');
      
      renderVenueSelectDropdowns();
      generateRace(key, state.currentRaceNum);
      renderWeatherGrid();
      renderAll();

      if (state.activeInspectionHorseId) {
        renderHorseInspector(state.activeInspectionHorseId);
      }
    },

    inspectHorse: function (horseId) {
      renderHorseInspector(horseId);
    },

    selectBetHorse: function (horseId) {
      state.selectedBetHorseId = horseId;
      renderBettingTab();
    },

    showDatabaseDetail: function (horseName) {
      const h = HORSE_DATABASE[horseName];
      if (!h) return;
      
      const copyH = JSON.parse(JSON.stringify(h));
      copyH.id = "db_" + h.name + "_" + Date.now();
      copyH.gate = 1;
      copyH.num = 1;
      copyH.odds = 2.5;

      const currentRaceBackup = state.currentRace.horses;
      state.currentRace.horses.push(copyH);
      runPredictionEngine();
      
      switchToTab('dashboard');
      renderHorseInspector(copyH.id);
      
      state.currentRace.horses = currentRaceBackup;
      runPredictionEngine();
      renderRacecard();
    },

    loadCalendarRace: function (key) {
      loadRacePreset(key);
      
      // Sync layout elements
      state.currentHostType = VENUES[state.currentVenueKey].host;
      document.getElementById('host-jra-btn').classList.toggle('active', state.currentHostType === 'jra');
      document.getElementById('host-nar-btn').classList.toggle('active', state.currentHostType === 'nar');
      
      // Update dropdown selections
      renderVenueSelectDropdowns();
      document.getElementById('race-venue-select').value = state.currentVenueKey;
      const raceNum = key === 'hokkaido' ? '12' : '11';
      document.getElementById('race-number-select').value = raceNum;
      state.currentRaceNum = raceNum;

      renderWeatherGrid();
      renderAll();
      document.getElementById('horse-detail-panel').style.display = 'none';
    }
  };

  // --- 17. EVENT LISTENERS SETUP ---

  document.addEventListener('DOMContentLoaded', () => {
    loadStateFromLocalStorage();

    // Tab buttons
    document.querySelectorAll('.nav-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        switchToTab(tab);
      });
    });

    // JRA / NAR toggles
    document.getElementById('host-jra-btn').addEventListener('click', (e) => {
      state.currentHostType = 'jra';
      document.getElementById('host-jra-btn').classList.add('active');
      document.getElementById('host-nar-btn').classList.remove('active');
      
      renderVenueSelectDropdowns();
      const firstJra = Object.keys(VENUES).find(k => VENUES[k].host === 'jra');
      window.app.changeVenue(firstJra);
    });

    document.getElementById('host-nar-btn').addEventListener('click', (e) => {
      state.currentHostType = 'nar';
      document.getElementById('host-nar-btn').classList.add('active');
      document.getElementById('host-jra-btn').classList.remove('active');
      
      renderVenueSelectDropdowns();
      const firstNar = Object.keys(VENUES).find(k => VENUES[k].host === 'nar');
      window.app.changeVenue(firstNar);
    });

    // Venue dropdown change
    document.getElementById('race-venue-select').addEventListener('change', (e) => {
      const venue = e.target.value;
      window.app.changeVenue(venue);
    });

    // Race number dropdown change
    document.getElementById('race-number-select').addEventListener('change', (e) => {
      const raceNum = e.target.value;
      generateRace(state.currentVenueKey, raceNum);
      renderAll();
    });

    // Toggle Custom course settings drawer
    document.getElementById('toggle-custom-drawer-btn').addEventListener('click', () => {
      const drawer = document.getElementById('course-custom-drawer');
      const isHidden = drawer.style.display === 'none';
      drawer.style.display = isHidden ? 'block' : 'none';
      
      if (isHidden) {
        const r = state.currentRace;
        document.getElementById('custom-track-type').value = r.type;
        document.getElementById('custom-direction').value = r.direction;
        document.getElementById('custom-distance').value = r.distance;
        document.getElementById('custom-grade').value = r.grade;
      }
    });

    // Apply custom race settings click
    document.getElementById('apply-custom-race-btn').addEventListener('click', () => {
      const type = document.getElementById('custom-track-type').value;
      const direction = document.getElementById('custom-direction').value;
      const distance = document.getElementById('custom-distance').value;
      const grade = document.getElementById('custom-grade').value;

      const customSettings = {
        type: type,
        direction: direction,
        distance: distance,
        grade: grade
      };

      generateRace(state.currentVenueKey, state.currentRaceNum, customSettings);
      renderAll();
      document.getElementById('course-custom-drawer').style.display = 'none';
    });

    // Initial load
    renderVenueSelectDropdowns();
    generateRace('阪神', '11'); // Default loads Takarazuka Kinen 2026!
    fetchLiveWeather();

    // Betting Listeners
    document.querySelectorAll('.bet-type-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.bet-type-btn').forEach(x => x.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.selectedBetType = e.currentTarget.getAttribute('data-type');
        
        const desc = document.getElementById('bet-type-description');
        if (state.selectedBetType === 'win') {
          desc.textContent = "単勝：選択した馬が 1着 になれば的中。";
        } else {
          desc.textContent = "複勝：選択した馬が 3着以内 に入れば的中（オッズは低めになります）。";
        }
        updateBetPotential();
      });
    });

    document.getElementById('bet-amount').addEventListener('input', updateBetPotential);

    document.getElementById('buy-ticket-btn').addEventListener('click', () => {
      const h = state.currentRace.horses.find(x => x.id === state.selectedBetHorseId);
      const amtInput = document.getElementById('bet-amount');
      const amount = parseInt(amtInput.value, 10) || 0;

      if (!h) {
        alert("賭ける馬を選択してください。");
        return;
      }
      if (amount < 100) {
        alert("購入金額は最低 100円 からです。");
        return;
      }
      if (amount > state.userBalance) {
        alert("資金が不足しています。");
        return;
      }

      let odds = h.odds;
      if (state.selectedBetType === 'place') {
        odds = Math.max(1.1, parseFloat((h.odds / 3).toFixed(1)));
      }

      state.userBalance -= amount;
      
      state.activeBet = {
        raceName: `${state.currentRace.venue} ${state.currentRaceNum}R (${state.currentRace.name})`,
        horseId: h.id,
        horseName: h.name,
        type: state.selectedBetType,
        amount: amount,
        odds: odds,
        status: 'pending',
        payout: 0
      };

      state.bettingHistory.unshift(state.activeBet);
      saveStateToLocalStorage();

      document.getElementById('start-race-btn').disabled = false;
      document.getElementById('buy-ticket-btn').disabled = true;
      document.getElementById('sim-status').textContent = "馬券購入完了！模擬レースを開始できます。";
      
      renderAll();
      renderBettingTab();
    });

    document.getElementById('start-race-btn').addEventListener('click', startRaceSimulation);

    document.getElementById('reset-race-btn').addEventListener('click', (e) => {
      e.currentTarget.style.display = 'none';
      document.getElementById('buy-ticket-btn').disabled = false;
      document.getElementById('start-race-btn').disabled = true;
      document.getElementById('sim-status').textContent = "馬券購入受付中";

      state.currentRace.horses.forEach(h => {
        const runnerEl = document.getElementById(`sim-runner-${h.id}`);
        if (runnerEl) runnerEl.style.left = "0%";
      });
    });

    // JRA / NAR Copy Parser
    document.getElementById('parse-submit-btn').addEventListener('click', () => {
      const text = document.getElementById('jra-paste-area').value;
      parseJraOfficialText(text);
    });

    document.getElementById('load-sample-arima-btn').addEventListener('click', () => {
      document.getElementById('jra-paste-area').value = SAMPLE_RACES.takarazuka;
      parseJraOfficialText(SAMPLE_RACES.takarazuka);
    });

    document.getElementById('load-sample-derby-btn').addEventListener('click', () => {
      document.getElementById('jra-paste-area').value = SAMPLE_RACES.daishoten; // Loads Kashiwa Kinen Jpn1
      parseJraOfficialText(SAMPLE_RACES.daishoten);
    });

    // Database search
    document.getElementById('db-search-input').addEventListener('input', renderDatabaseGrid);
    document.getElementById('db-search-btn').addEventListener('click', renderDatabaseGrid);

    // Live news update triggers
    document.getElementById('update-live-info-btn').addEventListener('click', triggerLiveNewsUpdate);

    lucide.createIcons();
  });

})();
