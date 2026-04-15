-- 在 Supabase SQL Editor 中执行一次，为 mindtask_user_state 增加 UI 状态列与 revision 版本列。
-- 若表名不同，请自行替换。

alter table public.mindtask_user_state
  add column if not exists ui_prefs jsonb default '{}'::jsonb,
  add column if not exists revision bigint not null default 0;

comment on column public.mindtask_user_state.ui_prefs is 'MindTask 界面状态：筛选、视图屏蔽、搜索、画布缩放平移、日历模式等（JSON）';
comment on column public.mindtask_user_state.revision is 'MindTask 乐观并发控制版本号，每次成功写入递增 1';
