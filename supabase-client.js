import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://itguqtsgjliinrycnljm.supabase.co';
const SUPABASE_ANON_KEY =
  'sb_publishable__RYR3P-qfBC4GySYyPHm3Q_-5PssRBp';

/** localStorage 中保存：'persist' | 'session'，决定 refresh token 存在哪类 Storage */
export const AUTH_STORAGE_SCOPE_KEY = 'flowforge_auth_storage';

function getAuthBackingStore() {
  const scope = localStorage.getItem(AUTH_STORAGE_SCOPE_KEY);
  if (scope === 'session') return sessionStorage;
  return localStorage;
}

/**
 * 供 Supabase 使用的 Storage：每次读写时按当前 scope 路由到 localStorage 或 sessionStorage。
 * persist：关浏览器后仍可通过 refresh token 恢复会话。
 * session：仅当前浏览会话有效，关浏览器后需重新登录。
 */
const browserAuthStorage = {
  getItem: (key) => getAuthBackingStore().getItem(key),
  setItem: (key, value) => getAuthBackingStore().setItem(key, value),
  removeItem: (key) => getAuthBackingStore().removeItem(key),
};

function clearSupabaseKeys(store) {
  if (typeof store === 'undefined' || store === null) return;
  const keys = [];
  for (let i = 0; i < store.length; i++) {
    const k = store.key(i);
    if (k && k.startsWith('sb-')) keys.push(k);
  }
  keys.forEach((k) => store.removeItem(k));
}

/**
 * 在 signInWithPassword 之前调用：写入「记住我」对应的存储策略，并清空另一侧的 Supabase 会话键，避免串会话。
 * @param {boolean} usePersist - true：长期登录（localStorage）；false：仅本会话（sessionStorage）
 */
export function prepareLoginAuthScope(usePersist) {
  localStorage.setItem(
    AUTH_STORAGE_SCOPE_KEY,
    usePersist ? 'persist' : 'session'
  );
  if (usePersist) {
    clearSupabaseKeys(sessionStorage);
  } else {
    clearSupabaseKeys(localStorage);
  }
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: browserAuthStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const MINDTASK_STATE_TABLE = 'mindtask_user_state';
