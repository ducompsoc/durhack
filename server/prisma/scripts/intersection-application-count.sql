select
    count(userInfo.user_id)
from "UserInfo" userInfo
where true
  and userInfo.application_status = any(array['accepted']::"UserApplicationStatus"[])
  and userInfo.level_of_study = any(array['undergraduate-first-year'])
  and exists(
    select user_id
    from "UserFlag" userFlag
    where true
      and userFlag.user_id = userInfo.user_id
      and userFlag.flag_name = 'discipline-of-study:computer-science')
  and not exists(
    select user_id
    from "UserFlag" userFlag
    where true
      and userFlag.user_id = userInfo.user_id
      and userFlag.flag_name like 'discipline-of-study:%'
      and userFlag.flag_name != 'discipline-of-study:computer-science'
    limit 1
  );
