-- @param $1:applicationStatusFilter
-- @param {Boolean} $2:filterOnlyCheckedIn

SELECT
    count(user_id) as count, dietary_requirements
FROM (
    SELECT relevantUser.user_id, ARRAY_AGG(SUBSTRING(userFlag.flag_name from 21)) as dietary_requirements
    FROM (
        SELECT user_id
        FROM "UserInfo" userInfo
        WHERE true
            AND userInfo.application_status = ANY($1::"UserApplicationStatus"[])
            AND ($2 = FALSE OR EXISTS(
                SELECT 1
                FROM "UserFlag" attendanceUserFlag
                WHERE true
                    AND attendanceUserFlag.flag_name = 'attendance'
                    AND attendanceUserFlag.user_id = userInfo.user_id
            ))
    ) relevantUser
    INNER JOIN "UserFlag" userFlag ON relevantUser.user_id = userFlag.user_id
    WHERE userFlag.flag_name LIKE 'dietary-requirement:%'
    GROUP BY relevantUser.user_id
) userDietaryRequirements
GROUP BY dietary_requirements
ORDER BY count DESC
