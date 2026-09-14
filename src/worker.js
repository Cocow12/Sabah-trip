const KEY = "data";

const DEFAULT_MEMBERS = ["Yu Ke", "Yuen Hong", "Rui En", "Wen Xin", "队员5"];

const DEFAULT_FLIGHTS = [
  {
    id: "f1",
    route: "新山 JHB ⇄ 亚庇 BKI · AirAsia",
    outbound: "出发 12月24日 09:10 → 11:30（直飞）",
    inbound: "回程 12月29日 12:40 → 15:00（直飞）",
    note: "",
    people: ["Yu Ke", "Yuen Hong", "Rui En"],
  },
  {
    id: "f2",
    route: "另外2人的机票",
    outbound: "12月23日先抵达亚庇（航班信息待补充）",
    inbound: "",
    note: "待补充",
    people: ["Wen Xin", "队员5"],
  },
];

const DEFAULT_DAYS = [
  {
    id: "d0",
    date: "12月23日 · 周三",
    title: "Day 0 · 另外2人先抵达",
    people: ["Wen Xin", "队员5"],
    items: [
      { id: "d0i1", time: "", text: "抵达亚庇，入住酒店（待补充）", note: "" },
    ],
  },
  {
    id: "d1",
    date: "12月24日 · 周四",
    title: "Day 1 · 抵达亚庇",
    people: ["Yu Ke", "Yuen Hong", "Rui En"],
    items: [
      { id: "d1i1", time: "09:10", text: "新山飞亚庇，AirAsia 直飞", note: "" },
      { id: "d1i2", time: "11:30", text: "抵达亚庇国际机场", note: "" },
      { id: "d1i3", time: "14:00", text: "入住 Qlio Hotel", note: "" },
      {
        id: "d1i4",
        time: "晚上",
        text: "市区自由活动",
        note: "吃饭/景点还没规划",
      },
    ],
  },
  {
    id: "d2",
    date: "12月25日 · 周五",
    title: "Day 2 · 前往神山公园",
    people: ["Yu Ke", "Yuen Hong", "Rui En", "Wen Xin", "队员5"],
    items: [
      { id: "d2i1", time: "12:00", text: "Qlio Hotel 退房", note: "" },
      {
        id: "d2i2",
        time: "下午",
        text: "前往神山公园（车程约2小时）",
        note: "",
      },
      {
        id: "d2i3",
        time: "15:00",
        text: "入住 Sutera Sanctuary，与另外2位队友会合",
        note: "",
      },
    ],
  },
  {
    id: "d3",
    date: "12月26日 · 周六",
    title: "Day 3 · 攀登至拉班拉打",
    people: ["Yu Ke", "Yuen Hong", "Rui En", "Wen Xin", "队员5"],
    items: [
      {
        id: "d3i1",
        time: "07:00",
        text: "从丁波幽门出发，徒步约6公里",
        note: "",
      },
      {
        id: "d3i2",
        time: "下午",
        text: "抵达 Panalaban / Laban Rata",
        note: "",
      },
    ],
  },
  {
    id: "d4",
    date: "12月27日 · 周日",
    title: "Day 4 · 冲顶日出 + 下山入住民宿",
    people: ["Yu Ke", "Yuen Hong", "Rui En", "Wen Xin", "队员5"],
    items: [
      { id: "d4i1", time: "02:30", text: "出发冲顶，目标洛氏峰", note: "" },
      {
        id: "d4i2",
        time: "下午",
        text: "下山转往民宿 The Cloud Kinabalu",
        note: "",
      },
    ],
  },
  {
    id: "d5",
    date: "12月28日 · 周一",
    title: "Day 5 · 自由活动",
    people: ["Yu Ke", "Yuen Hong", "Rui En", "Wen Xin", "队员5"],
    items: [
      {
        id: "d5i1",
        time: "全天",
        text: "休整 / 岛跳或市区活动",
        note: "还没规划",
      },
    ],
  },
  {
    id: "d6",
    date: "12月29日 · 周二",
    title: "Day 6 · 返回新山",
    people: ["Yu Ke", "Yuen Hong", "Rui En", "Wen Xin", "队员5"],
    items: [{ id: "d6i1", time: "12:40", text: "亚庇飞新山", note: "" }],
  },
];

const DEFAULT_WISHLIST = [];

const DEFAULT_PREP = {
  before: [
    { id: "pb1", name: "行李 - 基本日用品", color: "cream", items: [] },
    { id: "pb2", name: "登山用品", color: "yellow", items: [] },
  ],
  climb: [{ id: "pc1", name: "登山用品", color: "green", items: [] }],
};

const DEFAULT_TODOS = [
  { id: "t1", text: "确认另外2人 23-25 号住的酒店", done: false },
  { id: "t2", text: "补充 The Cloud Kinabalu 民宿地址电话", done: false },
  { id: "t3", text: "规划亚庇市区吃饭地点", done: false },
];

const DEFAULT_TIPS = [
  {
    id: "ti1",
    text: "山下亚庇炎热，山上（拉班拉打、山顶）非常冷，务必带保暖衣物",
  },
  { id: "ti2", text: "洛氏峰海拔4095米，部分人会有轻微高反，冲顶前尽量早睡" },
  { id: "ti3", text: "当地用马来西亚令吉(MYR)，山上消费较贵，建议备好现金" },
];

function uid() {
  return crypto.randomUUID().slice(0, 8);
}

async function loadData(env) {
  const raw = await env.TRIP_KV.get(KEY);
  const data = raw ? JSON.parse(raw) : {};
  if (!Array.isArray(data.members)) data.members = DEFAULT_MEMBERS.slice();
  if (!Array.isArray(data.flights)) data.flights = DEFAULT_FLIGHTS;
  if (!Array.isArray(data.wishlist)) data.wishlist = DEFAULT_WISHLIST;
  if (!Array.isArray(data.days)) data.days = DEFAULT_DAYS;
  if (!data.prep) data.prep = DEFAULT_PREP;
  if (!Array.isArray(data.prep.before)) data.prep.before = DEFAULT_PREP.before;
  if (!Array.isArray(data.prep.climb)) data.prep.climb = DEFAULT_PREP.climb;
  if (!Array.isArray(data.todos)) data.todos = DEFAULT_TODOS;
  if (!Array.isArray(data.tips)) data.tips = DEFAULT_TIPS;
  if (!Array.isArray(data.expenses)) data.expenses = [];
  return data;
}

async function saveData(env, data) {
  await env.TRIP_KV.put(KEY, JSON.stringify(data));
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function moveItem(arr, id, dir) {
  const idx = arr.findIndex((x) => x.id === id);
  if (idx === -1) return;
  const swapWith = dir === "up" ? idx - 1 : idx + 1;
  if (swapWith < 0 || swapWith >= arr.length) return;
  [arr[idx], arr[swapWith]] = [arr[swapWith], arr[idx]];
}

async function handleGet(env) {
  return json(await loadData(env));
}

async function handlePost(request, env) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: "invalid JSON body" }, 400);
  }

  const data = await loadData(env);
  const a = body.action;

  // ---------- members ----------
  if (a === "addMember") {
    const name = String(body.name || "")
      .trim()
      .slice(0, 40);
    if (name && !data.members.includes(name)) data.members.push(name);
  } else if (a === "removeMember") {
    data.members = data.members.filter((m) => m !== body.name);
    data.expenses.forEach((e) => {
      e.participants = e.participants.filter((p) => p !== body.name);
      if (e.paid) delete e.paid[body.name];
      if (e.customAmounts) delete e.customAmounts[body.name];
    });
    data.flights.forEach((f) => {
      f.people = f.people.filter((p) => p !== body.name);
    });
    data.days.forEach((d) => {
      d.people = d.people.filter((p) => p !== body.name);
    });
    [...data.prep.before, ...data.prep.climb].forEach((c) => {
      c.items.forEach((it) => {
        if (it.checks) delete it.checks[body.name];
      });
    });
  }

  // ---------- flights ----------
  else if (a === "addFlight") {
    data.flights.push({
      id: uid(),
      route: body.route || "",
      outbound: body.outbound || "",
      inbound: body.inbound || "",
      note: body.note || "",
      people: body.people || [],
    });
  } else if (a === "updateFlight") {
    const f = data.flights.find((x) => x.id === body.id);
    if (f)
      Object.assign(f, {
        route: body.route,
        outbound: body.outbound,
        inbound: body.inbound,
        note: body.note,
        people: body.people,
      });
  } else if (a === "deleteFlight") {
    data.flights = data.flights.filter((x) => x.id !== body.id);
  } else if (a === "moveFlight") {
    moveItem(data.flights, body.id, body.dir);
  }

  // ---------- wishlist ----------
  else if (a === "addWishlist") {
    data.wishlist.push({
      id: uid(),
      name: body.name || "",
      address: body.address || "",
      note: body.note || "",
    });
  } else if (a === "updateWishlist") {
    const w = data.wishlist.find((x) => x.id === body.id);
    if (w)
      Object.assign(w, {
        name: body.name,
        address: body.address,
        note: body.note,
      });
  } else if (a === "deleteWishlist") {
    data.wishlist = data.wishlist.filter((x) => x.id !== body.id);
  } else if (a === "moveWishlist") {
    moveItem(data.wishlist, body.id, body.dir);
  }

  // ---------- days ----------
  else if (a === "addDay") {
    data.days.push({
      id: uid(),
      date: body.date || "",
      title: body.title || "",
      people: body.people || [],
      items: [],
    });
  } else if (a === "updateDay") {
    const d = data.days.find((x) => x.id === body.id);
    if (d)
      Object.assign(d, {
        date: body.date,
        title: body.title,
        people: body.people,
      });
  } else if (a === "deleteDay") {
    data.days = data.days.filter((x) => x.id !== body.id);
  } else if (a === "moveDay") {
    moveItem(data.days, body.id, body.dir);
  } else if (a === "addDayItem") {
    const d = data.days.find((x) => x.id === body.dayId);
    if (d)
      d.items.push({
        id: uid(),
        time: body.time || "",
        text: body.text || "",
        map: body.map || "",
        note: body.note || "",
      });
  } else if (a === "updateDayItem") {
    const d = data.days.find((x) => x.id === body.dayId);
    const it = d && d.items.find((x) => x.id === body.id);
    if (it)
      Object.assign(it, {
        time: body.time,
        text: body.text,
        map: body.map,
        note: body.note,
      });
  } else if (a === "deleteDayItem") {
    const d = data.days.find((x) => x.id === body.dayId);
    if (d) d.items = d.items.filter((x) => x.id !== body.id);
  } else if (a === "moveDayItem") {
    const d = data.days.find((x) => x.id === body.dayId);
    if (d) moveItem(d.items, body.id, body.dir);
  }

  // ---------- prep categories & items ----------
  else if (a === "addPrepCategory") {
    const list = data.prep[body.section];
    if (list)
      list.push({
        id: uid(),
        name: body.name || "新分类",
        color: body.color || "cream",
        items: [],
      });
  } else if (a === "updatePrepCategory") {
    const list = data.prep[body.section];
    const c = list && list.find((x) => x.id === body.id);
    if (c) Object.assign(c, { name: body.name, color: body.color });
  } else if (a === "deletePrepCategory") {
    data.prep[body.section] = (data.prep[body.section] || []).filter(
      (x) => x.id !== body.id
    );
  } else if (a === "addPrepItem") {
    const list = data.prep[body.section];
    const c = list && list.find((x) => x.id === body.categoryId);
    if (c)
      c.items.push({
        id: uid(),
        text: body.text || "",
        note: body.note || "",
        checks: {},
      });
  } else if (a === "updatePrepItem") {
    const list = data.prep[body.section];
    const c = list && list.find((x) => x.id === body.categoryId);
    const it = c && c.items.find((x) => x.id === body.id);
    if (it) Object.assign(it, { text: body.text, note: body.note });
  } else if (a === "deletePrepItem") {
    const list = data.prep[body.section];
    const c = list && list.find((x) => x.id === body.categoryId);
    if (c) c.items = c.items.filter((x) => x.id !== body.id);
  } else if (a === "togglePrepCheck") {
    const list = data.prep[body.section];
    const c = list && list.find((x) => x.id === body.categoryId);
    const it = c && c.items.find((x) => x.id === body.id);
    if (it) {
      if (!it.checks) it.checks = {};
      it.checks[body.member] = !!body.value;
    }
  }

  // ---------- todos ----------
  else if (a === "addTodo") {
    data.todos.push({ id: uid(), text: body.text || "", done: false });
  } else if (a === "updateTodo") {
    const t = data.todos.find((x) => x.id === body.id);
    if (t) t.text = body.text;
  } else if (a === "toggleTodo") {
    const t = data.todos.find((x) => x.id === body.id);
    if (t) t.done = !!body.done;
  } else if (a === "deleteTodo") {
    data.todos = data.todos.filter((x) => x.id !== body.id);
  }

  // ---------- tips ----------
  else if (a === "addTip") {
    data.tips.push({ id: uid(), text: body.text || "" });
  } else if (a === "updateTip") {
    const t = data.tips.find((x) => x.id === body.id);
    if (t) t.text = body.text;
  } else if (a === "deleteTip") {
    data.tips = data.tips.filter((x) => x.id !== body.id);
  }

  // ---------- expenses ----------
  else if (a === "addExpense") {
    const amount = Number(body.amount);
    if (
      !body.desc ||
      !amount ||
      amount <= 0 ||
      !body.payer ||
      !Array.isArray(body.participants) ||
      body.participants.length === 0
    ) {
      return json({ error: "missing or invalid fields" }, 400);
    }
    const paid = {};
    body.participants.forEach((p) => {
      if (p !== body.payer) paid[p] = false;
    });
    const expense = {
      id: crypto.randomUUID(),
      desc: String(body.desc).slice(0, 200),
      note: String(body.note || "").slice(0, 300),
      amount,
      payer: body.payer,
      participants: body.participants,
      splitMode: body.splitMode === "custom" ? "custom" : "even",
      paid,
      createdAt: Date.now(),
    };
    if (expense.splitMode === "custom" && body.customAmounts) {
      expense.customAmounts = {};
      body.participants.forEach((p) => {
        expense.customAmounts[p] = Number(body.customAmounts[p]) || 0;
      });
    }
    data.expenses.push(expense);
  } else if (a === "deleteExpense") {
    data.expenses = data.expenses.filter((e) => e.id !== body.id);
  } else if (a === "setPaid") {
    const exp = data.expenses.find((e) => e.id === body.id);
    if (!exp) return json({ error: "expense not found" }, 404);
    if (!exp.paid) exp.paid = {};
    exp.paid[body.person] = !!body.paid;
  } else {
    return json({ error: "unknown action" }, 400);
  }

  await saveData(env, data);
  return json(data);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/expenses") {
      if (request.method === "GET") return handleGet(env);
      if (request.method === "POST") return handlePost(request, env);
      if (request.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }
      return json({ error: "method not allowed" }, 405);
    }

    return env.ASSETS.fetch(request);
  },
};
