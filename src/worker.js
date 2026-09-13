const DEFAULT_MEMBERS = ['Yu Ke', 'Yuen Hong', 'Rui En', 'Wen Xin', '队员5'];
const KEY = 'data';

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
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
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
    return json({ error: 'invalid JSON body' }, 400);
  }
