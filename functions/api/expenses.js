// Cloudflare Pages Function — /api/expenses
// Requires a KV namespace bound as TRIP_KV in the Pages project settings.

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
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export async function onRequestGet({ env }) {
