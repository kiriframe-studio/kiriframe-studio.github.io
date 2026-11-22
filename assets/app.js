/* KiriFrame Studio showcase — app.js (vanilla JS, no build deps) */
"use strict";

/* ---- brand constants (single source mirrored in config.json) ---- */
const CONFIG = {
  brand: "KiriFrame Studio",
  brand_ja: "キリフレーム",
  brand_ko: "키리프레임",
  brand_zh: "切帧工坊",
  handle: "@kiriframe_art",
  email: "motokoatlas2501@gmail.com",
  x_url: "https://x.com/kiriframe_art",
  badges: [
    "6 Years Commercial / 100+ Delivered Models",
    "Up to 600–1000+ Layers",
    "3–7 Days Std / 24–48h Rush",
    "First-Pass Approval · White-Label Ready"
  ]
};
try {
  const BASE = document.body.dataset.assetBase || "assets/img/";
  fetch((BASE === "assets/img/" ? "assets/" : "../assets/") + "config.json")
    .then(r => (r.ok ? r.json() : null)).then(remote => {
      if (remote) Object.assign(CONFIG, remote);
      document.querySelectorAll("[data-email]").forEach(a => { a.href = "mailto:" + CONFIG.email; a.textContent = CONFIG.email; });
      document.querySelectorAll("[data-x]").forEach(a => { a.href = CONFIG.x_url; });
    }).catch(() => {});
} catch (e) { /* file:// or offline: embedded CONFIG already correct */ }

const LANG = document.body.dataset.lang || "en";
const IMG_BASE = document.body.dataset.assetBase || "assets/img/";

/* ---- M3 gallery data (captions per language) ---- */
const GALLERY = [
  { id: "L1", file: "L1.webp", cat: "heavy", cap: {
    en: "L1 · Signature heavy-asset flagship: dense multi-part separation with wings & props",
    ja: "L1 · 招牌重型資産：翼・複数小物を含む高密度パーツ分け",
    ko: "L1 · 시그니처 헤비 자산: 날개·소품 포함 고밀도 파츠 분리" } },
  { id: "L5", file: "L5.webp", cat: "heavy", cap: {
    en: "L5 · Non-human design with huge wingspan and layered appendage physics",
    ja: "L5 · 巨大翼幅と多層付属物理を含む非人型デザイン",
    ko: "L5 · 거대 익폭과 다층 부속 물리를 포함한 비인간형 디자인" } },
  { id: "L7", file: "L7.webp", cat: "heavy", cap: {
    en: "L7 · Angel wings & ultra-long hair split by physics group",
    ja: "L7 · 天使の翼と超ロングヘアを物理グループ別に分離",
    ko: "L7 · 천사 날개와 초장발을 물리 그룹별로 분리" } },
  { id: "L9", file: "L9.webp", cat: "outfit", cap: {
    en: "L9 · Multi-outfit swap: dual-version uniform architecture with shared body base",
    ja: "L9 · 多衣装差分：共通ボディ母体の2バージョン制服アーキテクチャ",
    ko: "L9 · 멀티 의상 차등: 공용 바디 기반 2버전 유니폼 아키텍처" } },
  { id: "L2", file: "L2.webp", cat: "moe", cap: {
    en: "L2 · Lolita fashion with dense multi-prop accessories",
    ja: "L2 · ロリータファッション＋多小物アクセサリー",
    ko: "L2 · 로리타 패션 + 다소품 액세서리" } },
  { id: "L3", file: "L3.webp", cat: "moe", cap: {
    en: "L3 · Mature style with heavy draped fabric and layered skirt physics",
    ja: "L3 · 垂れ布と多層スカート物理を含む成熟系デザイン",
    ko: "L3 · 드레이프 천과 다층 스커트 물리가 포함된 성숙 계열 디자인" } },
  { id: "L4", file: "L4.webp", cat: "male", cap: {
    en: "L4 · Gothic male design with hard-surface accessories",
    ja: "L4 ・ゴシック系男性＋ハードアクセサリー",
    ko: "L4 · 고딕 남성 디자인 + 하드 액세서리" } },
  { id: "L8", file: "L8.webp", cat: "male", cap: {
    en: "L8 · Male character with subculture outfit separation",
    ja: "L8 ・男性キャラ＋サブカル衣装の分離",
    ko: "L8 · 남성 캐릭터 + 서브컬처 의상 분리" } },
  { id: "G1", file: "guide_slice_1.webp", cat: "guide", cap: {
    en: "3-Tier Separation Guide · part 1/4",
    ja: "3段階パーツ分けガイド · 1/4",
    ko: "3단계 파츠 분리 가이드 · 1/4" } },
  { id: "G2", file: "guide_slice_2.webp", cat: "guide", cap: {
    en: "3-Tier Separation Guide · part 2/4",
    ja: "3段階パーツ分けガイド · 2/4",
    ko: "3단계 파츠 분리 가이드 · 2/4" } },
  { id: "G3", file: "guide_slice_3.webp", cat: "guide", cap: {
    en: "3-Tier Separation Guide · part 3/4",
    ja: "3段階パーツ分けガイド · 3/4",
    ko: "3단계 파츠 분리 가이드 · 3/4" } },
  { id: "G4", file: "guide_slice_4.webp", cat: "guide", cap: {
    en: "3-Tier Separation Guide · part 4/4 (final quote requires the full PSD)",
    ja: "3段階パーツ分けガイド · 4/4（最終見積はPSD全文調査前提）",
    ko: "3단계 파츠 분리 가이드 · 4/4(최종 견적은 PSD 전체 검토 전제)" } }
];

/* ---- M4 layer tree (JSON-driven) + 4-language naming spec ---- */
const LAYER_TREE = {
  id: "root", children: [
    { id: "Head", children: [
      { id: "Face_Base" }, { id: "Brow_L_R" },
      { id: "Eye_L", children: [{ id: "Iris" }, { id: "Highlight" }, { id: "Eyelash_Top" }, { id: "Eyelash_Bottom" }, { id: "Eyelid_Closed" }] },
      { id: "Eye_R", children: [{ id: "Iris" }, { id: "Highlight" }, { id: "Eyelash_Top" }, { id: "Eyelash_Bottom" }, { id: "Eyelid_Closed" }] },
      { id: "Nose" }, { id: "Blush" },
      { id: "VBridger_Mouth", children: [{ id: "Lips_Upper" }, { id: "Lips_Lower" }, { id: "Teeth_Upper" }, { id: "Teeth_Lower" }, { id: "Tongue" }, { id: "Mouth_Interior" }] }
    ] },
    { id: "Hair", children: [{ id: "Hair_Front" }, { id: "Hair_Mid" }, { id: "Hair_Back" }, { id: "Physics_Ahoge" }] },
    { id: "Body", children: [{ id: "Torso_Base" }, { id: "Arm_L" }, { id: "Arm_R" }] },
    { id: "Outfit", children: [
      { id: "Outfit_Set_A", children: [{ id: "Top_A" }, { id: "Bottom_A" }, { id: "Accessory_A" }] },
      { id: "Outfit_Set_B" }, { id: "Outfit_Set_C" }
    ] },
    { id: "Physics_Accessories", children: [{ id: "Pendant" }, { id: "FX" }] }
  ]
};
const TREE_NAMES = {
  root: { en: "Character_Root (Rig-Ready PSD)", ja: "キャラクター ルート（リグ対応PSD）", ko: "캐릭터 루트(리깅 준비 PSD)", zh: "角色根组（可绑定 PSD）" },
  Head: { en: "Head", ja: "頭（Head）", ko: "머리(Head)", zh: "头部（Head）" },
  Face_Base: { en: "Face_Base", ja: "顔ベース", ko: "얼굴 베이스", zh: "脸部基底" },
  Brow_L_R: { en: "Brow_L_R", ja: "まゆ（左右）", ko: "눈썹 L/R", zh: "眉毛（左右）" },
  Eye_L: { en: "Eye_L", ja: "左目", ko: "왼눈", zh: "左眼" },
  Eye_R: { en: "Eye_R", ja: "右目", ko: "오른눈", zh: "右眼" },
  Iris: { en: "Iris", ja: "虹彩", ko: "홍채", zh: "虹膜" },
  Highlight: { en: "Highlight", ja: "ハイライト", ko: "하이라이트", zh: "高光" },
  Eyelash_Top: { en: "Eyelash_Top", ja: "上まつげ", ko: "위 속눈썹", zh: "上睫毛" },
  Eyelash_Bottom: { en: "Eyelash_Bottom", ja: "下まつげ", ko: "아래 속눈썹", zh: "下睫毛" },
  Eyelid_Closed: { en: "Eyelid_Closed", ja: "閉眼ライン", ko: "감은 눈 라인", zh: "闭眼线" },
  Nose: { en: "Nose", ja: "鼻", ko: "코", zh: "鼻子" },
  Blush: { en: "Blush_Highlights", ja: "赤面・ハイライト", ko: "볼터치·하이라이트", zh: "腮红·高光" },
  VBridger_Mouth: { en: "VBridger_Mouth", ja: "VBridger対応 口", ko: "VBridger 대응 입", zh: "VBridger 口部" },
  Lips_Upper: { en: "Lips_Upper", ja: "上唇", ko: "위 입술", zh: "上唇" },
  Lips_Lower: { en: "Lips_Lower", ja: "下唇", ko: "아래 입술", zh: "下唇" },
  Teeth_Upper: { en: "Teeth_Upper", ja: "上歯", ko: "윗니", zh: "上齿" },
  Teeth_Lower: { en: "Teeth_Lower", ja: "下歯", ko: "아랫니", zh: "下齿" },
  Tongue: { en: "Tongue", ja: "舌", ko: "혀", zh: "舌头" },
  Mouth_Interior: { en: "Mouth_Interior", ja: "口腔内", ko: "입안", zh: "口腔" },
  Hair: { en: "Hair", ja: "髪（Hair）", ko: "머리카락(Hair)", zh: "头发（Hair）" },
  Hair_Front: { en: "Hair_Front", ja: "前髪", ko: "앞머리", zh: "前发" },
  Hair_Mid: { en: "Hair_Mid", ja: "中間髪", ko: "중간 머리", zh: "中层发" },
  Hair_Back: { en: "Hair_Back", ja: "後ろ髪", ko: "뒷머리", zh: "后发" },
  Physics_Ahoge: { en: "Physics_Ahoge", ja: "物理アホ毛", ko: "물리 아호게", zh: "物理呆毛" },
  Body: { en: "Body", ja: "体（Body）", ko: "몸(Body)", zh: "身体（Body）" },
  Torso_Base: { en: "Torso_Base", ja: "胴体ベース", ko: "몸통 베이스", zh: "躯干基底" },
  Arm_L: { en: "Arm_L", ja: "左腕", ko: "왼팔", zh: "左臂" },
  Arm_R: { en: "Arm_R", ja: "右腕", ko: "오른팔", zh: "右臂" },
  Outfit: { en: "Outfit_Sets", ja: "衣装セット", ko: "의상 세트", zh: "服装套装" },
  Outfit_Set_A: { en: "Outfit_Set_A", ja: "衣装セットA", ko: "의상 세트 A", zh: "服装套装 A" },
  Top_A: { en: "Top_A", ja: "トップスA", ko: "상의 A", zh: "上装 A" },
  Bottom_A: { en: "Bottom_A", ja: "ボトムスA", ko: "하의 A", zh: "下装 A" },
  Accessory_A: { en: "Accessory_A", ja: "アクセサリーA", ko: "액세서리 A", zh: "配饰 A" },
  Outfit_Set_B: { en: "Outfit_Set_B", ja: "衣装セットB", ko: "의상 세트 B", zh: "服装套装 B" },
  Outfit_Set_C: { en: "Outfit_Set_C", ja: "衣装セットC", ko: "의상 세트 C", zh: "服装套装 C" },
  Physics_Accessories: { en: "Physics_Accessories", ja: "物理アクセサリー", ko: "물리 액세서리", zh: "物理配饰" },
  Pendant: { en: "Pendant", ja: "ペンダント", ko: "펜던트", zh: "挂饰" },
  FX: { en: "FX_Parts", ja: "演出パーツ", ko: "이펙트 파츠", zh: "特效件" }
};

/* ---- M1 compare slider (drag + 200% inspect loupe) ---- */
function initCompare(root) {
  const vp = root.querySelector(".cmp-viewport");
  const after = root.querySelector(".cmp-after");
  const before = root.querySelector(".cmp-before");
  const handle = root.querySelector(".cmp-handle");
  const zoomBox = root.querySelector("[data-zoom]");
  let pos = 50;
  const apply = () => {
    after.style.clipPath = `inset(0 0 0 ${pos}%)`;
    handle.style.left = pos + "%";
  };
  apply();
  const setPos = e => {
    const r = vp.getBoundingClientRect();
    pos = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100));
    apply();
  };
  let dragging = false;
  vp.addEventListener("pointerdown", e => { dragging = true; vp.setPointerCapture(e.pointerId); setPos(e); });
  vp.addEventListener("pointermove", e => {
    const r = vp.getBoundingClientRect();
    const ox = ((e.clientX - r.left) / r.width) * 100;
    const oy = ((e.clientY - r.top) / r.height) * 100;
    [before, after].forEach(im => { im.style.transformOrigin = ox + "% " + oy + "%"; });
    if (dragging) setPos(e);
  });
  vp.addEventListener("pointerup", () => { dragging = false; });
  if (zoomBox) zoomBox.addEventListener("change", () => vp.classList.toggle("zoom", zoomBox.checked));
}

/* ---- M2 tabs ---- */
function initTabs(box) {
  const btns = box.querySelectorAll("[data-tab]");
  const panels = box.querySelectorAll("[data-panel]");
  btns.forEach(b => b.addEventListener("click", () => {
    btns.forEach(x => x.classList.toggle("active", x === b));
    panels.forEach(p => { p.hidden = p.dataset.panel !== b.dataset.tab; });
  }));
}

/* ---- M3 gallery + lightbox + filters ---- */
function initGallery() {
  const grid = document.getElementById("gallery");
  const lb = document.getElementById("lightbox");
  if (!grid || !lb) return;
  const lbImg = lb.querySelector("img");
  const lbCap = lb.querySelector(".lb-cap");
  const close = () => { lb.hidden = true; };
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  const draw = () => {
    grid.innerHTML = GALLERY.map(g => `
      <figure class="card" data-cat="${g.cat}">
        <img src="${IMG_BASE}${g.file}" alt="${g.id}" loading="lazy">
        <figcaption>${g.cap[LANG] || g.cap.en}</figcaption>
      </figure>`).join("");
    grid.querySelectorAll(".card").forEach((c, i) => {
      c.addEventListener("click", () => {
        const g = GALLERY[i];
        lbImg.src = IMG_BASE + g.file;
        lbCap.textContent = g.cap[LANG] || g.cap.en;
        lb.hidden = false;
      });
    });
  };
  draw();
  document.querySelectorAll(".filters button").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach(x => x.classList.toggle("active", x === b));
    const f = b.dataset.filter;
    grid.querySelectorAll(".card").forEach(c => { c.style.display = (f === "all" || c.dataset.cat === f) ? "" : "none"; });
  }));
}

/* ---- M4 layer tree with 4-language naming toggle ---- */
function countLeaves(n) {
  if (!n.children) return 1;
  return n.children.reduce((s, c) => s + countLeaves(c), 0);
}
function renderNode(n, lang) {
  const names = TREE_NAMES[n.id] || {};
  const label = names[lang] || names.en || n.id;
  if (n.children && n.children.length) {
    return `<details open><summary><span class="t-folder">▸ ${label}</span>` +
      `<span class="t-count">${countLeaves(n)} parts</span></summary>` +
      `<ul>${n.children.map(c => `<li>${renderNode(c, lang)}</li>`).join("")}</ul></details>`;
  }
  return `<span class="t-leaf">· ${label}</span>`;
}
function initTree() {
  const box = document.getElementById("layer-tree");
  if (!box) return;
  const draw = lang => { box.innerHTML = renderNode(LAYER_TREE, lang); };
  draw(LANG);
  document.querySelectorAll(".tree-langs button").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".tree-langs button").forEach(x => x.classList.toggle("active", x === b));
    draw(b.dataset.treeLang);
  }));
}

/* ---- boot ---- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-compare]").forEach(initCompare);
  document.querySelectorAll("[data-tabs]").forEach(initTabs);
  initGallery();
  initTree();
  document.querySelectorAll(".lang-nav a").forEach(a => a.classList.toggle("active", a.dataset.lang === LANG));
});
