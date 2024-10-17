SELECT
    SUBSTRING(userFlag.flag_name from 21) as "disciplineOfStudy",
    COUNT(userInfo.user_id) as "count"
FROM "UserInfo" userInfo
LEFT JOIN "UserFlag" userFlag on userInfo.user_id = userFlag.user_id
WHERE true
    AND application_status = ANY($1::"UserApplicationStatus"[])
    AND userFlag.flag_name like 'discipline-of-study:%'
GROUP BY
    userFlag.flag_name
