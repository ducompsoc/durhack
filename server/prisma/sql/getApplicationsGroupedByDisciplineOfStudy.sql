-- @param $1:applicationStatusFilter
-- @param $2:universityFilter
-- @param {Boolean} $3:filterOnlyCheckedIn

SELECT
    SUBSTRING(userFlag.flag_name from 21) as "disciplineOfStudy",
    COUNT(userInfo.user_id) as "count"
FROM "UserInfo" userInfo
LEFT JOIN "UserFlag" userFlag on userInfo.user_id = userFlag.user_id
WHERE true
    AND application_status = ANY($1::"UserApplicationStatus"[])
    AND (cardinality($2::varchar(50)[]) = 0 OR userInfo.university = ANY($2::varchar(50)[]))
    AND userFlag.flag_name like 'discipline-of-study:%'
    AND ($3 = FALSE OR EXISTS(
        SELECT 1
        FROM "UserFlag" innerUserFlag
        WHERE true
            AND innerUserFlag.flag_name = 'attendance'
            AND innerUserFlag.user_id = userInfo.user_id
        ))
GROUP BY
    userFlag.flag_name
