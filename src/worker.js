const DEFAULT_MEMBERS = ["Yu Ke", "Yuen Hong", "Rui En", "Wen Xin", "队员5"];
const KEY = "data";

async function loadData(env) {
  const raw = await env.TRIP_KV.get(KEY);
  if (raw) return JSON.parse(raw);
  return { members: DEFAULT_MEMBERS, expenses: [] };
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

  switch (body.action) {
    case "addExpense": {
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
      data.expenses.push({
        id: crypto.randomUUID(),
        desc: String(body.desc).slice(0, 200),
        note: String(body.note || "").slice(0, 300),
        amount,
        payer: body.payer,
        participants: body.participants,
        paid,
        createdAt: Date.now(),
      });
      break;
    }
    case "setPaid": {
      const exp = data.expenses.find((e) => e.id === body.id);
      if (!exp) return json({ error: "expense not found" }, 404);
      if (!exp.paid) exp.paid = {};
      exp.paid[body.person] = !!body.paid;
      break;
    }
    case "deleteExpense": {
      data.expenses = data.expenses.filter((e) => e.id !== body.id);
      break;
    }
    case "addMember": {
      const name = String(body.name || "")
        .trim()
        .slice(0, 40);
      if (name && !data.members.includes(name)) data.members.push(name);
      break;
    }
    case "removeMember": {
      data.members = data.members.filter((m) => m !== body.name);
      data.expenses.forEach((e) => {
        e.participants = e.participants.filter((p) => p !== body.name);
        if (e.paid) delete e.paid[body.name];
      });
      break;
    }
    default:
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

    // everything else: serve the static site
    return env.ASSETS.fetch(request);
  },
};
