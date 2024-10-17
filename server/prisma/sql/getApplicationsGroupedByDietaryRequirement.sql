SELECT
    SUBSTRING(userFlag.flag_name from 21) as "dietaryRequirement",
    COUNT(userInfo.user_id) as "count"
FROM "UserInfo" userInfo
LEFT JOIN "UserFlag" userFlag on userInfo.user_id = userFlag.user_id
WHERE true
    AND application_status = ANY($1::"UserApplicationStatus"[])
    AND userFlag.flag_name like 'dietary-requirement:%'
GROUP BY
    userFlag.flag_name
