SELECT
    SUBSTRING(userFlag."flagName" from 21) as "dietaryRequirement",
    COUNT(userInfo.user_id) as "count"
FROM "UserInfo" userInfo
LEFT JOIN "UserFlag" userFlag on userInfo.user_id = userFlag.user_id
WHERE true
    AND application_status='submitted'
    AND userFlag."flagName" like 'dietary-requirement:%'
GROUP BY
    userFlag."flagName"
