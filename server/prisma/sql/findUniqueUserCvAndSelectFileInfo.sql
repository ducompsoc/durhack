-- @param {String} $1:userId

SELECT
    user_id,
    filename,
    content_type,
    length(content) as content_length
FROM "UserCV" userCV
WHERE userCV.user_id = $1::uuid
LIMIT 1
