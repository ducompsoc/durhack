-- @param $1:applicationStatusFilter
-- @param {Boolean} $2:filterOnlyCheckedIn

SELECT
    SUBSTRING(userFlag.flag_name from 21) as "disciplineOfStudy",
    COUNT(userInfo.user_id) as "count"
FROM "UserInfo" userInfo
LEFT JOIN "UserFlag" userFlag on userInfo.user_id = userFlag.user_id
WHERE true
    AND application_status = ANY($1::"UserApplicationStatus"[])
    AND userFlag.flag_name like 'discipline-of-study:%'
    AND ($2 = FALSE OR EXISTS(
        SELECT 1
        FROM "UserFlag" innerUserFlag
        WHERE true
            AND innerUserFlag.flag_name = 'attendance'
            AND innerUserFlag.user_id = userInfo.user_id
        ))
GROUP BY
    userFlag.flag_name
