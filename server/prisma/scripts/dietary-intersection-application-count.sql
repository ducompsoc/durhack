select
    count(userInfo.user_id)
from "UserInfo" userInfo
where true
  and userInfo.application_status = any(array['waiting_list']::"UserApplicationStatus"[])
  and exists(
    select user_id
    from "UserFlag" userFlag
    where true
      and userFlag.user_id = userInfo.user_id
      and userFlag.flag_name = 'dietary-requirement:vegan'
  )
  and exists(
    select user_id
    from "UserFlag" userFlag
    where true
      and userFlag.user_id = userInfo.user_id
      and userFlag.flag_name = 'dietary-requirement:gluten-free'
  );
