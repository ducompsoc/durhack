SELECT
    SUBSTRING(userFlag."flagName" from 21) as "disciplineOfStudy",
    COUNT(userInfo.user_id) as "count"
FROM "UserInfo" userInfo
LEFT JOIN "UserFlag" userFlag on userInfo.user_id = userFlag.user_id
WHERE true
    AND application_status='submitted'
    AND userFlag."flagName" like 'discipline-of-study:%'
GROUP BY
    userFlag."flagName"
